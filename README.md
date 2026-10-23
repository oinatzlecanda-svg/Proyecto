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

## 14. Páginas de colección

`templates/collection.json` sigue el estilo de la home:

1. `oelnor-collection-hero` — ruta (Inicio / Moda Mujer / …), nº de piezas,
   título grande que entra palabra a palabra, descripción de la colección y
   accesos a las colecciones hermanas (se leen del `main-menu`: si la
   colección está en un submenú, se muestran sus hermanas). A la derecha, las
   tres primeras fotos se abren en abanico 3D y se inclinan con el ratón.
2. Cuadrícula de Dawn (filtros, orden, paginación y añadido rápido intactos)
   con tarjetas redondeadas, segunda foto con fundido y desenfoque, precios en
   color acento, filtros en forma de píldora y entrada escalonada; la
   animación se vuelve a aplicar cuando cambias filtros o página.
3. Banda de oferta 25 % (oscura) y franja de confianza.

La animación de entrada propia de Dawn (`animations_reveal_on_scroll`) está
desactivada para que no se duplique con la de Oelnor.

## 15. Navegación entre colecciones

- Las 23 colecciones usan `templates/collection.json` (ninguna tiene
  plantilla propia), así que todas comparten el diseño.
- Accesos de la cabecera de colección: si la colección está en un submenú
  del `main-menu`, se muestran sus hermanas (si está en varios, el submenú
  más grande); si no, los accesos principales (Moda Mujer, Moda Hombre,
  Accesorios). Siempre hay un último acceso a «Todas las colecciones».
- `/collections` usa `oelnor-collection-list`: tarjeta por colección con
  foto y nº de piezas, y filtros por grupo (cada elemento del menú con
  submenú). Para ocultar alguna, escribe su handle en «Colecciones ocultas».

## 16. Landing «Colección otoño»

`templates/page.autumn.json` es la plantilla que ya usa la página publicada
`/pages/coleccion-otono` (sufijo `autumn`), con los mismos 12 productos y
textos de la landing actual:

1. Hero 3D en modo «caída»: las fotos de los 12 productos caen girando como
   hojas (arrastrar inclina la lluvia, el scroll la acelera; en móvil son más
   pequeñas y suaves para no tapar el texto).
2. Marquee de temporada.
3. «Capas, texturas y carácter.» (Chaqueta Eira).
4. `oelnor-product-grid` «Piezas que marcan el look.» (ancla `#seleccion`):
   Sora, Lena, Kaia, Noa, Eira, Mavi.
5. «Cambia la temporada. No tu estilo.»
6. Carril «Sigue descubriendo.» (ancla `#sigue`): Elia, Elara, Riven, Naya,
   Axel, Ciro.
7. Oferta 25 % y franja de confianza.

La landing solo muestra productos: ningún botón lleva a colecciones (los
botones bajan a `#seleccion` o `#sigue` dentro de la propia página).

Novedades reutilizables: el hero acepta productos concretos y el modo
«Fotos que caen como hojas»; el carril acepta productos concretos, enlace
propio y ancla; `oelnor-product-grid` es una cuadrícula editorial nueva.

## 17. Rendimiento de las animaciones

- Solo se animan `transform`, `opacity` y `clip-path` (sin `transition: all`,
  sin sombras ni `filter` por fotograma).
- Los efectos de scroll (parallax, texto que se ilumina, carril horizontal)
  se calculan solo al hacer scroll y solo para los elementos cercanos a la
  pantalla: en reposo la página no ejecuta ningún bucle. Se leen todas las
  medidas antes de escribir estilos (un solo cálculo de layout por frame).
- Cursor, inclinación 3D, imagen flotante y carrusel 3D se detienen al
  llegar a reposo y usan suavizado independiente de los Hz de la pantalla
  (mismo ritmo a 60 y 120 Hz).
- Las tarjetas con inclinación solo se promueven a capa GPU mientras se
  mueven; el brillo se desplaza con `transform` en vez de repintarse.
- Marquees, ticker y anillo de la oferta se pausan fuera de pantalla.
- El 3D usa como máximo 1,5x de resolución en móvil y se pausa fuera de
  pantalla o con la pestaña oculta.
- Transiciones entre páginas con View Transitions (fundido de 280 ms;
  navegadores sin soporte navegan como siempre). Todo respeta «reducir
  movimiento».

## 18. Políticas, contacto y localizar envío

- **Políticas** (`/policies/*`): Shopify genera estas páginas, así que el
  tema añade desde `layout/theme.liquid` el snippet `oelnor-policy-shell`
  (cabecera, accesos a todas las políticas e índice lateral fijo creado con
  los apartados de cada política, que marca el apartado que se está
  leyendo). El texto sigue editándose en Admin → Configuración → Políticas.
