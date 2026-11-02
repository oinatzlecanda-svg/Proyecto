# Estudio del catálogo para tests · 29/10/2026

Objetivo: elegir qué productos **ya publicados en OELNOR** merece la pena testear en Meta,
sin repetir los ya testeados. Scorecard /100 de `docs/estrategia-meta-ads-octubre-2026.md`.

## 1. Qué queda fuera

| Motivo | Productos |
|---|---|
| Ya testeados (estrategia) | Rona, Mavi, Eira, Bomber Noa, Jeans Stella, Jeans Alba, Botas Sora, medias térmicas |
| Ya testeados (detectado en Shopify: sesiones que llegan de Facebook/Instagram a su ficha) | Bolso Siena (183 sesiones, 20–28/09), Bolso Aria (35, 06–07/10), Chaqueta Lena (25, 04–05/10), Chaqueta Kaia (21, 29–30/09), Portalabial Mía (33, 02–05/10), Bolso Mara (7, 01/10) |
| Descartados por la dueña | Numa, Dalia, Naya, Elva |
| Fuera del avatar | Ropa de hombre (Elio, Nox, Milo, Ciro, Arven, Riva, Axel, Arlo, Raze, Kairo) y gadgets |
| Básicos por debajo de 50 € (no aguantan un test con CPA ≥ 25 €) | Jersey Luma, Top Cristina, Bufanda Iris, Bolsa Nilo |

Quedan **17 candidatos**: 12 del catálogo antiguo y los 5 importados el 28/10.

## 2. Método

1. **Producto exacto en otras tiendas:** catálogo completo (`products.json`) de 169 tiendas que
   anuncian moda en Meta (ES, FR, IT, DE, NL, BE): **26.049 fichas**. Comparación de fotos (hash
   perceptual) contra todas las fotos de cada candidato. Solo cuenta como «mismo producto» una
   distancia ≤ 3 sobre 64 (verificado: los Botines Lara dan 0 con Rose Varenne).
2. **Puesto en más vendidos** de cada tienda (`/collections/all?sort_by=best-selling`).
3. **Anuncios activos que llevan a la prenda:** Meta Ad Library (45 búsquedas por tipo de prenda y
   por nombre de tienda), extrayendo la URL de destino de cada anuncio.
4. **Coste:** Shopify no tiene costes guardados y la búsqueda en AliExpress no encontró el listado
   exacto de ninguno → **coste sin confirmar en todos** (se usa una hipótesis, marcada).

Limitaciones: Facebook bloqueó parte de las consultas (algunas tiendas dieron 0 resultados);
no encontrar un producto en 169 tiendas no prueba que nadie lo venda (pueden usar otras fotos).
Google Trends sigue bloqueado desde el servidor.

## 3. Resultado

### Catálogo antiguo (12 productos): sin señal de demanda
Parka Elara, Cárdigan Alma, Sudadera Nara, Jeans Lucía, Pantalón Zuri, Jersey Violeta, Jersey Ares,
Botas Vega, Chaqueta Elia, Camisa Vera, Bailarinas Nora, Bolso Aina (y Jeans Haku y Jersey Riven,
unisex): **ninguno aparece en las 26.049 fichas** ni en los anuncios encontrados. Tampoco tienen
ventas ni tráfico propio. Sin «producto exacto en ≥ 2 tiendas» ni anuncios de competidores,
puntúan por debajo de 45/100 → **no testear** con lo que sabemos hoy.

### Los 5 importados: los únicos con señal real

| Producto (PVP OELNOR) | Tiendas que lo venden (precio) | Más vendidos | Anuncios activos que llevan a la prenda |
|---|---|---|---|
| **Botines Lara** (69,95) | 7: Rose Varenne FR, Carolina Moretti IT, Bellandi IT, Atelier Deauville FR, Amparo Cortés ES, Lurea ES, Marina Roca ES (49,95–54,95) | **#1** Rose Varenne, #5 Carolina Moretti | **11**: Rose Varenne 8 (desde 11/10), Carolina Moretti 3 (desde 20/10) |
| **Mary Jane Olivia** (59,95) | 9: Valeria Castaño ES, Anna Montero ES, Ana Martínez Madrid ES, Amelia Barcelona ES, Lumira ES, Anitta Moretti ES, Carolina Moretti IT, Delacroix FR, Famille Dumont FR (49,95–59,95) | #4 Anitta Moretti, #10 Carolina Moretti, #12 Delacroix | **9, en España**: Anna Montero 5 (desde 27/10), Valeria Castaño 4 (desde 19/10) |
| **Cárdigan Mila** (69,95) | 7: Anna Luce IT, Amparo Cortés ES, Anna Montero ES, Anitta Moretti ES, Carolina Moretti IT, Rose Varenne FR, Delacroix FR (54,95–62,99) | #5 Anna Luce, #16 Anitta Moretti | **4**: Anna Luce IT (desde 17/10) |
| **Vestido Adela** (74,95) | 5: Alma Valenne FR, Famille Dumont FR, Amparo Cortés ES, Lurea ES (59,95–69,95) | **#2** Alma Valenne, #21 Lurea | Indirectos: anuncios de Lurea (22–26/10) y Alma Valenne (26/10) a colecciones de vestidos que lo incluyen |
| **Cárdigan Greta** (64,95) | 1: Chiara Verona IT, en 4 versiones de color (49,95) | #4 y #6 Chiara Verona | **6**: Chiara Verona (desde 20/10) |

