# Productos nuevos en la tienda · 09/11/2026

Salen de `docs/busqueda-productos-2026-11-09.md`. Activos y publicados en Tienda online, Shop, POS, Facebook & Instagram,
TikTok y Google & YouTube. Stock sin seguimiento (como el resto). Entran solos en «Todos», «Ropa» y «Black Friday · Compra 2»
(regalo de medias); añadidos a mano a «Chaquetas mujer» / «Vestidos» y «Moda Mujer».

| Producto | Origen | PVP | Colores | Tallas | Colecciones |
|---|---|---|---|---|---|
| [Chaqueta Nerea acolchada ligera](https://oelnorstore.com/products/chaqueta-nerea-acolchada-ligera) | «Kelley / Aurora» (11 tiendas, n.º 1 en 4) | 69,95 € | Caqui, crudo, azul marino, negro | M–3XL (M = 38) | Chaquetas mujer, Moda Mujer |
| [Blazer Carmen efecto ante](https://oelnorstore.com/products/blazer-carmen-efecto-ante) | «Cristina / Marcela» (7 tiendas) | 69,95 € | Marrón | XS–2XL | Chaquetas mujer, Moda Mujer |
| [Vestido Elena largo de encaje](https://oelnorstore.com/products/vestido-elena-largo-de-encaje) | «Quintina» (3 tiendas) | 69,95 € | Negro | XS–2XL | Vestidos, Moda Mujer |
| [Chaqueta Paula bordada con volantes](https://oelnorstore.com/products/chaqueta-paula-bordada-con-volantes) | «Ascensión / Rocío» (6 tiendas) | 64,95 € | Verde oliva | S–3XL | Chaquetas mujer, Moda Mujer |

Descartados en la ficha: en la chaqueta acolchada, el rojo y los azules claros (solo neutros) y las fotos con el forro de
cuadros tipo «marca» en los puños (las fotos de producto se generan con puños lisos: **pedir al proveedor la versión sin ese forro**).
En la chaqueta bordada, el estampado de leopardo.

## Fotos
- Primera foto de cada color: fondo blanco con maniquí invisible (Higgsfield, `gpt_image_2_5`, 1k) + sombra de suelo
  (`docs/creativos/fondo-blanco/sombra_suelo.py`), enlazada a su color. Archivos: `docs/creativos/fondo-blanco/nuevos-2026-11-09/`.
- Después, fotos de las tiendas de origen sin texto promocional (de modelo, espalda y detalle).
- Captura de las 4 fichas en móvil: `docs/creativos/fondo-blanco/nuevos-2026-11-09/fichas-movil.jpg`.

## Fichas
Formato de la tienda (por qué te va a gustar, detalles, talla y ajuste, cómo combinarlo) y envío «1–3 días hábiles de preparación
+ 7–14 de transporte» (igual que la política de envíos). **Sin composición inventada.** Guías de tallas copiadas de las tiendas de referencia (indicación de la dueña, 09/11):
- Nerea: Marta Belmonte (imagen «Guía de tallas Aurora»), medidas de prenda M–3XL. La talla S se quitó: el origen empieza en M (= 38).
- Carmen: Marta Belmonte («Marcela»), prenda XS–2XL.
- Elena: Silvia Dávila («Quintina»), **medidas del cuerpo** (pecho, cintura, cadera) XS–2XL.
- Paula: Elena Duero («Rocío»), prenda S–3XL.

## Pendiente del proveedor (antes de testear cualquiera)
Coste por escrito (+5 €/pedido), plazo real, composición, medidas por talla, fotos reales y muestra.

## Bajada de precios (09/11/2026, petición de la dueña: «algo elevados»)
Sin precio tachado (no se anuncia como rebaja). CPA máx. sin IVA = PVP × 0,905 − 0,25 − coste − 5 €.

| Producto | Antes | Ahora | CPA máx. con coste 18 € | con 20 € | con 25 € |
|---|---|---|---|---|---|
| Chaqueta Nerea, Blazer Carmen, Vestido Elena | 69,95 € | **59,95 €** | 31,0 € | 29,0 € | 24,0 € ⚠️ |
| Chaqueta Paula | 64,95 € | **54,95 €** | 26,5 € | 24,5 € ⚠️ | 19,5 € ❌ |
| Blazer Inés, Cárdigan Mila (finalistas del test) | 69,95 € | **59,95 €** | 31,0 € | 29,0 € | 24,0 € ⚠️ |

La competencia vende los mismos productos a 40–55 €. Con coste ≤ 20 € todos cumplen el CPA máx. ≥ 25 € (salvo Paula, que
necesita ≤ 19 €). Si el proveedor da un coste mayor, subir el precio antes de lanzar el test (sin ventas todavía).

## Fotos con IA (09/11/2026, petición de la dueña)
- **Chaqueta Nerea:** las fotos de fondo blanco de caqui, crudo y negro se rehicieron a partir de la azul marino (antes unas tenían
  4 botones y otras 5, y la crudo salía más corta y con un defecto en el bajo). Sustituidas con `fileUpdate` (mismo MediaImage, cada
  color sigue enlazado a su foto). Añadidas 3 fotos de modelo con IA: azul marino (calle), crudo (paseo marítimo), negro (terraza).
- **Blazer Carmen:** las 4 fotos de modelo del origen son casi iguales (misma pose, sin cara). Añadidas 2 con IA, en 2.º y 3.er
  lugar: look de calle de cuerpo entero y look de noche con jersey negro. (Un primer plano del ante lo bloqueó el filtro de la IA.)
- Archivos en `docs/creativos/fondo-blanco/nuevos-2026-11-09/`; galerías: `galerias-nerea-carmen.jpg`.
- Las personas están generadas con IA: no presentarlas como clientas. Al recibir la muestra, comprobar que la prenda coincide.
- **09/11:** «Vestidos» añadido al menú principal (Moda Mujer, después de Chaquetas).