- **Contacto** (`templates/page.contact.json`, sección `oelnor-contact`):
  formulario real de Shopify con tema, nº de pedido y teléfono opcionales,
  email con botón de copiar, accesos rápidos y preguntas frecuentes
  redactadas a partir de las políticas de envío y devolución.
- **Localizar envío** (`templates/page.tracking.json`, sección
  `oelnor-tracking`): botón al localizador de ParcelPanel
  (`/apps/parcelpanel`), el recorrido del pedido con los plazos de la
  política de envíos y ayuda si algo no cuadra. La página
  `localizar-pedido` usa esta plantilla (sufijo `tracking`).

## 19. Página de ParcelPanel (`/apps/parcelpanel`)

ParcelPanel genera su propia página de seguimiento dentro del diseño de la
tienda (app proxy). El tema la envuelve desde `layout/theme.liquid` con el
snippet `oelnor-parcelpanel-shell` (cabecera arriba; plazos de envío y ayuda
abajo) y `assets/oelnor-pages.css` restiliza su formulario, campos, botones,
resultados y barra de progreso (reglas genéricas dentro de `.o-pp` más los
selectores `pp_*` de la guía de CSS de ParcelPanel).

Ajustes en Tema → Configuración → **Oelnor · Seguimiento**: activar/desactivar,
ruta (por defecto `/apps/parcelpanel`), titular y texto. Si ParcelPanel tiene
CSS propio en su panel («Additional CSS»), conviene vaciarlo para que no
choque con este estilo.

## 20. Home más visual y con menos texto

- Sin banda de oferta y sin el mensaje del 25 % en la barra de anuncios.
- Fuera párrafos y antetítulos: solo titulares cortos y botones.
- `oelnor-photo-strip`: tira de fotos de producto en bucle (se pausa al
  pasar el ratón y fuera de pantalla); sustituye al texto en movimiento.
- `oelnor-category-index` tiene ahora un diseño «Tarjetas con foto» (el de
  lista sigue disponible); la home lo usa para las 8 edits.
- Orden: hero 3D → tira de fotos → Mujer/Hombre/Accesorios → La selección →
  El frío no es excusa → categorías → Todo OELNOR → Menos básico. Más
  identidad. → envío/devoluciones/pago → newsletter.

## 21. Home: hero editorial y filosofía de marca

- **Hero 3D** (`oelnor-hero-3d`): titular en dos líneas (`heading` + `heading_accent`, la segunda en color acento y sangrada), barra superior con antetítulo y frase (`tagline`), texto de marca, botones y un contador ligado al anillo 3D (`note` + `hint`; vacío lo oculta). La pista vertical se sustituye por una línea de scroll.
- **Nueva sección `oelnor-philosophy`** (Oelnor · Filosofía): frase principal que se ilumina con el scroll, texto, botón a "Sobre Oelnor", foto con parallax y hasta 4 principios numerados (bloques). Textos tomados de la página "Sobre Oelnor".
- **Orden de la home**: Hero → Filosofía → Mujer/Hombre/Accesorios → La selección → Tira de fotos → Otoño → Categorías → Menos básico, más identidad (con su frase) → Confianza → Newsletter. El grid genérico "Todo OELNOR" queda desactivado (lo cubren el carril y las categorías).
- La landing de otoño usa el mismo hero: "Selección / de otoño." con su contador.

## 22. Página "Sobre Oelnor"

Plantilla `page.about.json` (asignada a la página `sobre-oelnor`):

- **Oelnor · Hero Sobre** (`oelnor-about-hero`): "Una idea / sencilla.", frase de origen de la marca, firma y collage de tres fotos con parallax a distintas velocidades.
- **Oelnor · Capítulos** (`oelnor-about-chapters`): capítulos numerados con foto alternando lado (un capítulo sin foto se centra como texto). Lo que nos gusta · Nuestra selección · Cómo vestimos · Nuestro compromiso (con botón a Contacto).
- Marquee arena "Diseño · Funcionalidad · Personalidad", Filosofía ("Eso es Oelnor") con tres principios, tira de fotos de producto, destacado final "Encuentra lo tuyo." y confianza.
- Textos tomados de las páginas "Sobre Oelnor" y "Sobre nosotros". El contenido del editor de la página ya no se muestra en esta plantilla: se edita desde el personalizador del tema.

## 23. Página de producto orientada a conversión

Plantillas `product.json` y `product.bundles.json` (mallas con packs):

