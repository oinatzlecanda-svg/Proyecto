# OELNOR — Estrategia de testeo Meta Ads y búsqueda de productos (oct 2026)

Resumen fiel del manual operativo interno del 27/10/2026. Fuente de verdad
para cualquier decisión de tests de producto, anuncios y escalado.

> **Actualización 28/10/2026:** se retira la oferta de −25 % por 2+ artículos.
> Todos los cálculos se hacen a PVP completo y con pedido de 1 artículo como
> escenario base. Ver «Cambios por retirar el −25 %». Las reglas de corte del
> mentor no cambian.

## Sistema en una página

- **Regla del sistema:** proteger caja en los tests. Escalar solo con compras
  reales, margen positivo y evidencia verificable en Shopify.
- **Canal/objetivo:** Meta Ads · campaña de ventas · conversión *Compra en web*
  (nunca campaña de tráfico). Mercado: España.
- **Presupuesto base:** 350 €/mes (ampliable si rentabilidad real y caja lo permiten; es base, no techo).
  - 150 € → 3 tests × hasta 50 €
  - 150 € → reserva para escalar productos rentables
  - 50 € → colchón / imprevistos
- **Cadencia:** 3 tests de producto/mes, **uno cada vez**.
- **Inversión por test:** configuración orientativa 50 €/día (velocidad de gasto,
  no orden de gastar). Techo: 50 € de gasto acumulado por producto. Los cortes se
  aplican al gasto acumulado del producto.
- **Creatividades:** 3–4 ángulos por producto; estándar 2 vídeos + 2 imágenes.
- **Oferta:** ninguna. El −25 % por 2+ artículos se retiró el 28/10/2026; se vende a PVP completo.
- **Prioridad de producto:** mujer, otoño/invierno, estilo editorial + streetwear;
  debe funcionar en creativos y tener margen.

**Qué NO hacemos**
- Lanzar un producto nuevo cada día, duplicar campañas sin ventas reales o mantener tests por intuición.
- Confundir compras atribuidas por Meta con pedidos confirmados de Shopify.
- Repetir un test de Rona, Mavi, Eira u otro ya evaluado sin hipótesis nueva documentada.

## Reglas del mentor (umbrales de corte, sin cambios)

Revisar gasto acumulado, CPC de enlace, ATC, checkouts y compras reales.

| Gasto | Decisión | Excepción / matiz |
|---|---|---|
| 10 € | CPC enlace ≥ 1,00 € → **PAUSAR** | Sin excepciones por CTR atractivo o visitas no contrastadas |
| 20 € | 0 añadidos al carrito → **PAUSAR** | Excepción: CPC enlace ≤ 0,25 € y tráfico real/señales sólidas → prolongar máx. hasta 30 € |
| 30 € | 0 compras verificadas y < 10 ATC → **PAUSAR** | Si ≥ 10 ATC y buenas señales → prolongar hasta control de 40 € |
| 40 € | Sigue con 0 compras → **PAUSAR** | No mantener porque "parece que va a vender" |
| 50 € | Techo orientativo de test | Si ya hay compras reales → revisión económica/seguimiento, no aumentar automáticamente |

Reglas adicionales:
- **Compra real** = pedido en Shopify conciliado con el importe cobrado; revisar cancelaciones/reembolsos.
- Checkouts iniciados = señal auxiliar, no sustituyen una compra.
- **CPC siempre de enlace**, no CPC (todos los clics).
- Excepciones solo si se cumple literalmente el umbral y hay tráfico legítimo; no improvisar.

Árbol: gastar → 10 € (CPC) → 20 € (ATC) → 30 € (compra / ≥10 ATC) → 40 € (sin compra, apagar).
Si aparece compra, medir margen y CPA antes de decidir escalado.

## Ruta de búsqueda de productos (embudo semanal: 10 ideas → 3 finalistas → 1 test)

1. **Mapa del catálogo:** revisar activos y ya probados; eliminar duplicados; mujer, estación y precio compatibles.
2. **Detección de demanda:** Meta Ad Library (competidores) + Google Trends (España, 90 días y 12 meses).
3. **Prueba de mercado:** mismo producto exacto en ≥ 2 tiendas; guardar URL, fecha, screenshots de anuncios y ficha.
4. **Duración + variaciones:** priorizar anunciantes con anuncios activos desde hace semanas y varias creatividades (pistas, no prueba de rentabilidad).
5. **Proveedor:** variante, coste final, disponibilidad, tallas, fotos fieles, devoluciones, envíos y coste fijo de **3 €/pedido**.
6. **Margen:** simular pedido de 1 artículo a PVP completo (escenario base) con comisiones, logística, impuestos y devoluciones; el pedido de 2 es solo escenario favorable.
7. **Calidad creativa:** 3–4 ganchos distinguibles; sin vídeo convincente en 3 s → bajar prioridad.
8. **Seleccionar:** puntuar 10, 3 a final, activar solo el primero que supere filtros duros.

