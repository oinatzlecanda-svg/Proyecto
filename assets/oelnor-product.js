/* Oelnor product page: delivery estimate, gallery counter, sticky add-to-cart
   bar, "complete the look" recommendations, and the motion layer (colour
   chapter sampled from the product photo, cursor zoom, title reveal, sliding
   variant indicator, price roll, button shine, icon draw-in). No JS animation
   loops: every update is event-driven and the motion itself is CSS. */
(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Delivery estimate: today + N business days ---------- */
  function addBusinessDays(date, days) {
    const d = new Date(date);
    let added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0 && day !== 6) added++;
    }
    return d;
  }

  function delivery(root) {
    root.querySelectorAll('[data-o-delivery]:not([data-ready])').forEach((el) => {
      el.dataset.ready = '';
      const min = parseInt(el.dataset.min, 10);
      const max = parseInt(el.dataset.max, 10);
      const target = el.querySelector('[data-o-delivery-text]');
      if (!target || !min || !max) return;
      const fmt = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
      const now = new Date();
      const day = (d) => fmt.format(d).replace(',', '');
      target.textContent = `Llega entre el ${day(addBusinessDays(now, min))} y el ${day(addBusinessDays(now, max))}`;
    });
  }

  /* ---------- Gallery counter (desktop stacked gallery) ---------- */
  function galleryCount(root) {
    root.querySelectorAll('.product--stacked media-gallery:not([data-o-count])').forEach((gallery) => {
      gallery.dataset.oCount = '';
      const items = [...gallery.querySelectorAll('.product__media-list > .product__media-item')];
      if (items.length < 2) return;
      const pad = (n) => String(n).padStart(2, '0');
      const badge = document.createElement('p');
      badge.className = 'o-gallery-count';
      badge.setAttribute('aria-hidden', 'true');
      badge.textContent = `${pad(1)} / ${pad(items.length)}`;
      gallery.querySelector('.product__media-list').after(badge);
      let current = 1;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const n = items.indexOf(e.target) + 1;
            if (n !== current) {
              current = n;
              badge.textContent = `${pad(n)} / ${pad(items.length)}`;
            }
          });
        },
        { rootMargin: '-45% 0px -45% 0px' }
      );
      items.forEach((it) => io.observe(it));
    });
  }

  /* ---------- Sticky add-to-cart bar ---------- */
  function stickyBar(root) {
    root.querySelectorAll('[data-o-sticky-atc]:not([data-ready])').forEach((bar) => {
      bar.dataset.ready = '';
      const info = document.querySelector('.product__info-container');
      const mainBtn = info && info.querySelector('.product-form__submit');
      if (!mainBtn) return;
      const btn = bar.querySelector('[data-o-sticky-btn]');
      const label = bar.querySelector('[data-o-sticky-label]');
      const meta = bar.querySelector('[data-o-sticky-variant]');
      const price = bar.querySelector('[data-o-sticky-price]');

      const sync = () => {
        const p = info.querySelector('.price .price-item--last') || info.querySelector('.price .price-item--regular');
        if (p && price) price.textContent = p.textContent.trim();
        const picked = [...info.querySelectorAll('variant-selects input:checked, variant-selects select')]
          .map((i) => (i.tagName === 'SELECT' ? i.value : i.value))
          .filter(Boolean)
          .join(' · ');
        if (meta) meta.textContent = picked;
        btn.disabled = mainBtn.disabled;
        const mainLabel = mainBtn.querySelector('span');
        if (label && mainLabel) label.textContent = mainLabel.textContent.trim();
      };
      sync();
      new MutationObserver(sync).observe(info, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });

      // Show only once the real button has scrolled above the viewport.
      const setVisible = (on) => {
        bar.classList.toggle('is-visible', on);
        bar.inert = !on;
      };
      setVisible(false);
      new IntersectionObserver(([e]) => setVisible(!e.isIntersecting && e.boundingClientRect.top < 0)).observe(mainBtn);

      btn.addEventListener('click', () => {
        if (mainBtn.disabled) return;
        mainBtn.click();
      });
    });
  }

  /* ---------- Complete the look: complementary, then related ---------- */
  function look(root) {
    root.querySelectorAll('[data-o-look]:not([data-ready])').forEach(async (el) => {
      el.dataset.ready = '';
      const list = el.querySelector('[data-o-look-list]');
      const load = async (intent) => {
        const res = await fetch(`${el.dataset.url}&intent=${intent}`);
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        return doc.querySelector('[data-o-look-list]');
      };
      try {
        let fresh = await load('complementary');
        if (!fresh || !fresh.children.length) fresh = await load('related');
        if (fresh && fresh.children.length) {
          list.replaceChildren(...fresh.children);
          el.classList.add('has-items');
          if (window.Oelnor && window.Oelnor.initMotion) window.Oelnor.initMotion(el);
        } else {
          el.closest('.shopify-section')?.setAttribute('hidden', '');
        }
      } catch (err) {
        el.closest('.shopify-section')?.setAttribute('hidden', '');
      }
    });
  }

  /* ---------- Colour chapter: tint the hero from the product's own photo ---------- */
  function tone(root) {
    root.querySelectorAll('.product__info-container:not([data-o-tone])').forEach((info) => {
      info.setAttribute('data-o-tone', '');
      const scope = info.closest('.shopify-section') || info.closest('[data-view]') || info.closest('.pv-pdp');
      const media = scope && scope.querySelector('.product__media img, .product__media-item img');
      if (!scope || !media) return;
      scope.classList.add('o-pdp-tone');
      const src = media.currentSrc || media.src;
      if (!src) return;
      const probe = new Image();
      probe.crossOrigin = 'anonymous';
      probe.onload = () => {
        try {
          const c = document.createElement('canvas');
          c.width = c.height = 12;
          const ctx = c.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(probe, 0, 0, 12, 12);
          const px = ctx.getImageData(0, 0, 12, 12).data;
          let r = 0, g = 0, b = 0, n = 0;
          for (let i = 0; i < px.length; i += 4) {
            const lum = (px[i] + px[i + 1] + px[i + 2]) / 3;
            if (px[i + 3] < 200 || lum > 240 || lum < 18) continue; // skip studio white / pure black
            r += px[i]; g += px[i + 1]; b += px[i + 2]; n++;
          }
          if (!n) return;
          const [h, s] = rgbToHsl(r / n, g / n, b / n);
          const sat = Math.min(Math.max(s, 22), 58);
          scope.style.setProperty('--o-tint-h', Math.round(h));
          scope.style.setProperty('--o-tint-s', Math.round(sat) + '%');
        } catch (e) {
          /* cross-origin image without CORS: keep the warm default */
        }
      };
      probe.src = src.replace(/([?&])width=\d+/, '$1width=48') + (/[?&]width=/.test(src) ? '' : (src.includes('?') ? '&' : '?') + 'width=48');
    });
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    if (max === min) return [30, 0, l * 100];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s * 100, l * 100];
  }

  /* ---------- Gallery: cursor-following zoom (fine pointers only) ---------- */
  function galleryZoom(root) {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    root.querySelectorAll('.product__media-list .product__media-item:not([data-o-zoom])').forEach((item) => {
      const img = item.querySelector('img');
      if (!img) return;
      item.setAttribute('data-o-zoom', '');
      item.addEventListener('pointermove', (e) => {
        const box = item.getBoundingClientRect();
        img.style.transformOrigin = `${((e.clientX - box.left) / box.width) * 100}% ${((e.clientY - box.top) / box.height) * 100}%`;
      });
      item.addEventListener('pointerenter', () => item.classList.add('is-zoom'));
      item.addEventListener('pointerleave', () => item.classList.remove('is-zoom'));
    });
  }

  /* ---------- Title: words rise out of a mask ---------- */
  function titleSplit(root) {
    root.querySelectorAll('.product__info-container .product__title h1:not([data-o-words])').forEach((h1) => {
      h1.setAttribute('data-o-words', '');
      if (reduceMotion.matches) return;
      const words = h1.textContent.trim().split(/\s+/);
      h1.setAttribute('aria-label', h1.textContent.trim());
      h1.innerHTML = words
        .map((w, i) => `<span class="o-word" aria-hidden="true"><span style="--w:${i}">${w.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])}</span></span>`)
        .join(' ');
      requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add('is-in')));
    });
  }

  /* ---------- Variant pills: one indicator slides to the chosen option ---------- */
  function pills(root) {
    root.querySelectorAll('.product-form__input--pill:not([data-o-pills])').forEach((set) => {
      set.setAttribute('data-o-pills', '');
      const ind = document.createElement('span');
      ind.className = 'o-pill-ind';
      ind.setAttribute('aria-hidden', 'true');
      // A static anchor at the indicator's untransformed origin: measuring it
      // instead of offsetTop keeps the maths right whatever the legend does.
      const origin = document.createElement('span');
      origin.className = 'o-pill-origin';
      origin.setAttribute('aria-hidden', 'true');
      set.prepend(ind, origin);
      set.classList.add('has-ind');
      const place = () => {
        const label = set.querySelector('input:checked + label');
        if (!label) return (ind.style.opacity = '0');
        const o = origin.getBoundingClientRect();
        const l = label.getBoundingClientRect();
        ind.style.opacity = '1';
        ind.style.width = l.width + 'px';
        ind.style.height = l.height + 'px';
        ind.style.transform = `translate(${l.left - o.left}px, ${l.top - o.top}px)`;
      };
      place();
      requestAnimationFrame(() => ind.classList.add('is-ready'));
      set.addEventListener('change', place);
      if ('ResizeObserver' in window) new ResizeObserver(place).observe(set);
    });
  }

  /* ---------- Price rolls when the variant changes it ---------- */
  function priceRoll(root) {
    root.querySelectorAll('.product__info-container [id^="price-"]:not([data-o-roll]), .product__info-container .pv-price:not([data-o-roll])').forEach((el) => {
      el.setAttribute('data-o-roll', '');
      let last = el.textContent.trim();
      new MutationObserver(() => {
        const now = el.textContent.trim();
        if (now === last) return;
        last = now;
        el.classList.remove('o-roll');
        void el.offsetWidth;
        el.classList.add('o-roll');
      }).observe(el, { childList: true, subtree: true, characterData: true });
    });
  }

  /* ---------- Add-to-cart shine + icons that draw in once visible ---------- */
  function nudges(root) {
    const once = (el, cls) => {
      if (!('IntersectionObserver' in window)) return el.classList.add(cls);
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add(cls);
          io.unobserve(en.target);
        });
      }, { threshold: 0.6 });
      io.observe(el);
    };
    root.querySelectorAll('.product-form__submit:not([data-o-shine])').forEach((btn) => {
      btn.setAttribute('data-o-shine', '');
      btn.classList.add('o-shine');
      once(btn, 'is-shining');
    });
    root.querySelectorAll('.o-pdp-delivery:not([data-o-draw]), .o-pdp-trust__list:not([data-o-draw]), .o-pdp-tip:not([data-o-draw])').forEach((el) => {
      el.setAttribute('data-o-draw', '');
      el.querySelectorAll('svg path, svg circle, svg rect, svg polyline, svg line').forEach((p) => p.setAttribute('pathLength', '1'));
      once(el, 'is-drawn');
    });
  }

  const init = (root = document) => {
    delivery(root);
    galleryCount(root);
    stickyBar(root);
    look(root);
    tone(root);
    galleryZoom(root);
    titleSplit(root);
    pills(root);
    priceRoll(root);
    nudges(root);
    watchInfo(root);
  };

  /* Dawn re-renders the variant picker after each change: re-arm new nodes. */
  function watchInfo(root) {
    root.querySelectorAll('.product__info-container:not([data-o-watch])').forEach((info) => {
      info.setAttribute('data-o-watch', '');
      let queued = false;
      new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          pills(info);
          priceRoll(info);
        });
      }).observe(info, { childList: true, subtree: true });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
  document.addEventListener('shopify:section:load', (e) => init(e.target));
  window.Oelnor = Object.assign(window.Oelnor || {}, { initProduct: init, reduceMotion });
})();
