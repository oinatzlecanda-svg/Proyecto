# OELNOR 3.0 · Femenino

Variant of the published theme (*OELNOR 3.0 · Popup -10%*, commit `53a6417`) with a
feminine, neutral palette and an editorial hero. Only the files in this folder differ
from that theme; everything else is copied as is (Shopify `themeDuplicate`).

| File | Change |
| --- | --- |
| `assets/o3.css` | Palette: mocha `#3a2d29`, ivory `#f7f0ea`, nude `#ecdcd2`, dusty rose `#d9b3a6` (accent), rose ink `#8c5248`. Adds the editorial hero styles and the Cormorant serif. |
| `assets/o3-cormorant-*.woff2` | Serif for the hero headline. |
| `sections/o3-ehero.liquid` | New hero: full-bleed campaign photo (desktop + mobile crop), serif headline, "Comprar mujer" + "Hombre" buttons, "En la foto" product chips. |
| `sections/o3-marquee.liquid`, `o3-manifesto.liquid`, `o3-product-reviews.liquid`, `o3-tracking.liquid` | Inline colours moved to the new palette. |
| `snippets/o3-head.liquid` | Preloads the serif on the home page. |
| `sections/o3-rail.liquid` | Optional `anchor` setting so a hero button can jump to the rail. |
| `templates/page.autumn.json` | "Colección Otoño" landing rebuilt with the same o3 sections as the home: editorial hero (her in front, him behind), marquee, selection rail, spotlight, manifesto, "Sigue descubriendo" (ella y él), signup. |
| `sections/o3-about.liquid` | "Sobre Oelnor" teaser for the home: photo with a curtain reveal, serif headline, button to /pages/sobre-oelnor. |
| `sections/o3-chapters.liquid` | About-page story: one photo + text per chapter, alternating sides, curtain reveal. `o3-about` also takes a product photo now. |
| `templates/page.about.json` | "Sobre Oelnor" page rebuilt with the home's sections: editorial hero, marquees, chapters, manifesto with the three values, "Piezas Oelnor" rail, closing call to action. |
| `templates/index.json` | "Sobre Oelnor" block after the manifesto. Hero swapped for `o3-ehero`; "Lo más deseado" rail now women's pieces; the street rail is "Para él" and links to Hombre. |

Motion follows Emil Kowalski's rules: once-per-visit, transform/opacity only, custom
ease-out, short stagger, `scale(0.97)` on press, hover gated by `(hover: hover)`, and
`prefers-reduced-motion` keeps fades only.

## Performance (mobile first)

The theme files on Shopify are **built** from the sources here:

```
cd variants/femenino
node tools/build.mjs <dir with node_modules/csso + terser> <full theme copy>
```

`dist/assets/` is what gets uploaded (`o3.css`, `o3-pages.css`, `o3-product.css`,
`o3.js`, `base.css`, `global.js`). Edit `assets/o3.css` / `assets/o3.js` /
`vendor/*`, never the `dist` files.

| Change | Why |
| --- | --- |
| `o3.css` split by page (`tools/split_css.py`) and minified | The home downloads 8 KB of CSS (gzip) instead of 17 KB; product, collection and page styles only load where used (`snippets/o3-head.liquid`). |
| `o3.js`, Dawn `base.css` and `global.js` minified | Less to download and parse on every page. |
| `layout/theme.liquid`: Dawn fonts (Assistant ×4, Jost) no longer loaded or preloaded | Dawn's parts use Archivo, already loaded for the o3 sections. Two high-priority font downloads gone from every page. |
| `layout/theme.liquid`: older Oelnor layer (`oelnor-motion/theme/sections.css`, `oelnor-motion.js`) only on pages that still use Dawn or oelnor-* sections | ~60 KB of render-blocking CSS and 15 KB of JS removed from the home, landings, product, collection and policy pages. |
| Cart drawer CSS loads without blocking the first paint | The drawer is closed on load. |
| Fonts: only Archivo + the first-screen display face are preloaded | Fewer requests competing with the hero photo (LCP). |
| Hero photo: mobile candidates 540–1080 px | Enough for phone screens without sending 1200 px+ files. |
| Product cards: the hover photo is never downloaded on touch screens | Halves the image weight of every rail and collection grid on phones. |
| Marquees and spinning stickers pause off screen; rail sizes measured once; popup scroll check throttled to one per frame | Less main-thread and GPU work while scrolling on phones. |
| Hero "En la foto" chips: no backdrop blur on phones | A blur over the animating photo repaints every frame. |
| `content-visibility: auto` on the manifesto, about, chapters and signup bands | The browser skips laying out and painting them until they come near the screen. |
| GemPages app embed disabled in this theme | No page uses a GemPages template; its script loaded on every page. Re-enable it in *Theme settings → App embeds* if a GemPages page is published. |
