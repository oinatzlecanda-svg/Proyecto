# Oelnor — tema de Shopify

Tema para la tienda **Oelnor** (moda, accesorios y objetos funcionales con
diseño), construido sobre **Shopify Online Store 2.0** partiendo de la base
técnica de **Dawn** (Shopify, licencia MIT — ver `LICENSE.md`) y adaptado por
completo a la identidad, estructura comercial y reglas de contenido definidas
en el brief de la marca.

Este repositorio contiene **solo el código del tema**. Los productos,
colecciones, menús, políticas y apps (reseñas, etc.) son datos de la tienda y
se configuran desde el Admin de Shopify — no pueden vivir en el código. Esta
guía indica exactamente qué crear para que el tema funcione tal y como está
diseñado.

## 1. Instalar el tema

```
shopify theme push --store tu-tienda.myshopify.com
```

O sube el repositorio como tema personalizado desde
Admin → Tienda online → Temas → Añadir tema.

## 2. Colecciones que espera el tema

Créalas con estos **handles exactos** (Shopify genera el handle a partir del
título; revísalo en la pestaña "Buscar y edición web" de la colección):

| Handle | Tipo | Orden recomendado | Uso |
|---|---|---|---|
| `novedades` | Automática (condición amplia, ej. "Título contiene ''") | Fecha: de nueva a antigua | Sección "Acaba de llegar" y menú |
| `seleccion-oelnor` | Manual | Manual (la controláis vosotros) | Sección "Selección Oelnor" — añade el tag `seleccion-oelnor` a cada producto que quieras incluir aquí (o gestiona la colección manualmente) |
| `mas-vendidos` | Automática | Más vendidos | Sección "Más vendidos" (desactivada por defecto, ver más abajo) |
| `moda`, `accesorios`, `lifestyle` | Automática (por tag) | Fecha: de nueva a antigua | Navegación y páginas de colección |
| `all` | Ya existe por defecto en Shopify | — | Sección "Todo Oelnor" (catálogo completo, funciona con 5 o 500 productos) |

Después, en el editor de temas, entra en cada sección de la home
(**Navega por categoría**, **Acaba de llegar**, **Todo Oelnor**, **Selección
Oelnor**) y asigna estas colecciones — el tema no las asume por handle en
todos los sitios, algunas hay que seleccionarlas a mano la primera vez.

**Más vendidos**: la sección `featured-collection` para `mas-vendidos` no
está incluida en `templates/index.json` por defecto para no mostrar nunca
ventas inventadas o una sección vacía. Cuando tengáis ventas reales,
añadid la sección "Colección destacada" desde el editor, seleccionad
`mas-vendidos` (ordenada por "Más vendidos") y colocadla donde queráis.

## 3. Menús de navegación

- **Menú principal** (`main-menu`): Novedades · Moda · Accesorios · Lifestyle
  · Más vendidos · Oelnor. No añadas subcategorías vacías: en cuanto una
  categoría tenga productos suficientes, añade el submenú correspondiente
  (ver el brief: Bolsos / Joyas / Accesorios personales / Viaje, etc.).
- **Footer — Comprar**: usa el menú `footer` (handle por defecto de
  Shopify) con Novedades / Moda / Accesorios / Lifestyle / Más vendidos.
- **Footer — Oelnor**: crea un menú con handle `footer-oelnor`
  (Nuestra historia, Contacto).
- **Footer — Ayuda**: crea un menú con handle `footer-ayuda` (Envíos,
  Devoluciones, Preguntas frecuentes, Seguimiento del pedido).
- **Legal**: no hace falta crearlo — el footer ya muestra automáticamente
  las políticas configuradas en Admin → Configuración → Política.

## 4. Productos iniciales

El brief pide 5 productos placeholder ("Producto 01"–"Producto 05") **sin
inventar** características, precios, materiales, stock ni reseñas. Esos
datos son responsabilidad de quien cargue el catálogo real en Admin →
Productos; el tema está listo para mostrarlos tal cual los deis de alta,
funcione con 5 o con 500.

Etiquetas (tags) que activan comportamiento automático:

