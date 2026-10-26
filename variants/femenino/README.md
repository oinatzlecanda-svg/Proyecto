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
