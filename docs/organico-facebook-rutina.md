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
- **Reels (petición del 23/11):** la publicación de la **tarde** es un **vídeo vertical 9:16 de 8–15 s** (la de la mañana sigue
  siendo foto). Opción barata por defecto: montaje con ffmpeg de 2–4 fotos editoriales (movimiento lento, cortes, grano, textos
  cortos en mayúsculas, música Mixkit a −14 LUFS); o reutilizar un vídeo ya hecho que no esté en Facebook. Clips de Kling solo
  cuando merezca la pena. Se sube con `video_url`: Facebook lo publica como vídeo vertical en la página; que además salga en la
  pestaña Reels lo decide Facebook (la conexión no tiene opción específica de Reels).
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
- «Facebook OELNOR · post de tarde»: todos los días a las **17:41** (Canarias) · desde el 23/11, vídeo vertical (reel).
- Queda un aviso suelto del sáb 21/11 a las 19:00 (reel «3 colores» de Sara) que no se pudo borrar: cuando salte, **no publicar**
  (ya cubre la rutina de la tarde); el reel puede usarse como contenido de un día sin test.

## TikTok (21/11/2026)
Cuenta de TikTok de OELNOR conectada a Higgsfield (connector `12e15629-76a9-4973-a198-d84a94cd1ddd`, activa).
**TikTok no deja publicar en automático:** cada publicación exige que la dueña confirme en un formulario de TikTok
(privacidad, comentarios, declaraciones), que esta app no muestra. Probado el 21/11 con el vídeo de Alicia.
Rutina: tarea programada «TikTok OELNOR · vídeo del mediodía», todos los días a las **11:47** (Canarias): Claude prepara el vídeo
(`docs/creativos/tiktok/`), se lo manda a la dueña con el texto listo para pegar y ella lo sube a las 12:00.

| Fecha | Producto | Vídeo |
|---|---|---|
| 25/11 | Vestido Marta (test lanzado hoy) | `docs/creativos/tiktok/2026-11-25-vestido-marta.mp4` (= `vestido-marta/anuncios/v1-editorial.mp4`) · enviado a la dueña 11:49 |
| 24/11 | Botines Lara | `docs/creativos/tiktok/2026-11-24-botines-lara-tacon-medio.mp4` (= `botines-lara/v3-editorial.mp4`, no estaba en TikTok) · enviado a la dueña 11:49 |
| 23/11 | Chaqueta Sara | `docs/creativos/chaqueta-sara/anuncios/v2-editorial.mp4` (reutilizado) · enviado a la dueña 11:48 |
| 22/11 | Zapatos Clara (test lanzado hoy) | `docs/creativos/zapatos-clara/anuncios/v1-editorial.mp4` (reutilizado) · enviado a la dueña 11:48 |
| 21/11 | Vestido Alicia (test activo) | `docs/creativos/vestido-alicia/anuncios/v2-editorial.mp4` (reutilizado, no estaba en TikTok) · enviado a la dueña 11:48 |

## Registro
| Fecha | Franja | Producto | Idea | Post |
|---|---|---|---|---|
| 19/11 | tarde | Chaqueta Sara | Portada carrusel «El cuello que hace de bufanda» | 1273682892503835_122133911469470240 |
| 20/11 | mañana | Vestido Alicia (día del test) | Vídeo editorial de campaña (`docs/creativos/vestido-alicia/anuncios/v2-editorial.mp4`, reutilizado: no estaba en Facebook) | vídeo 4208818602749121 |
| 20/11 | tarde | Vestido Alicia (día del test) | Foto editorial nocturna con flash en burdeos, 9:16 (fotograma inicial del vídeo, no publicado antes) · `docs/creativos/organico-facebook/2026-11-20-tarde-vestido-alicia.jpg` | 1273682892503835_122134215945470240 |
| 21/11 | mañana | Abrigo Lola (azul) | Editorial en calle de piedra con arcos, abriendo el abrigo para enseñar el forro de leopardo · `docs/creativos/organico-facebook/2026-11-21-manana-abrigo-lola.jpg` | 1273682892503835_122134368201470240 |
| 21/11 | tarde | Medias térmicas efecto transparente | Editorial de piernas en un puente al anochecer, falda corta y abrigo camel; oferta de regalo con 2 productos · `docs/creativos/organico-facebook/2026-11-21-tarde-medias-termicas.jpg` | 1273682892503835_122134461993470240 |
| 22/11 | mañana | Zapatos Clara (día del test) | Vídeo editorial de campaña (`docs/creativos/zapatos-clara/anuncios/v1-editorial.mp4`) | vídeo 1474265404666857 |
| 22/11 | tarde | Zapatos Clara (día del test) | Editorial nocturna con flash en una terraza, negros con medias finas y blazer · `docs/creativos/organico-facebook/2026-11-22-tarde-zapatos-clara.jpg` | 1273682892503835_122134689609470240 |
| 23/11 | mañana (publicado ≈ 11:50 por un reinicio) | Abrigo Beatriz (marrón) | Editorial setentera en un bulevar con plátanos, gafas tintadas y botas altas · `docs/creativos/organico-facebook/2026-11-23-manana-abrigo-beatriz.jpg` | 1273682892503835_122134935441470240 |
| 23/11 | tarde (primer reel) | Botines Lara | Vídeo vertical editorial de otoño: abrigo camel, pantalón crudo y luz de tarde; termina en los botines (`docs/creativos/botines-lara/v3-editorial.mp4`, reutilizado: no estaba en la página) · `docs/creativos/organico-facebook/2026-11-23-tarde-botines-lara.mp4` | vídeo 1530410652475700 |
| 24/11 | mañana | Blazer Carmen efecto ante | Editorial en la barra de un café antiguo con mármol y latón, camisa blanca y vaqueros oscuros · `docs/creativos/organico-facebook/2026-11-24-manana-blazer-carmen.jpg` | 1273682892503835_122135149575470240 |
| 24/11 | tarde (reel) | Chaqueta Sara | Vídeo editorial de campaña (`docs/creativos/chaqueta-sara/anuncios/v2-editorial.mp4`, reutilizado: no estaba en Facebook) · `docs/creativos/organico-facebook/2026-11-24-tarde-chaqueta-sara.mp4` | vídeo 1484493513648871 |
| 25/11 | mañana | Vestido Marta (día del test) | Editorial de Nochevieja en una terraza con copa (`vestido-marta/anuncios/m4-nochevieja-sin-texto.jpg`, descartada de los anuncios) · `docs/creativos/organico-facebook/2026-11-25-manana-vestido-marta.jpg` | 1273682892503835_122135397795470240 |
| 25/11 | tarde (reel) | Vestido Marta (día del test) | Vídeo de estudio + detalle de flecos (`vestido-marta/anuncios/v2-estudio-detalle.mp4`) · `docs/creativos/organico-facebook/2026-11-25-tarde-vestido-marta.mp4` | vídeo 1711278850651167 |