- `best-seller` → insignia "Best Seller" en la tarjeta de producto.
- `seleccion-oelnor` → insignia "Selección Oelnor" y aparece en esa sección.
- La insignia **NUEVO** es automática: se muestra sola durante los días
  configurados en Tema → Configuración → **Etiquetas Oelnor** (14 días por
  defecto) a partir de la fecha de publicación del producto. No hay que
  poner ningún tag.
- La insignia **OFERTA** aparece sola cuando el producto tiene un
  "Precio de comparación" real superior al precio de venta.

## 5. Reseñas (reviews)

El tema **nunca** muestra reseñas falsas:

- En la página de producto, la valoración con estrellas solo aparece si el
  producto tiene el metacampo `reviews.rating` relleno (lo rellena
  automáticamente una app de reseñas, p. ej. Shopify Product Reviews,
  Judge.me o Loox).
- En la home hay una sección **"Opiniones (Oelnor)"** pensada para 2-3
  testimonios reales elegidos a mano (capturas de pantalla, DMs, etc.). Por
  defecto no tiene bloques y por tanto **no se muestra**. Añade un bloque
  "Opinión real" solo cuando tengáis una reseña genuina que mostrar.

## 6. Contenido social ("Visto en Oelnor")

La sección viene con 4 bloques de ejemplo usando imágenes placeholder.
Sustituye la imagen de cada bloque por una captura real de TikTok/Instagram
y añade el enlace a la publicación en cuanto tengáis contenido propio.

## 7. Checkout y métodos de pago

Apple Pay, Google Pay, Shop Pay, tarjeta y PayPal se activan desde Admin →
Configuración → Pagos. El tema no necesita ningún cambio: Shopify los
muestra automáticamente en el checkout según lo que actives ahí.

## 8. Colores, tipografía y forma

Todo es editable desde **Tema → Personalizar → Configuración del tema**:

- Paleta neutra (blanco roto, crema, beige, piedra, negro) en "Esquemas de
  color".
- Tipografía: `Assistant` para texto y `Jost` para titulares por defecto.
  Si al abrir el editor no encontráis "Jost" en la librería de fuentes de
  vuestra cuenta, elegid cualquier sans-serif geométrica contemporánea
  desde el propio selector visual — no hace falta tocar código.
- Radios de esquina ~12–24 px ya aplicados a tarjetas, imágenes, pop-ups y
  botones.
- El carrito está configurado como **carrito lateral** (drawer).

## 9. Secciones nuevas incluidas (no son de Dawn)

Todas son 100% editables/reordenables/duplicables desde el editor de temas:

- `sections/discover-by-use.liquid` — "Descubre por uso".
- `sections/product-discovery.liquid` — "¿Qué buscas hoy?".
- `sections/social-ugc.liquid` — "Visto en Oelnor".
- `sections/trust-bar.liquid` — barra de beneficios de compra.
- `sections/reviews-carousel.liquid` — opiniones reales (home).
- `sections/problem-product-result.liquid` — "Problema → Producto →
  Resultado" (producto, opcional, añade bloques solo si aplica).
- `sections/how-it-works.liquid` — "Cómo funciona" (producto, opcional).

Además, en la página de producto se añadió una **barra de compra fija en
móvil** (aparece al perder de vista el botón "Añadir al carrito" principal)
implementada directamente en `sections/main-product.liquid`.

## 10. Escalabilidad

Ninguna sección de la home tiene productos "quemados": todas apuntan a
colecciones de Shopify, así que la tienda funciona igual con 5, 50 o 500
productos sin rediseñar nada. Añadir categorías nuevas es cuestión de crear
la colección y añadirla al menú — el tema no necesita cambios de código.

## 11. Rediseño con animaciones y 3D

Paleta neutra clara: fondo blanco roto `#F4F0E9`, texto casi negro
`#1A1714` (contraste 15,7:1), texto secundario `#5B544A` (6,6:1) y acento
marrón `#77583A` (5,7:1), todos por encima de WCAG AA. Se aplica desde los
**Esquemas de color** del tema (header, carrito, tarjetas y página de
producto) y desde las variables `--o-*` de `assets/oelnor-motion.css`.
Los esquemas 3 y 4 son oscuros (barra de anuncios, pie). Cualquier sección
Oelnor puede invertirse con la clase `o-dark` (la banda de oferta la usa).

