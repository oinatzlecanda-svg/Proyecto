# Rendimiento de la web (ficha de producto en móvil) · 13/11/2026

Medido en la ficha del Blazer Inés con un iPhone simulado, 4G lento (1,6 Mb/s, 150 ms) y CPU ×4 (Playwright), 2 pasadas.

## Situación de partida (tema activo «botón arriba · 9 NOV»)
| Métrica | Valor | Referencia Google |
|---|---|---|
| Primer contenido (FCP) | 1,6–2,7 s | bueno < 1,8 s |
| Foto principal (LCP) | 3,8–4,9 s | bueno < 2,5 s, malo > 4 s |
| Bloqueo del procesador (TBT) | 1,2–1,5 s | bueno < 0,2 s |
| Saltos de diseño (CLS) | 0,006 | bueno < 0,1 ✅ |
| Peticiones / peso | 287 / 2,3 MB | — |

Peso por origen: tienda y Shopify 1,7 MB (366 KB son el checkout de Shop Pay que se precarga), Meta (píxel) 212 KB,
Loox 71 KB, Klaviyo 76 KB, Conversion Bear 47 KB, wetracked 8 KB.

## Fallos encontrados y arreglados (tema «Ficha limpia · 13 NOV», 211157942609)
1. **La tipografía Archivo se descargaba dos veces** (48 KB extra): la precarga pedía `o3-archivo.woff2?v=…` y la hoja de
   estilos `o3-archivo.woff2`. Ahora la precarga pide la misma dirección (igual Anton y Cormorant). Comprobado: 1 descarga.
2. **La foto principal se descubría tarde** (a 190 KB del HTML, detrás de CSS y fuentes): precarga con prioridad alta en la cabecera,
   igual que la foto de portada de la home.
3. **CSS de la cesta bloqueando la carga:** `quantity-popover.css` y `component-card.css` se cargaban bloqueando al principio
   del `<body>`; la cesta está cerrada al entrar, ahora cargan sin bloquear.
4. **App Conversion Bear (sellos de pago):** mostraba **Bitcoin** (la tienda no lo acepta) y no Bizum (sí se acepta), y carga un
   iframe con 9 descargas. Oculta en la ficha y sustituida por los iconos de pago de Shopify (los reales). **Hay que
   desinstalar la app** en Shopify → Apps para que deje de cargarse (yo no puedo desinstalar apps).

## Lo que queda y no depende del tema
- **Píxel de Meta + wetracked** (TBT): necesarios para medir los anuncios. No tocar.
- **Botón «Comprar con Shop»** (precarga ~0,5 MB del checkout de Shop Pay): ayuda a comprar rápido; se deja.
- **Loox y Klaviyo:** necesarios (opiniones y emails).

## Comprobación (vista previa del tema copia, móvil)
- Precarga de la foto principal en la cabecera ✅ · Archivo y Anton 1 sola descarga ✅.
- Iconos de pago de Shopify: Amex, Apple Pay, **Bizum**, Google Pay, Klarna, Maestro, Mastercard, Shop Pay, UnionPay, Visa ✅;
  caja de Conversion Bear oculta ✅.
- Los tiempos en vista previa no son comparables (Shopify no usa caché en la vista previa): medir otra vez tras publicar.

## Revisión 18/11/2026 (tema publicado «Ficha Sara · 15 NOV»), Lighthouse móvil
| Página | Nota | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| Ficha Chaqueta Sara | 51 | 2,8 s | 5,5 s | 830 ms | 0 |
| Home | 59 | 1,5 s | 5,4 s | 700 ms | 0,001 |

Los avisos de PageSpeed «Minimiza el trabajo del hilo principal» y «Reduce el JavaScript que no se use (330 KiB)» vienen de
scripts externos, no del tema:
- JS sin usar: Meta (fbevents + config, 75 KiB sin usar), gestor de píxeles de Shopify (35 KiB), botón Shop Pay (43 KiB).
- Tiempo de procesador en la ficha: Shopify píxeles 0,97 s · Loox 0,74 s · Shop (inicio de sesión) 0,38 s · Meta 0,68 s ·
  Klaviyo 0,57 s · Shop Pay 0,33 s · wetracked 0,28 s · **Conversion Bear 0,28 s (sigue cargándose, con el sello de Bitcoin)**.
- La foto principal (sara-calle-negro) se precarga bien: llega a la vez que el CSS. El LCP alto es por el procesador ocupado
  con esos scripts. El CSS sin usar (12 KiB) son las hojas pequeñas del carrusel de la barra de anuncios: no compensa tocarlas.
- Tras la carga, Shopify precarga el checkout (220 peticiones, 1,1 MB): es de Shopify y no se puede quitar desde el tema.

Qué hacer (dueña): desinstalar **Conversion Bear** en Apps (sigue instalada; ocultarla en el tema no basta).
Opcional, después del test: quitar el botón exprés de Shop Pay de la ficha (−0,3 s de procesador) si las compras no lo usan.

**18/11/2026, tras desinstalar Conversion Bear** (comprobado: ya no está en las apps ni se carga en la web). Ficha Sara, 2 pasadas:
nota 53–59 (antes 51) · LCP 4,2–4,6 s (antes 5,5) · TBT 0,81–0,94 s · JS sin usar 153 KiB (antes 330 KiB en PageSpeed).
Los iconos de pago de Shopify (con Bizum) siguen en la ficha.