Todas estas tiendas son del mismo tipo (dropshipping con fotos de IA, «piel» sin demostrar,
tachados falsos). Sirven como señal de demanda, no como modelo. OELNOR vende entre 5 y 20 € más caro
que ellas: el precio solo se sostiene si la muestra demuestra calidad.

### Economía (hipótesis de coste, sin confirmar)
CPA máx. ≈ PVP/1,21 − coste − 3 € − pasarela (1,5 % + 0,25 €) − 8 % devoluciones.

| Producto | PVP | Coste supuesto | CPA máx. | Coste máximo para CPA ≥ 25 € |
|---|---|---|---|---|
| Vestido Adela | 74,95 | 20 € | ≈ 31,6 € | 26,6 € |
| Cárdigan Mila | 69,95 | 18 € | ≈ 29,9 € | 22,9 € |
| Botines Lara | 69,95 | 20 € | ≈ 27,9 € | 22,9 € (con piel real y PVP 89,95: 37,5 €) |
| Cárdigan Greta | 64,95 | 18 € | ≈ 26,3 € | 19,3 € |
| Mary Jane Olivia | 59,95 | 18 € | ≈ 22,6 € ❌ | 15,6 € (con piel real y PVP 69,95: 22,9 €) |

## 4. Scorecard /100

| Producto | Anuncios /20 | Exacto ≥2 /15 | Economía /25 | Gancho /15 | Temporada /10 | Proveedor /10 | Ajuste /5 | **Total** |
|---|---|---|---|---|---|---|---|---|
| Botines Lara | 16 | 15 | 12 | 12 | 9 | 3 | 4 | **71** |
| Cárdigan Mila | 10 | 15 | 14 | 12 | 9 | 3 | 5 | **68** |
| Mary Jane Olivia | 15 | 15 | 9 | 12 | 8 | 3 | 5 | **67** |
| Vestido Adela | 7 | 15 | 15 | 13 | 8 | 3 | 4 | **65** |
| Cárdigan Greta | 9 | 5 | 13 | 10 | 9 | 3 | 4 | **53** |
| Catálogo antiguo (mejor caso: Parka Elara) | 0 | 0 | 14 | 10 | 10 | 3 | 4 | **41** |

**Ninguno llega a 75** ni pasa los filtros duros: en todos faltan el coste confirmado y la muestra física.
La diferencia entre 71 y ≥ 75 la deciden el proveedor y la muestra (10 + 25 puntos).

## 5. Recomendación

Orden de test, cada uno solo si su muestra y su coste pasan el filtro:

1. **Botines Lara.** La demanda más clara: n.º 1 en ventas de Rose Varenne, 11 anuncios en 2 países y 7 tiendas.
   Condición: muestra que confirme **piel real** y horma correcta. Si es piel → PVP 89,95 € (CPA máx. ≈ 42,5 €
   con coste 20 €). Si no es piel → no testear a 69,95 € (precedente de Sora: calzado sintético a precio medio).
2. **Cárdigan Mila.** Sin el riesgo de tallas del calzado, prenda diferencial (punto + denim) y buen margen.
   Condición: coste ≤ 23 € y canalé de calidad en la muestra.
3. **Mary Jane Olivia.** Es la única con anuncios activos **en España** (9). Pero a 59,95 € no da CPA ≥ 25 €:
   solo con piel confirmada y PVP 69,95 €, o con un coste ≤ 15,6 €.
- **Reserva:** Vestido Adela (buena economía; falta un anuncio que lleve directamente a la prenda).
- **No testear:** Cárdigan Greta (una sola tienda) y el catálogo antiguo hasta tener evidencia nueva.

### Siguiente paso (antes de gastar 1 € en Meta)
Pedir al proveedor o agente de Lara, Mila y Olivia: coste puesto en España, composición por escrito
(¿piel real?), tabla de tallas, plazos y **muestra física**. Con eso se completan los 35 puntos
que faltan y se decide el primer test.