Secciones nuevas (todas editables desde el editor de temas):

- `sections/oelnor-hero-3d.liquid` — anillo 3D (three.js) con las fotos de
  la colección elegida. Se puede arrastrar, gira con el scroll y cada foto
  enlaza a su producto. three.js solo se descarga cuando el hero está en
  pantalla; sin WebGL se muestra un collage estático.
- `sections/oelnor-marquee.liquid` — texto en bucle (oscuro o arena).
- `sections/oelnor-category-index.liquid` — índice de categorías a gran
  tamaño con una imagen que sigue al ratón.
- `sections/oelnor-product-rail.liquid` — en ordenador la sección se fija y
  los productos avanzan en horizontal con el scroll; en móvil se deslizan.
  Tarjetas con inclinación 3D y segunda foto al pasar el ratón. Omite los
  productos con el tag `excluir-catalogo-moda`.
- `sections/oelnor-statement.liquid` — manifiesto que se ilumina palabra a
  palabra con el scroll, con imágenes en parallax.
- `sections/oelnor-product-3d.liquid` — (producto) carrusel 3D con las
  fotos del producto: arrastrar con inercia, flechas y teclado. Solo
  aparece si el producto tiene 3 fotos o más.
- `sections/oelnor-product-story.liquid` — (producto) "Por qué te va a
  gustar": usa el inicio de la descripción y bloques de ventajas
  opcionales.

Animación global en `assets/oelnor-motion.js` / `oelnor-motion.css`:
revelado al hacer scroll, titulares palabra a palabra, botones magnéticos,
cursor "Ver" sobre productos, intro con el nombre de la tienda (una vez por
visita) y entrada escalonada en la ficha de producto. Todo respeta
"reducir movimiento" del sistema y solo anima `transform`, `opacity` y
`clip-path`.

## 12. Páginas de producto con packs (bundles)

Todos los productos usan la plantilla `product`. Los productos que se venden
por packs (ahora mismo las **Medias térmicas efecto transparente**) usan la
plantilla `product.bundles`: es idéntica, pero añade el bloque
**Oelnor · Packs** encima del selector de variantes.

El bloque convierte la opción `Pack` (1 par / 2 pares / 3 pares) en
tarjetas con el precio por par y el ahorro, calculados con los precios
reales de las variantes (precio de 1 unidad × nº de unidades frente al
precio del pack). La talla se sigue eligiendo con el selector normal.

Para dar packs a otro producto: crea una opción llamada `Pack` cuyos
valores empiecen por el número de unidades (`1 par`, `2 pares`…) y, en
Admin → Producto → Plantilla del tema, elige `bundles`.

## 13. Home basada en la tienda publicada

La home mantiene el diseño oscuro y animado, pero usa el contenido real de
la tienda (colecciones, mensajes y oferta del tema publicado):

1. Hero 3D — "Estilo con intención.", anillo con `la-seleccion-oelnor`.
2. Marquee — Streetwear con intención · Envío gratis · 30 días · Pago seguro.
3. `oelnor-gateway` — accesos Mujer / Hombre / Accesorios (en móvil se deslizan).
4. `oelnor-offer` — "Dos piezas o más. 25 % menos." (descuento automático
   activo en Admin). Tiene fecha de fin opcional: pasada, la banda se oculta.
5. Índice de categorías con las "edits" (chaquetas, calzado, pantalones…).
6. Carril horizontal "La selección." (`la-seleccion-oelnor`).
7. `oelnor-feature` — "El frío no es excusa." → `/pages/coleccion-otono`.
8. Todo OELNOR (`todos-los-productos-oelnor`).
9. Manifiesto "Menos básico. Más identidad."
10. `oelnor-trust` — Envío gratis · 30 días para devolver · Pago seguro.
11. Newsletter "Novedades OELNOR".

La barra de anuncios y el pie usan los mismos mensajes y menús (`main-menu`,
`footer`) que la tienda publicada.
