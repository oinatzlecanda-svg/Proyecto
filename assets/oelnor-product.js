/* Oelnor product page: delivery estimate, gallery counter, sticky add-to-cart
   bar and "complete the look" recommendations. No animation loops: every
   update is event-driven (IntersectionObserver / MutationObserver). */
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

  const init = (root = document) => {
    delivery(root);
    galleryCount(root);
    stickyBar(root);
    look(root);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
  document.addEventListener('shopify:section:load', (e) => init(e.target));
  window.Oelnor = Object.assign(window.Oelnor || {}, { initProduct: init, reduceMotion });
})();
