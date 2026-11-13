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
