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

  /* ---------- Add to cart into Dawn's cart drawer (plain POST without it) ---------- */
  async function addToCart(form) {
    const drawer = document.querySelector('cart-drawer');
    const body = new FormData(form);
    if (drawer && typeof drawer.getSectionsToRender === 'function') {
      body.append('sections', drawer.getSectionsToRender().map((s) => s.id).join(','));
      body.append('sections_url', location.pathname);
    }
    const res = await fetch(`${(window.routes && window.routes.cart_add_url) || '/cart/add'}.js`, {
      method: 'POST',
      headers: { Accept: 'application/javascript', 'X-Requested-With': 'XMLHttpRequest' },
      body,
    });
    const data = await res.json();
    if (!res.ok || data.status) throw new Error(data.description || data.message || 'No se ha podido añadir');
    if (drawer && typeof drawer.renderContents === 'function') {
      drawer.classList.remove('is-empty');
      drawer.renderContents(data);
      return true;
    }
    location.href = (window.routes && window.routes.cart_url) || '/cart';
    return false;
  }

  /* ---------- Generic dialogs: [data-o3-open-dialog="id"] / [data-o3-close-dialog] ---------- */
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-o3-open-dialog]');
    if (opener) document.getElementById(opener.dataset.o3OpenDialog)?.showModal();
    const closer = e.target.closest('[data-o3-close-dialog]');
    if (closer) closer.closest('dialog')?.close();
    if (e.target.matches('dialog.o3-drawer')) e.target.close();
  });

  /* ---------- Delivery estimate in real business days ---------- */
  function delivery(el) {
    const min = +el.dataset.min;
    const max = +el.dataset.max;
    const text = el.querySelector('[data-o3-delivery-text]');
    if (!text || !min || !max) return;
    const addBusinessDays = (days) => {
      const d = new Date();
      let left = days;
      while (left > 0) {
        d.setDate(d.getDate() + 1);
        const wd = d.getDay();
        if (wd !== 0 && wd !== 6) left--;
      }
      return d;
    };
    const fmt = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    const day = (d) => fmt.formatToParts(d).filter((p) => p.type !== 'literal').map((p) => p.value).join(' ');
    text.innerHTML = `Recíbelo entre el <b>${day(addBusinessDays(min))}</b> y el <b>${day(addBusinessDays(max))}</b>`;
  }

  /* ---------- Product page ---------- */
  function product(section) {
    const form = section.querySelector('[data-o3-form]');
    const json = section.querySelector('[data-o3-variants]');
    if (!form || !json) return;
    const variants = JSON.parse(json.textContent);
    const idInput = form.querySelector('[data-o3-variant-id]');
    const options = [...section.querySelectorAll('[data-o3-option]')];
    const atc = section.querySelector('[data-o3-atc]');
    const atcLabel = section.querySelector('[data-o3-atc-label]');
    const atcPrice = section.querySelector('[data-o3-atc-price]');
    const status = section.querySelector('[data-o3-status]');
    const stock = section.querySelector('[data-o3-stock]');
    const now = section.querySelector('[data-o3-now]');
    const was = section.querySelector('[data-o3-was]');
    const save = section.querySelector('[data-o3-save]');
    const saveBadge = section.querySelector('[data-o3-save-badge]');
    const track = section.querySelector('[data-o3-gal-track]');
    const sticky = section.querySelector('[data-o3-sticky]');
    const stickyBtn = section.querySelector('[data-o3-sticky-btn]');
    const stickyMeta = section.querySelector('[data-o3-sticky-meta]');
    const stickyImg = section.querySelector('[data-o3-sticky-img]');
    const single = variants.length === 1 && !options.length;

    const selected = () =>
      options.map((o) => (o.querySelector('input:checked') || o.querySelector('input'))?.value);
    const find = (opts) => variants.find((v) => v.options.every((val, i) => val === opts[i]));

    const markAvailability = (opts) => {
      options.forEach((group, i) => {
        group.querySelectorAll('.o3-opt__v').forEach((label) => {
          const value = label.querySelector('input').value;
          const test = opts.slice();
          test[i] = value;
          const v = find(test);
          label.toggleAttribute('data-unavailable', !v || !v.available);
        });
        const out = group.querySelector('[data-o3-option-value]');
        if (out) out.textContent = opts[i];
      });
    };

    const setButton = (v) => {
      const ok = v && v.available;
      atc.disabled = !ok;
      atcLabel.textContent = !v ? atc.dataset.labelNone : ok ? atc.dataset.labelAdd : atc.dataset.labelSold;
      if (stickyBtn) {
        stickyBtn.disabled = !ok;
        stickyBtn.textContent = ok ? 'Añadir' : !v ? 'No disponible' : 'Agotado';
      }
    };

    const showMedia = (id) => {
      if (!id || !track) return;
      const item = track.querySelector(`[data-media-id="${id}"]`);
      if (!item || item === track.firstElementChild) return;
      track.prepend(item);
      track.scrollTo({ left: 0, behavior: 'instant' });
      updateHud();
    };

    const update = () => {
      const opts = selected();
      const v = find(opts);
      markAvailability(opts);
      setButton(v);
      if (!v) return;
      idInput.value = v.id;
      now.textContent = v.price;
      atcPrice.textContent = v.price;
      if (was) { was.hidden = !v.was; was.querySelector('[data-o3-was-val]').textContent = v.was || ''; }
      if (save) { save.hidden = !v.save; save.textContent = v.save ? `Ahorras ${v.save}` : ''; }
      if (saveBadge) { saveBadge.hidden = !v.pct; saveBadge.textContent = `-${v.pct}%`; }
      if (stock) {
        const low = v.stock !== null && v.stock > 0 && v.stock <= 5;
        stock.hidden = !low;
        if (low) stock.querySelector('span').textContent = v.stock === 1 ? 'Queda la última unidad' : `Quedan ${v.stock} unidades`;
      }
      if (stickyMeta) stickyMeta.textContent = single ? v.price : `${v.title} · ${v.price}`;
      if (stickyImg && v.img) stickyImg.src = v.img;
      showMedia(v.media);
      const url = new URL(location.href);
      url.searchParams.set('variant', v.id);
      history.replaceState(history.state, '', url);
      if (status) status.textContent = '';
    };

    options.forEach((o) => o.addEventListener('change', update));

    // Quantity stepper
    const qty = form.querySelector('input[name="quantity"]');
    form.querySelectorAll('[data-o3-qty]').forEach((b) =>
      b.addEventListener('click', () => {
        qty.value = Math.min(99, Math.max(1, (+qty.value || 1) + +b.dataset.o3Qty));
      })
    );

    // Add to cart
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (atc.disabled) return;
      atc.setAttribute('aria-busy', 'true');
      try {
        await addToCart(form);
        atc.setAttribute('data-done', '');
        atcLabel.textContent = atc.dataset.labelDone;
        setTimeout(() => { atc.removeAttribute('data-done'); atcLabel.textContent = atc.dataset.labelAdd; }, 1800);
      } catch (err) {
        if (status) status.textContent = err.message;
      } finally {
        atc.removeAttribute('aria-busy');
      }
    });

    // Gallery: counter + progress on the swipe track
    const items = () => [...track.querySelectorAll('[data-o3-gal-item]')];
    const idx = section.querySelector('[data-o3-gal-index]');
    const bar = section.querySelector('[data-o3-gal-bar]');
    let queued = false;
    function updateHud() {
      queued = false;
      if (!idx || !track) return;
      const n = items().length || 1;
      const i = Math.min(n - 1, Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
      idx.textContent = i + 1;
      bar.style.transform = `translateX(${i * 100}%) scaleX(1)`;
      bar.style.width = `${100 / n}%`;
    }
    track?.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(updateHud); } }, { passive: true });
    if (bar) { bar.style.transformOrigin = '0 50%'; updateHud(); }

    // Zoom viewer
    const zoom = section.querySelector('[data-o3-zoom]');
    track?.addEventListener('click', (e) => {
      const item = e.target.closest('[data-o3-gal-item]');
      if (!item || !zoom) return;
      zoom.showModal();
      zoom.querySelector(`img[data-media-id="${item.dataset.mediaId}"]`)?.scrollIntoView({ block: 'start' });
    });

    // Sticky bar on phones once the main button has scrolled away
    if (sticky && stickyBtn) {
      new IntersectionObserver(([en]) => {
        const past = !en.isIntersecting && en.boundingClientRect.top < 0;
        sticky.toggleAttribute('data-on', past);
        sticky.setAttribute('aria-hidden', String(!past));
        stickyBtn.tabIndex = past ? 0 : -1;
      }).observe(atc);
      stickyBtn.addEventListener('click', () => {
        if (options.length && !selected().every(Boolean)) {
          atc.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
          return;
        }
        form.requestSubmit();
      });
    }

    // Initial state (respects ?variant= already rendered by Liquid)
    if (options.length) markAvailability(selected());
  }

  /* ---------- Recommendations: fetch once the section is near ---------- */
  function recs(section) {
    const url = section.dataset.url;
    if (!url || section.dataset.loaded) return;
    const io = new IntersectionObserver(async ([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      section.dataset.loaded = '';
      try {
        const html = await (await fetch(url)).text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const fresh = doc.querySelector('[data-o3-recs]');
        if (!fresh || fresh.hasAttribute('data-empty')) return;
        section.innerHTML = fresh.innerHTML;
        section.removeAttribute('data-empty');
        init(section);
      } catch (_) { /* keep hidden */ }
    }, { rootMargin: '400px 0px' });
    io.observe(section);
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
      button.setAttribute('aria-busy', 'true');
      try {
        if (await addToCart(form) && status) status.textContent = button.dataset.added || 'Añadido';
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
    scope.querySelectorAll('[data-o3-product]').forEach(product);
    scope.querySelectorAll('[data-o3-recs][data-url]').forEach(recs);
    scope.querySelectorAll('[data-o3-delivery]').forEach(delivery);
    scope.querySelectorAll('[data-o3-label]').forEach((s) => tilt(s, s.querySelector('[data-o3-label-card]'), { maxX: 8, maxY: 12 }));
  };

  // deferred script in <head>: the DOM is parsed by the time this runs
  init();
  policies();
  // Theme editor: re-init a section when it is re-rendered
  document.addEventListener('shopify:section:load', (e) => init(e.target));
})();
