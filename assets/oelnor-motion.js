/* Oelnor motion layer — reveals, split text, spring tilt, parallax, cursor
 * label, scroll-scrubbed statement and pinned horizontal rails.
 * No dependencies. Everything is opt-in through data-o-* attributes and is
 * re-initialised when a section is reloaded inside the theme editor. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  /* ---------- Split headings into masked words ---------- */
  function split(root) {
    root.querySelectorAll('[data-o-split]:not([data-o-split-done])').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.setAttribute('aria-label', el.textContent.trim());
      el.textContent = '';
      words.forEach((word, i) => {
        const outer = document.createElement('span');
        outer.className = 'o-word';
        outer.setAttribute('aria-hidden', 'true');
        const inner = document.createElement('span');
        inner.style.setProperty('--w', i);
        inner.textContent = word;
        outer.appendChild(inner);
        el.appendChild(outer);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
      el.setAttribute('data-o-split-done', '');
    });
  }

  /* ---------- Reveal on enter (once) ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 }
  );

  function reveal(root) {
    root.querySelectorAll('[data-o-reveal], [data-o-split]').forEach((el) => {
      if (el.classList.contains('is-in')) return;
      // The hero is always the first screen: play its entrance straight away.
      if (el.closest('.o-hero3d')) {
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
        return;
      }
      revealObserver.observe(el);
    });
  }

  /* ---------- Spring tilt (decorative, pointer only) ---------- */
  function tilt(root) {
    if (!finePointer.matches || reduceMotion.matches) return;
    root.querySelectorAll('[data-o-tilt]:not([data-o-tilt-done])').forEach((el) => {
      el.setAttribute('data-o-tilt-done', '');
      const max = parseFloat(el.dataset.oTilt) || 8;
      const glare = el.querySelector('.o-tilt-glare');
      let tx = 0, ty = 0, x = 0, y = 0, raf = 0;

      const tick = () => {
        x = lerp(x, tx, 0.12);
        y = lerp(y, ty, 0.12);
        el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(3)}deg) rotateY(${(x * max).toFixed(3)}deg)`;
        if (glare) {
          glare.style.setProperty('--gx', `${50 + x * 50}%`);
          glare.style.setProperty('--gy', `${50 + y * 50}%`);
        }
        if (Math.abs(x - tx) > 0.001 || Math.abs(y - ty) > 0.001) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
        }
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };

      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width) * 2 - 1;
        ty = ((e.clientY - r.top) / r.height) * 2 - 1;
        kick();
      });
      el.addEventListener('pointerleave', () => {
        tx = 0;
        ty = 0;
        kick();
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function magnetic(root) {
    if (!finePointer.matches || reduceMotion.matches) return;
    root.querySelectorAll('[data-o-magnetic]:not([data-o-magnetic-done])').forEach((el) => {
      el.setAttribute('data-o-magnetic-done', '');
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.translate = `${dx * 0.18}px ${dy * 0.28}px`;
        el.style.transition = 'transform 160ms var(--o-ease-out), translate 120ms linear, color 200ms ease';
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform 160ms var(--o-ease-out), translate 500ms var(--o-ease-out), color 200ms ease';
        el.style.translate = '0px 0px';
      });
    });
  }

  /* ---------- Cursor label over [data-o-cursor] ---------- */
  let cursor;
  function cursorLabel(root) {
    if (!finePointer.matches || reduceMotion.matches) return;
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'o-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursor);
      let cx = 0, cy = 0, x = 0, y = 0;
      window.addEventListener('pointermove', (e) => {
        cx = e.clientX;
        cy = e.clientY;
      }, { passive: true });
      const loop = () => {
        x = lerp(x, cx, 0.2);
        y = lerp(y, cy, 0.2);
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        requestAnimationFrame(loop);
      };
      loop();
    }
    root.querySelectorAll('[data-o-cursor]:not([data-o-cursor-done])').forEach((el) => {
      el.setAttribute('data-o-cursor-done', '');
      el.addEventListener('pointerenter', () => {
        cursor.textContent = el.dataset.oCursor || 'Ver';
        cursor.classList.add('is-active');
      });
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  /* ---------- Scroll-driven effects (one rAF loop for all) ---------- */
  const parallaxEls = new Set();
  const scrubEls = new Set();
  const rails = new Set();

  function collectScroll(root) {
    root.querySelectorAll('[data-o-parallax]').forEach((el) => parallaxEls.add(el));
    root.querySelectorAll('[data-o-scrub]:not([data-o-scrub-done])').forEach((el) => {
      el.setAttribute('data-o-scrub-done', '');
      const words = el.textContent.trim().split(/\s+/);
      el.setAttribute('aria-label', el.textContent.trim());
      el.innerHTML = words
        .map((w) => `<span class="o-scrub-word" aria-hidden="true">${w.replace(/</g, '&lt;')}</span>`)
        .join(' ');
      scrubEls.add(el);
    });
    root.querySelectorAll('[data-o-rail]').forEach((el) => rails.add(el));
    layoutRails();
  }

  function railActive() {
    return window.matchMedia('(min-width: 990px)').matches && !reduceMotion.matches;
  }

  function layoutRails() {
    rails.forEach((rail) => {
      const track = rail.querySelector('[data-o-rail-track]');
      if (!track) return;
      if (!railActive()) {
        rail.style.height = '';
        track.style.transform = '';
        rail.classList.remove('is-pinned');
        return;
      }
      rail.classList.add('is-pinned');
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      rail._distance = distance;
      rail.style.height = `${window.innerHeight + distance}px`;
    });
  }

  function onFrame() {
    const vh = window.innerHeight;

    if (!reduceMotion.matches) {
      parallaxEls.forEach((el) => {
        if (!el.isConnected) return parallaxEls.delete(el);
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.oParallax) || 0.15;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    }

    scrubEls.forEach((el) => {
      if (!el.isConnected) return scrubEls.delete(el);
      const r = el.getBoundingClientRect();
      const progress = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
      const words = el.children;
      const lit = progress * words.length;
      for (let i = 0; i < words.length; i++) {
        words[i].style.opacity = reduceMotion.matches ? 1 : clamp(lit - i, 0.45, 1);
      }
    });

    if (railActive()) {
      rails.forEach((rail) => {
        if (!rail.isConnected) return rails.delete(rail);
        const track = rail.querySelector('[data-o-rail-track]');
        const r = rail.getBoundingClientRect();
        const distance = rail._distance || 0;
        const p = clamp(-r.top / Math.max(1, distance), 0, 1);
        track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`;
        const bar = rail.querySelector('[data-o-rail-progress]');
        if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
      });
    }

    requestAnimationFrame(onFrame);
  }

  /* ---------- First-visit intro (once per session, home only) ---------- */
  function intro() {
    const host = document.querySelector('[data-o-intro]');
    if (!host || reduceMotion.matches) return;
    try {
      if (sessionStorage.getItem('o-intro-seen')) return;
      sessionStorage.setItem('o-intro-seen', '1');
    } catch (e) {
      return;
    }
    const word = host.dataset.oIntro || 'OELNOR';
    const el = document.createElement('div');
    el.className = 'o-intro';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<div class="o-intro__word">${[...word]
      .map((c, i) => `<span style="--l:${i}">${c === ' ' ? '&nbsp;' : c}</span>`)
      .join('')}</div>`;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('is-out'), 1150);
    el.addEventListener('transitionend', () => el.remove(), { once: true });
    el.addEventListener('click', () => el.classList.add('is-out'));
  }

  /* ---------- Dawn product page: gallery uncover + info stagger ---------- */
  function enhanceProduct(root) {
    root.querySelectorAll('.product__media-list .product__media-item:not([data-o-reveal])').forEach((el, i) => {
      el.setAttribute('data-o-reveal', 'clip');
      el.style.setProperty('--i', Math.min(i, 3));
    });
    root.querySelectorAll('.product__info-container:not([data-o-stagger])').forEach((el) => {
      el.setAttribute('data-o-stagger', '');
      [...el.children].forEach((child, i) => child.style.setProperty('--i', Math.min(i, 10)));
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
    });
  }

  function init(root = document) {
    enhanceProduct(root);
    split(root);
    reveal(root);
    tilt(root);
    magnetic(root);
    cursorLabel(root);
    collectScroll(root);
  }

  window.Oelnor = Object.assign(window.Oelnor || {}, { initMotion: init });

  const start = () => {
    intro();
    init();
    requestAnimationFrame(onFrame);
    window.addEventListener('resize', layoutRails, { passive: true });
    window.addEventListener('load', layoutRails);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  document.addEventListener('shopify:section:load', (e) => init(e.target));
})();
