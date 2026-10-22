/* Oelnor motion layer — reveals, split text, spring tilt, parallax, cursor
 * label, scroll-scrubbed statement and pinned horizontal rails.
 * No dependencies. Everything is opt-in through data-o-* attributes and is
 * re-initialised when a section is reloaded inside the theme editor. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  // Frame-rate independent smoothing: the same feel at 60Hz and 120Hz.
  // k is the fraction covered per 60Hz frame; dt is elapsed ms.
  const damp = (a, b, k, dt) => b + (a - b) * Math.pow(1 - k, dt / 16.667);

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
      let tx = 0, ty = 0, x = 0, y = 0, raf = 0, last = 0, rect = null;

      const tick = (now) => {
        const dt = Math.min(64, now - (last || now - 16.667));
        last = now;
        x = damp(x, tx, 0.12, dt);
        y = damp(y, ty, 0.12, dt);
        el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(3)}deg) rotateY(${(x * max).toFixed(3)}deg)`;
        // The glare is a 200% gradient layer slid with transform (composite only).
        if (glare) glare.style.transform = `translate3d(${(x * 25).toFixed(2)}%, ${(y * 25).toFixed(2)}%, 0)`;
        if (Math.abs(x - tx) > 0.001 || Math.abs(y - ty) > 0.001) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
          last = 0;
          // Settled at rest: drop the transform and release the GPU layer.
          if (!tx && !ty) {
            x = y = 0;
            el.style.transform = '';
            el.style.willChange = '';
            if (glare) glare.style.transform = '';
            rect = null; // the next move promotes the layer again
          }
        }
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };

      el.addEventListener('pointermove', (e) => {
        if (!rect) {
          rect = el.getBoundingClientRect();
          el.style.willChange = 'transform';
        }
        const r = rect;
        tx = ((e.clientX - r.left) / r.width) * 2 - 1;
        ty = ((e.clientY - r.top) / r.height) * 2 - 1;
        kick();
      });
      el.addEventListener('pointerleave', () => {
        tx = 0;
        ty = 0;
        rect = null;
        kick();
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function magnetic(root) {
    if (!finePointer.matches || reduceMotion.matches) return;
    root.querySelectorAll('[data-o-magnetic]:not([data-o-magnetic-done])').forEach((el) => {
      el.setAttribute('data-o-magnetic-done', '');
      let rect = null;
      el.addEventListener('pointerenter', () => {
        rect = el.getBoundingClientRect();
      });
      el.addEventListener('pointermove', (e) => {
        const r = rect || el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.translate = `${dx * 0.18}px ${dy * 0.28}px`;
        el.style.transition = 'transform 160ms var(--o-ease-out), translate 120ms linear, color 200ms ease';
      });
      el.addEventListener('pointerleave', () => {
        rect = null;
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
      let cx = 0, cy = 0, x = 0, y = 0, raf = 0, last = 0;
      const loop = (now) => {
        const dt = Math.min(64, now - (last || now - 16.667));
        last = now;
        x = damp(x, cx, 0.22, dt);
        y = damp(y, cy, 0.22, dt);
        cursor.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        if (Math.abs(cx - x) > 0.3 || Math.abs(cy - y) > 0.3) {
          raf = requestAnimationFrame(loop);
        } else {
          raf = 0;
          last = 0;
        }
      };
      window.addEventListener('pointermove', (e) => {
        cx = e.clientX;
        cy = e.clientY;
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
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

  /* ---------- Scroll-driven effects ----------
   * Runs one rAF per scroll/resize (never while the page is idle) and only
   * measures elements that are near the viewport. */
  const parallaxEls = new Set();
  const scrubEls = new Set();
  const rails = new Set();
  const nearViewport = new Set();
  const proximity = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? nearViewport.add(e.target) : nearViewport.delete(e.target)));
      requestScrollFrame();
    },
    { rootMargin: '25% 0px 25% 0px' }
  );
  const watch = (el) => proximity.observe(el);

  function collectScroll(root) {
    root.querySelectorAll('[data-o-parallax]').forEach((el) => {
      if (parallaxEls.has(el)) return;
      parallaxEls.add(el);
      watch(el);
    });
    root.querySelectorAll('[data-o-scrub]:not([data-o-scrub-done])').forEach((el) => {
      el.setAttribute('data-o-scrub-done', '');
      const words = el.textContent.trim().split(/\s+/);
      el.setAttribute('aria-label', el.textContent.trim());
      el.innerHTML = words
        .map((w) => `<span class="o-scrub-word" aria-hidden="true">${w.replace(/</g, '&lt;')}</span>`)
        .join(' ');
      el._words = [...el.children];
      el._lit = -1;
      scrubEls.add(el);
      watch(el);
    });
    root.querySelectorAll('[data-o-rail]').forEach((el) => {
      if (rails.has(el)) return;
      el._track = el.querySelector('[data-o-rail-track]');
      el._bar = el.querySelector('[data-o-rail-progress]');
      rails.add(el);
      watch(el);
    });
    layoutRails();
  }

  function railActive() {
    return window.matchMedia('(min-width: 990px)').matches && !reduceMotion.matches;
  }

  function layoutRails() {
    rails.forEach((rail) => {
      const track = rail._track;
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
    requestScrollFrame();
  }

  let scrollRaf = 0;
  function requestScrollFrame() {
    if (!scrollRaf) scrollRaf = requestAnimationFrame(onScrollFrame);
  }

  function onScrollFrame() {
    scrollRaf = 0;
    const vh = window.innerHeight;
    // Read every rect first, then write, so the browser lays out once.
    const writes = [];

    nearViewport.forEach((el) => {
      if (!el.isConnected) {
        nearViewport.delete(el);
        return;
      }
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return; // in a hidden view

      if (parallaxEls.has(el)) {
        if (reduceMotion.matches) return;
        const speed = parseFloat(el.dataset.oParallax) || 0.15;
        const offset = ((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1);
        if (offset !== el._offset) {
          el._offset = offset;
          writes.push(() => (el.style.transform = `translate3d(0, ${offset}px, 0)`));
        }
      } else if (scrubEls.has(el)) {
        const progress = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
        const lit = reduceMotion.matches ? el._words.length : Math.round(progress * el._words.length * 20) / 20;
        if (lit !== el._lit) {
          el._lit = lit;
          writes.push(() =>
            el._words.forEach((w, i) => {
              w.style.opacity = clamp(lit - i, 0.45, 1).toFixed(2);
            })
          );
        }
      } else if (rails.has(el) && railActive() && el._track) {
        const distance = el._distance || 0;
        const p = clamp(-r.top / Math.max(1, distance), 0, 1);
        writes.push(() => {
          el._track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`;
          if (el._bar) el._bar.style.transform = `scaleX(${p.toFixed(4)})`;
        });
      }
    });

    writes.forEach((w) => w());
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
      [...el.children].forEach((child, i) => child.style.setProperty('--i', Math.min(i, 6)));
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
    });
  }

  /* ---------- Collection pages: hero fan + Dawn product grid ---------- */
  function enhanceCollection(root) {
    root.querySelectorAll('.o-colhero:not(.is-ready)').forEach((el) => {
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-ready')));
    });
    root.querySelectorAll('.product-grid > .grid__item:not([data-o-reveal])').forEach((item, i) => {
      item.setAttribute('data-o-reveal', 'fade');
      item.style.setProperty('--i', i % 4);
      const media = item.querySelector('.card__inner');
      if (media) media.setAttribute('data-o-cursor', 'Ver');
    });
  }

  // Dawn swaps the grid's HTML when filters, sorting or pages change.
  function watchGrid() {
    const container = document.getElementById('ProductGridContainer');
    if (!container || container.dataset.oWatched) return;
    container.dataset.oWatched = '';
    new MutationObserver(() => init(container)).observe(container, { childList: true });
  }

  /* ---------- Pause infinite CSS loops while off screen ---------- */
  const loopObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting));
  });
  function pauseLoops(root) {
    root.querySelectorAll('.o-marquee, .o-story__ticker, .o-offer, .o-hero3d__hint, .o-photostrip').forEach((el) => {
      if (el.dataset.oLoop) return;
      el.dataset.oLoop = '';
      loopObserver.observe(el);
    });
  }

  function init(root = document) {
    pauseLoops(root);
    enhanceCollection(root);
    enhanceProduct(root);
    split(root);
    reveal(root);
    tilt(root);
    magnetic(root);
    cursorLabel(root);
    collectScroll(root);
    requestScrollFrame();
  }

  window.Oelnor = Object.assign(window.Oelnor || {}, { initMotion: init });

  const start = () => {
    intro();
    init();
    watchGrid();
    window.addEventListener('scroll', requestScrollFrame, { passive: true });
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