- **Galería editorial** (`gallery_layout: stacked`): primera foto a ancho completo y el resto en dos columnas, con contador "01 / 05" que sigue el scroll.
- **Bloques nuevos de la ficha** (snippet `oelnor-pdp-block`): Valoración (Loox), Cómo llevarlo (metacampo `custom.oelnor_style_tip`), Entrega estimada (fecha calculada en días hábiles: 8–17, según la política de envíos), Confianza (4 garantías + métodos de pago reales de la tienda) y Detalles (descripción, envíos, devoluciones y pago en acordeón). Se mantienen el selector de variantes, el aviso de stock bajo (dato real, umbral 5) y el botón de compra de Dawn, así que el carrito (Upcart) sigue funcionando.
- **Secciones**: Barra de compra fija (aparece al pasar el botón principal y pulsa el botón real), Completa el look (productos complementarios de Search & Discovery o relacionados), Opiniones (widget real de Loox + estado vacío honesto; nunca muestra opiniones inventadas) y Compra tranquila (garantías enlazadas + preguntas frecuentes).
- CSS y JS propios (`oelnor-product.css`, `oelnor-product.js`) solo se cargan en páginas de producto.
- **Loox**: activa la incrustación de la app en *Personalizar → Configuración del tema → Incrustaciones de aplicaciones* para que el widget cargue las opiniones.

## 24. Home: fondo con color y movimiento

- `assets/oelnor-home.css` (solo se carga en la home) recorre la página por capítulos de color marcados: crema → melocotón → caramelo (filosofía y accesos) → marfil (selección) → salvia → óxido (otoño) → chocolate (categorías, manifiesto y confianza). Cada sección termina en el color con el que empieza la siguiente, así que los cambios son fuertes pero sin cortes.
- Los capítulos oscuros invierten textos, líneas y botones con los mismos tokens que `.o-dark`.
- Cada sección lleva halos de color que se desplazan solos (12–20 s, solo `transform`) y, en navegadores con animaciones ligadas al scroll, además suben y bajan al hacer scroll. Con "reducir movimiento" se quedan quietos.
- Textura de papel muy suave sobre toda la página.
- Los tonos van por la clave de la sección en `templates/index.json` (`oelnor-hero`, `oelnor-filosofia`…). Si se cambia el orden de las secciones, ajusta `--o-tone-top` / `--o-tone-mid` / `--o-tone-bottom` en ese archivo para que sigan encadenando.

## 25. Landing "Colección otoño": color y movimiento

- `assets/oelnor-autumn.css` (solo se carga en la plantilla `page.autumn`) aplica el mismo sistema que la home con una paleta otoñal: crema y ámbar (portada) → naranja (cinta) → óxido y granate (historia) → chocolate (selección) → corte a naranja quemado (manifiesto) → arena y salvia (sigue descubriendo) → corte a chocolate (confianza).
- Las secciones oscuras invierten textos, líneas y botones; todas llevan halos de color que se desplazan solos (9–19 s, solo `transform`) y con scroll en navegadores compatibles. Con "reducir movimiento" se quedan quietos.
- Los tonos van por la clave de la sección en `templates/page.autumn.json` (`hero`, `marquee`, `story`, `seleccion`, `manifiesto`, `sigue`, `confianza`).

## 26. Sin oferta del 25 %

- Se ha quitado la sección `oelnor-offer` ("Dos piezas o más. 25 % menos.") de la home, la landing de otoño, la página de colecciones y la plantilla de colección. La sección sigue disponible en el editor por si se quiere volver a usar con otra promoción.

## 27. Página de producto con animación

Todo vive en `assets/oelnor-product.js` / `assets/oelnor-product.css` (solo se cargan en producto):

- **Capítulo de color propio**: el script lee la foto principal del producto, saca su tono medio y tiñe la parte alta de la ficha con ese color, con halos que se mueven despacio. Cada producto se ve distinto (una chaqueta verde da una ficha verdosa, una azul una azulada). Si la imagen no se puede leer, usa un tono cálido por defecto.
- **Galería**: las fotos aparecen con un recorte y se asientan desde un ligero zoom; en ordenador, al pasar el ratón la foto se amplía siguiendo el cursor; con scroll, la imagen se desplaza un poco dentro de su marco (navegadores compatibles).
- **Título**: las palabras suben una a una desde una máscara.
- **Tallas y colores**: una píldora oscura se desliza hasta la opción elegida (curva tipo iOS).
- **Precio**: cuando cambia con la variante, entra con un pequeño rodillo y desenfoque.
- **Botón "Añadir a la cesta"**: un brillo lo recorre una vez al aparecer y al pasar el ratón; se hunde ligeramente al pulsar.
- **Iconos**: el camión de la entrega entra rodando, los iconos de confianza se dibujan solos y la línea del consejo de estilo crece.
- Con "reducir movimiento" se mantienen los colores y se elimina el movimiento.
