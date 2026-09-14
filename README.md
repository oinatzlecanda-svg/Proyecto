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
