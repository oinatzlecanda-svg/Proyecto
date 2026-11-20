# Rutina de publicaciones en Facebook (desde el 20/11/2026)

Petición de la dueña (19/11): **2 publicaciones al día** en la página de Facebook «Oelnor», una a **media mañana** (≈ 10:45 Canarias)
y otra por la **tarde** (≈ 17:45 Canarias). Las publica Claude con la conexión de Meta de Higgsfield (`meta_pages` → `publish`).

## Qué producto
1. **Día de lanzamiento de un test** (fecha de lanzamiento de un `docs/test-*.md`, o campaña de Meta que empieza ese día):
   las 2 publicaciones son del **producto del test**.
2. **Resto de días:** productos activos de la web (Shopify, estado ACTIVE, con stock/variantes disponibles), rotando:
   - no repetir producto en 5 días (mirar el registro de abajo);
   - priorizar lo que encaja con la temporada (abrigos, chaquetas, vestidos de ante, medias térmicas con la oferta hasta el 30/11);
   - nada de productos de prueba o de otra temática (máquinas de ruido, rodillos faciales, etc.).

## Estilo
- **Editorial** siempre: campañas de moda tipo revista/streetwear (grano de película, luz dura o contraluz, encuadres bajos,
  cemento, calle, flash nocturno, estudio sobrio). Ver los creativos `docs/creativos/vestido-alicia/anuncios/v2-editorial.mp4` y
  `docs/creativos/chaqueta-sara/anuncios/v2-editorial.mp4` como referencia.
- **Creatividad:** variar formato y concepto (look completo, detalle de tejido, dos colores juntos, «cómo combinarlo», bodegón,
  vídeo corto de 5–12 s). Un vídeo como mucho al día (los vídeos cuestan más créditos).
- Imagen nueva: Higgsfield `nano_banana_2_1` con la foto de fondo blanco del color como referencia (prenda idéntica: cuello,
  cierres, costuras), 4:5. Vídeo: `kling3_0` pro 5 s desde la imagen y montaje con ffmpeg (música Mixkit, −14 LUFS).
  Se puede reutilizar un creativo ya hecho si no se publicó antes en Facebook.
- **Sin texto encima de la foto** o muy poco (marca OELNOR pequeña); el mensaje va en el texto del post.
- Antes de publicar, **mirar la imagen**: la prenda tiene que coincidir con la real (sin botones inventados, mismo largo, mismo cuello).

## Texto del post
2–4 líneas, en español, tono cercano y elegante: la idea (look/ocasión), 1 detalle real de la ficha, colores/tallas, precio,
enlace a la ficha (`https://oelnorstore.com/products/<handle>`), oferta vigente si la hay (regalo de medias con 2 productos hasta el 30/11),
3–5 hashtags (#oelnor siempre).
**Prohibido:** materiales sin confirmar (decir «efecto ante», no «ante»), urgencias falsas, descuentos que no existan, presentar
a las modelos (IA) como clientas.

## Cómo se publica
1. Guardar la imagen/vídeo en `docs/creativos/organico-facebook/AAAA-MM-DD-{manana|tarde}-<handle>.{jpg|mp4}`, commit y push
   (la publicación usa la URL pública de GitHub raw de la rama `claude/loving-galileo-gau5lk`).
2. `meta_pages` → `publish` con `image_url` o `video_url` y `message`.
3. Apuntarlo en el registro de abajo (fecha, franja, producto, idea, id del post) y commit.
4. Avisar a la dueña en una línea. Si algo falla (créditos, Meta), avisar y no reintentar en bucle.

## Tareas programadas
- «Facebook OELNOR · post de media mañana»: todos los días a las **10:43** (Canarias).
- «Facebook OELNOR · post de tarde»: todos los días a las **17:41** (Canarias).
- Queda un aviso suelto del sáb 21/11 a las 19:00 (reel «3 colores» de Sara) que no se pudo borrar: cuando salte, **no publicar**
  (ya cubre la rutina de la tarde); el reel puede usarse como contenido de un día sin test.

## Registro
| Fecha | Franja | Producto | Idea | Post |
|---|---|---|---|---|
| 19/11 | tarde | Chaqueta Sara | Portada carrusel «El cuello que hace de bufanda» | 1273682892503835_122133911469470240 |
| 20/11 | mañana | Vestido Alicia (día del test) | Vídeo editorial de campaña (`docs/creativos/vestido-alicia/anuncios/v2-editorial.mp4`, reutilizado: no estaba en Facebook) | vídeo 4208818602749121 |
| 20/11 | tarde | Vestido Alicia (día del test) | Foto editorial nocturna con flash en burdeos, 9:16 (fotograma inicial del vídeo, no publicado antes) · `docs/creativos/organico-facebook/2026-11-20-tarde-vestido-alicia.jpg` | 1273682892503835_122134215945470240 |