Búsquedas sugeridas: "suede hobo bag", "asymmetric knit sweater", "striped cardigan"
y equivalentes en español/francés/inglés. En Meta: país España/Europa, todos los anuncios, activos; luego abrir marcas.

## Filtro de validación (scorecard /100)

| Factor | Puntos | Qué verificar |
|---|---|---|
| Anuncios de competidores | 20 | Activos con varias creatividades; antigüedad y anunciantes |
| Producto exacto en ≥ 2 tiendas | 15 | Fotos, variantes y detalles idénticos (no solo categoría) |
| Economía unitaria real | 25 | Margen y CPA máx. razonables a PVP completo con pedido de 1 artículo |
| Gancho y demostración | 15 | 3–4 ángulos claros (estética, utilidad, diferencia) |
| Estacionalidad y búsqueda | 10 | Interés actual, no solo pico viral |
| Proveedor y experiencia | 10 | Calidad, muestras, logística, devoluciones |
| Ajuste a OELNOR | 5 | Mujer editorial streetwear y precio percibido |

**Umbral: ≥ 75/100** + todos los filtros duros: proveedor confirmado, coste claro,
margen sostenible, variante real, creativos disponibles. Herramienta de trabajo, no garantía.

**Descartar de inmediato si:** el "ganador" solo tiene un anuncio reciente o el parecido es dudoso;
no hay coste fiable / el CPA máx. de un pedido de 1 artículo es demasiado pequeño;
proveedor no confirma material, tallas, composición o plazos; fotos poco fiables;
copia con riesgo de marca/diseño o promesas no demostrables; ya testeado y apagado por regla sin cambio demostrable.

Heurísticas de tiendas grandes ("100 anuncios", "80 productos", "25 % best sellers") son pistas, no evidencia: manda la validación cruzada.

## Qué testear ahora

**Actualización 28/10/2026:** se descartan Numa, Dalia, Naya y Elva como candidatos de test
(decisión de la dueña). Los candidatos salen de la búsqueda semanal de productos nuevos;
ver `docs/busqueda-productos-2026-10-28.md` (semana 1).

**Ya testeados (no repetir por inercia):** Rona, Mavi, Eira/chaqueta impermeable, Bomber Noa,
jeans Stella/Alba, Botas Sora, medias térmicas. Repetir exige hipótesis escrita y datos nuevos.
Medias térmicas: analizar ventas y beneficio del test previo; no presentarlas como nuevo.

## Margen y CPA

- Sin descuento: el ingreso del pedido es el PVP completo. Coste fijo proveedor **+3 € por pedido** (no por unidad).
- **CPA máximo admisible (pedido)** = ingreso cobrado neto de impuestos − coste de todas las unidades
  − 3 €/pedido − comisiones de pago − reserva devoluciones/otros variables.
- **Beneficio de contribución** = CPA máx. admisible − CPA real Meta. Negativo → no escalar.

Ingreso por pedido de 1 artículo (sin costes; orientativo, base imponible si aplica IVA 21 % — en Canarias rige IGIC, confirmar con asesoría):

| Producto | PVP (pedido 1 ud) | Sin IVA 21 % | Pedido 2 uds (escenario favorable) |
|---|---|---|---|
| Numa | 49,99 € | 41,31 € | 99,98 € |
| Dalia | 29,99 € | 24,79 € | 59,98 € |
| Naya | 34,99 € | 28,92 € | 69,98 € |
| Elva | 42,99 € | 35,53 € | 85,98 € |

Son importes comerciales, no beneficios. Costes de Numa, Dalia, Naya y Elva no confirmados.
Plantilla: CPA máx. ≈ PVP sin IVA − coste unidad − 3 € − comisión de pago − reserva devoluciones.

Casos conocidos:
- **Medias térmicas:** coste 10 €/par + 3 €/pedido; pack de 2 a 44,99 € = 20 € de producto antes de publicidad, pago, impuestos.
- **Botas Sora:** proveedor 29 € + 3 €/pedido, PVP 54,99 €. No repetir solo por temporada.
- **Packs:** la excepción del pack de 3 medias con el 25 % queda obsoleta al retirarse la oferta.

Controles de caja antes de escalar: pedidos cobrados, proveedor pagado/provisionado, IVA/IGIC según territorio,
comisiones, devoluciones, capital de reposición. Confirmar fiscalidad Canarias/península con asesoría.

## Cambios por retirar el −25 %

- **Escenario base = 1 artículo a PVP completo.** Más margen por pedido que antes en ventas de 1 ud,
  pero sin palanca para subir el ticket: no contar con pedidos de 2+.
