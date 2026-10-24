/* OELNOR 3.0 — home behaviour. No dependencies, ~4 KB. */
(() => {
  if (window.__o3) return; // the hero includes this script; never boot twice
  window.__o3 = true;
  const root = document.documentElement;
  root.classList.add('o3-js');

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Reveal once on enter ---------- */
  const revealIO = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-in', '');
        revealIO.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  const watchReveals = (scope) => scope.querySelectorAll('[data-o3-reveal]:not([data-in])').forEach((el) => revealIO.observe(el));

  /* ---------- Spring-ish tilt: pointer on desktop, drag on touch ---------- */
  // Critically-damped follow: writes transform on the one element that moves, never a CSS variable on a parent.
  function tilt(surface, target, { maxX = 10, maxY = 18, drag = true } = {}) {
    if (!surface || !target || reduceMotion) return;
    let rx = 0, ry = 0, vx = 0, vy = 0, tx = 0, ty = 0;
    let raf = 0, visible = true, dragging = false, startX = 0, startY = 0, pointerId = null;

    const step = () => {
      // stiffness 0.08 / damping 0.78 ≈ spring with a touch of overshoot
      vx = (vx + (tx - rx) * 0.08) * 0.78;
      vy = (vy + (ty - ry) * 0.08) * 0.78;
      rx += vx;
      ry += vy;
      target.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      const settled = Math.abs(tx - rx) < 0.01 && Math.abs(ty - ry) < 0.01 && Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01;
      raf = settled || !visible ? 0 : requestAnimationFrame(step);
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(step); };

    // Rubber-band past the edge: the further you pull, the less it moves.
    const band = (v, max) => {
      const a = Math.abs(v);
      return a <= max ? v : Math.sign(v) * (max + (a - max) * 0.18);
    };

    if (finePointer) {
      surface.addEventListener('pointermove', (e) => {
        if (dragging) return;
        const r = surface.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ty = px * maxY * 2;
        tx = -py * maxX * 2;
        kick();
      });
      surface.addEventListener('pointerleave', () => { if (!dragging) { tx = 0; ty = 0; kick(); } });
    }

    if (drag) {
      surface.addEventListener('pointerdown', (e) => {
        if (pointerId !== null || e.button > 0) return; // ignore a second finger
        pointerId = e.pointerId;
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
      });
      surface.addEventListener('pointermove', (e) => {
        if (!dragging || e.pointerId !== pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy) && !surface.hasPointerCapture(e.pointerId)) {
          surface.setPointerCapture(e.pointerId);
        }
        ty = band(dx * 0.22, maxY * 2.2);
        tx = band(-dy * 0.08, maxX);
        kick();
      });
      const release = (e) => {
        if (e.pointerId !== pointerId) return;
        // a short horizontal drag on a link should still behave like a tap
        if (Math.abs(e.clientX - startX) > 6) surface.addEventListener('click', (ev) => ev.preventDefault(), { capture: true, once: true });
        dragging = false;
        pointerId = null;
        tx = 0;
        ty = 0;
        kick();
      };
      surface.addEventListener('pointerup', release);
      surface.addEventListener('pointercancel', release);
    }

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    }).observe(surface);
  }

  /* ---------- Rail progress bar (mobile scroll track) ---------- */
  function rail(section) {
    const track = section.querySelector('[data-o3-track]');
    const bar = section.querySelector('[data-o3-progress]');
    if (!track || !bar) return;
    let queued = false;
    const paint = () => {
      queued = false;
      const max = track.scrollWidth - track.clientWidth;
      const visibleRatio = track.clientWidth / track.scrollWidth;
      const p = max > 0 ? track.scrollLeft / max : 1;
      bar.style.transform = `translateX(${(p * (1 - visibleRatio) * 100) / visibleRatio}%) scaleX(1)`;
      bar.style.width = `${visibleRatio * 100}%`;
    };
    track.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(paint); } }, { passive: true });
    addEventListener('resize', paint, { passive: true });
    paint();
  }

  /* ---------- Collection index: floating preview follows the cursor ---------- */
  function index(section) {
    const float = section.querySelector('[data-o3-float]');
    if (!float || !finePointer) return;
    const imgs = float.querySelectorAll('img');
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0, on = false;
    const step = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      float.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) rotate(${((x - cx) * 0.04).toFixed(2)}deg)`;
      raf = on || Math.abs(x - cx) > 0.5 ? requestAnimationFrame(step) : 0;
    };
    section.querySelectorAll('[data-o3-row]').forEach((row, i) => {
      row.addEventListener('pointerenter', (e) => {
        if (!on) { cx = x = e.clientX + 24; cy = y = e.clientY - 150; }
        on = true;
        float.setAttribute('data-on', '');
        imgs.forEach((img, j) => img.toggleAttribute('data-on', j === i));
        if (!raf) raf = requestAnimationFrame(step);
      });
      row.addEventListener('pointermove', (e) => { x = e.clientX + 24; y = e.clientY - 150; });
    });
    section.querySelector('[data-o3-list]')?.addEventListener('pointerleave', () => {
      on = false;
      float.removeAttribute('data-on');
    });
  }

  /* ---------- Spotlight: add to cart without leaving the page ---------- */
  function spotlight(section) {
    const form = section.querySelector('[data-o3-form]');
    if (!form || !window.fetch) return;
    const button = form.querySelector('[type="submit"]');
    const status = section.querySelector('[data-o3-status]');
    const label = button.innerHTML;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const drawer = document.querySelector('cart-drawer');
      const body = new FormData(form);
      if (drawer && typeof drawer.getSectionsToRender === 'function') {
        body.append('sections', drawer.getSectionsToRender().map((s) => s.id).join(','));
        body.append('sections_url', location.pathname);
      }
      button.setAttribute('aria-busy', 'true');
      try {
        const res = await fetch(`${(window.routes && window.routes.cart_add_url) || '/cart/add'}.js`, {
          method: 'POST',
          headers: { Accept: 'application/javascript', 'X-Requested-With': 'XMLHttpRequest' },
          body,
        });
        const data = await res.json();
        if (!res.ok || data.status) throw new Error(data.description || data.message || 'Error');
        if (drawer && typeof drawer.renderContents === 'function') {
          drawer.classList.remove('is-empty');
          drawer.renderContents(data);
        } else {
          location.href = (window.routes && window.routes.cart_url) || '/cart';
          return;
        }
        if (status) status.textContent = button.dataset.added || 'Añadido';
      } catch (err) {
        if (status) status.textContent = err.message;
      } finally {
        button.removeAttribute('aria-busy');
        button.innerHTML = label;
      }
    });
  }

  /* ---------- Collection: filter drawer (native <dialog>) + sort ---------- */
  function collection(section) {
    const form = section.querySelector('[data-o3-filters]');
    const drawer = section.querySelector('[data-o3-drawer]');
    section.querySelectorAll('[data-o3-open-drawer]').forEach((b) =>
      b.addEventListener('click', () => drawer && drawer.showModal())
    );
    section.querySelectorAll('[data-o3-close-drawer]').forEach((b) => b.addEventListener('click', () => drawer.close()));
    // tap on the backdrop closes it
    drawer?.addEventListener('click', (e) => { if (e.target === drawer) drawer.close(); });
    section.querySelector('[data-o3-sort]')?.addEventListener('change', () => form?.requestSubmit());
    // drop empty price inputs so URLs stay clean
    form?.addEventListener('formdata', (e) => {
      for (const [k, v] of [...e.formData.entries()]) if (v === '') e.formData.delete(k);
    });
  }

  /* ---------- Policies: table of contents from the policy's h2s ---------- */
  function policies() {
    if (!document.querySelector('.o3-polhero')) return;
    const container = document.querySelector('.shopify-policy__container');
    const body = container?.querySelector('.shopify-policy__body');
    if (!body || container.dataset.o3) return;
    container.dataset.o3 = '';
    container.classList.add('o3-policy');
    const heads = [...body.querySelectorAll('h2')];
    if (heads.length < 3) return;
    const slug = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/^\d+\.\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const nav = document.createElement('nav');
    nav.className = 'o3-toc';
    nav.setAttribute('aria-label', 'En esta página');
    nav.innerHTML = '<p>En esta página</p><ol></ol>';
    const ol = nav.querySelector('ol');
    const used = new Set();
    heads.forEach((h, i) => {
      let id = h.id || slug(h.textContent) || `apartado-${i + 1}`;
      while (used.has(id)) id += `-${i + 1}`;
      used.add(id);
      h.id = id;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = h.textContent.trim().replace(/^\d+\.\s*/, '');
      li.append(a);
      ol.append(li);
    });
    container.prepend(nav);
    const links = [...ol.querySelectorAll('a')];
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((l) => l.classList.toggle('is-active', l.hash === `#${en.target.id}`));
      }),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    heads.forEach((h) => spy.observe(h));
  }

  const init = (scope = document) => {
    watchReveals(scope);
    scope.querySelectorAll('[data-o3-hero]').forEach((s) => tilt(s.querySelector('[data-o3-stage]'), s.querySelector('[data-o3-tilt]')));
    scope.querySelectorAll('[data-o3-spot]').forEach((s) => {
      tilt(s.querySelector('[data-o3-spot-visual]'), s.querySelector('[data-o3-spot-card]'), { maxX: 8, maxY: 14 });
      spotlight(s);
    });
    scope.querySelectorAll('[data-o3-rail]').forEach(rail);
    scope.querySelectorAll('[data-o3-index]').forEach(index);
    scope.querySelectorAll('[data-o3-collection]').forEach(collection);
    scope.querySelectorAll('[data-o3-label]').forEach((s) => tilt(s, s.querySelector('[data-o3-label-card]'), { maxX: 8, maxY: 12 }));
  };

  // deferred script in <head>: the DOM is parsed by the time this runs
  init();
  policies();
  // Theme editor: re-init a section when it is re-rendered
  document.addEventListener('shopify:section:load', (e) => init(e.target));
})();