- **El +3 €/pedido pesa más** en productos baratos (Dalia, medias); en Numa/Elva pesa menos.
  Esto refuerza priorizar tickets medios-altos con margen claro.
- **Creatividades y copy** venden estética, calidad y diferencia, nunca la oferta. Revisar que ningún
  anuncio, banner, ficha o descuento automático de Shopify siga mencionando/aplicando el −25 %.
- **Comparaciones:** los tests anteriores (Rona, Mavi, Eira, Sora, medias…) se hicieron con oferta;
  sus tasas de ATC/checkout/compra no son directamente comparables con los nuevos.
- **Embudo:** sin incentivo puede bajar la conversión carrito → compra; vigilar ATC → checkout → compra
  antes de culpar al producto.
- **Las reglas de corte 10/20/30/40/50 € y el presupuesto no cambian.**
- Si más adelante se quiere una palanca de ticket (envío gratis desde X €, packs, otra oferta), se testea
  como hipótesis separada y documentada, no mezclada con un test de producto.

## Ejecución de un test (un producto por tanda, objetivo Compra)

1. **Preparar producto:** ficha clara, fotos propias/autorizadas, variantes/tallas correctas, entrega y devoluciones visibles, checkout móvil OK.
2. **4 anuncios:** Vídeo 1 problema/deseo + solución/transformación · Vídeo 2 prueba de producto/outfits · Imagen 1 editorial · Imagen 2 detalle diferenciador.
3. **Comparación limpia:** misma campaña/objetivo; no cambiar landing, copy y presupuesto a la vez.
4. **Lanzar** a 50 €/día orientativo, aplicando el corte de 10 € de inmediato.
5. **Registrar:** gasto, impresiones, CTR enlace, CPC enlace, sesiones Shopify, ATC, checkout, compras reales, ingresos, CPA, margen estimado.
6. **Decidir:** PAUSAR / OBSERVAR HASTA SIGUIENTE CORTE / CONTINUAR CON COMPRA / EVALUAR ESCALADO, con motivo exacto.

Diagnóstico clics sin ventas:
- CTR bajo / CPC alto → gancho, producto-mercado o primer fotograma.
- Clics reales pero 0 ATC → precio/valor percibido, ficha, variantes, confianza, carga móvil.
- ATC pero poco checkout → carrito, gastos de envío, falta de incentivo, fricción.
- Checkouts sin pago → método de pago, errores, sorpresa de precio, confianza.

## Escalado

| Condición | Acción |
|---|---|
| 1 compra real | No apagar automáticamente; revisar CPA, margen, embudo; seguimiento día/siguiente |
| Ventas consistentes (≥ 3 pedidos reales) | Confirmar en Shopify, margen en 48–72 h, desconfiar de atribución inflada |
| Rentabilidad + caja suficiente | Subir presupuesto ~20 % cada 48 h y re-medir; si empeora CPA o caja, mantener/reducir |
| Sin rentabilidad | No escalar aunque Meta muestre ROAS atractivo o clics baratos |

## Plan de 4 semanas

| Semana | Trabajo | Entregable |
|---|---|---|
| 1 · Radar | Investigar 10 ideas, depurar 5, anuncios/proveedor/margen | Scorecard + presupuesto de proveedor del finalista |
| 2 · Test 1 | 4 creativos del primer finalista que supere ≥ 75/100, reglas 10/20/30/40 | Informe test 1: pausa / venta / escalado |
| 3 · Test 2 | Siguiente finalista, ángulo diferente al test 1 | Informe test 2 + comparación |
| 4 · Test 3 | Tercer finalista solo si supera filtros; si no, reservar caja | Informe final + plan mes próximo |

Regla de caja: gastar menos del máximo es una victoria si las señales obligan a cortar. Si hay ganador real,
reservar capital para pedidos/proveedor antes de subir Meta.

## Plantilla de decisión (rellenar antes de aprobar cada anuncio)

- Producto / SKU exacto
- PVP / coste proveedor (+3 €/pedido)
- 2 competidores + enlaces
- Meta Ad Library: fecha / creativos
- Interés Google Trends / estacionalidad
- CPA máximo neto calculado
- 4 ganchos creativos
- Puntuación /100 y filtros duros (Sí/No)
- Decisión / fecha: TESTEAR / RESERVA / DESCARTAR

## Fuentes y limitaciones

Vogue España (tendencias AW 26–27, 15/09/2026; botas, 05/10/2026), FashionUnited Retail AW26 (06/08/2026),
WGSN AW26/27, Meta Ad Library, guía de Google Trends. Catálogo Shopify consultado el 27/10/2026: 51 artículos activos.
Limitación: no se han comprobado anuncios de Numa, Dalia y Naya en Meta Ad Library ni sus costes con proveedor;
el orden es una lista de investigación priorizada, no tres ganadores demostrados.
