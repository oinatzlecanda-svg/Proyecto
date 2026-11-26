# Email a suscriptoras · Klaviyo (05/11/2026)

**Por qué Klaviyo y no Gmail:** los emails comerciales necesitan baja en un clic (LSSI/RGPD), Gmail limita los envíos
masivos y los manda a spam, y sin Klaviyo no se ven aperturas ni ventas. Plan gratis hasta 250 contactos / 500 envíos al mes.

## Flujos (automáticos) · rehechos el 05/11/2026 a petición de la dueña
Los 5 flujos anteriores (Bienvenida v2, Navegación, Postcompra «Gracias», Tras el envío «Opinión», Customer Winback) están
**desactivados** (en borrador, no borrados). Los nuevos:

| Flujo | Disparador | Emails | Quién lo recibe |
|---|---|---|---|
| **1 · Bienvenida con 10 %** (`WkKnrc`) | Entra en la lista «Oelnor \| Suscriptores email» | Al momento (código **BIENVENIDA10**) · día 1 (quiénes somos) · día 3 (selección; no se envía si ya compró) | Suscriptoras |
| **2 · Navegación abandonada** (`QQPtpQ`) | Ve un producto | 4 h después, con el producto visto | Suscriptoras que no añadieron al carrito, no iniciaron pago ni compraron. Máx. 1 vez cada 14 días |
| **3 · Carrito abandonado** (`ULMvQJ`) | Añade al carrito | 4 h y 24 h («¿Dudas con la talla?») | Suscriptoras que no iniciaron pago ni compraron. Máx. 1 vez cada 7 días |
| **4 · Pago abandonado** (`WErTJX`) | Inicia el pago | 1 h y 24 h, con los productos y enlace al pago | Suscriptoras que no compraron. Máx. 1 vez cada 7 días |
| **5 · Petición de reseña** (`W427aG`) | Pedido enviado (Fulfilled Order) | 14 días después (cubre 6–12 días laborables de entrega), enlace a la ficha → reseñas Loox | Todas las compradoras salvo pedido reembolsado o cancelado (interés legítimo de cliente) |

Si una clienta compra o avanza de paso, sale del flujo automáticamente (los filtros se revisan antes de cada email).
**Consentimiento:** carrito, pago y navegación solo a suscriptoras (RGPD); la reseña a compradoras.

**Ojo con duplicados:**
- Shopify **Messaging** (Marketing → Automatizaciones): desactivar sus carritos/pagos abandonados y bienvenidas, o la clienta
  recibirá dos emails.
- **Loox** también pide reseñas por email: desactivar uno de los dos (Loox → Review requests) para no pedirlo dos veces.

El «email cada 7 días» no puede ser un flujo (un flujo repite siempre el mismo contenido): es una **campaña semanal**.

## Email semanal de novedad
- **Cuándo:** jueves se prepara en borrador; viernes se revisa y se programa (≈ 19:00 hora de Canarias).
- **Contenido:** el producto del test de la semana con las fotos de sus creativos, precio, colores y tallas. Sin descuentos,
  sin urgencias falsas, sin «lana» ni materiales sin confirmar.
- **Frecuencia:** 1 por semana como máximo (24 suscriptoras; más a menudo provoca bajas).

| Fecha | Campaña | Asunto | Estado |
|---|---|---|---|
| 05/11/2026 19:00 (Canarias) | Novedad semanal · Abrigo Irene (plantilla `UriJuV`) | El abrigo que no pasa de moda | **Programada** (aprobada por la dueña) |

Vista previa en móvil: `docs/creativos/abrigo-irene/email-novedad-preview.png`.

## Pendiente
- Lista de Klaviyo: 24 personas; Shopify: 54 clientes. Comprobar en Klaviyo → Integraciones → Shopify que está activada
  la sincronización de suscriptores con la lista «Oelnor | Suscriptores email» (si no, el popup no las añade y la bienvenida no salta).
- Dirección postal de la empresa en Klaviyo (aparece en el pie de los emails; ver Ajustes → Cuenta).

## Entregabilidad (05/11/2026)
- Dominio de envío Klaviyo `send.oelnorstore.com` y DKIM (`mtd1`/`mtd2._domainkey`): verificados. SPF correcto.
- **Problema:** había **dos registros DMARC** (`p=quarantine` y `p=none`): Gmail lo trata como DMARC inválido → spam.
- **Arreglado** en GoDaddy (DNS `domaincontrol.com`): un solo registro
  `_dmarc` TXT = `v=DMARC1; p=none; rua=mailto:dmarc_rua@onsecureserver.net;` (comprobado en Google y Cloudflare DNS).
- Pasar a `p=quarantine` cuando lleve unas semanas sin problemas.

## Novedad semanal · Blazer Inés (11/11/2026)
- Campaña `01M755WE1TVA1STPKTRV3KDXGK`, mensaje `01M755WE4T0QJ7E5CCG7Y6YQ19`, plantilla `T8nn3r`, lista «Oelnor | Suscriptores email».
- **Programada para el 11/11 a las 17:00 (Canarias = 17:00 UTC)**, a petición de la dueña (en vez de las 19:00).
- Asunto «De los vaqueros a la cena» · vista previa «El Blazer Inés, con mangas de encaje. Y con 2 productos, medias de regalo.»
- Fotos en el CDN de Shopify (`ines-mail-noche/dia/detalle.jpg`), bloque de la oferta «Compra 2 productos y llévate unas medias térmicas de regalo · hasta el 30 nov».

## Novedad semanal · Chaqueta Sara (18/11/2026)
- Campaña `01M7PX9JTCXE428WGXDW7RDSCR`, mensaje `01M7PX9JX743V6QXQC8EK8S863`, plantilla `XP5FE6`, lista «Oelnor | Suscriptores email» (`Wev8G3`).
- **Programada para el 18/11 a las 12:00 (Canarias = 12:00 UTC)**, a petición de la dueña (primero 17:00, cambiada a las 12:00).
- Asunto «El cuello que hace de bufanda» · vista previa «Chaqueta Sara: abriga sin volumen. Y con 2 productos, medias de regalo.»
- Fotos subidas a la biblioteca de Klaviyo: `a5-bufanda-editorial-sin-texto` (cabecera), `sara-calle-negro`, `sara-detalle-cuello`.
  69,95 € · negro, camel y crudo · S a XL · bloque del regalo de medias hasta el 30 nov. Sin materiales sin confirmar.
- Vista previa en móvil: `docs/creativos/chaqueta-sara/email-novedad-preview.png`.

**Resultado (19/11 9:10):** 22 entregados, 5 aperturas (23 %), 0 clics, 0 bajas. Tendencia a la baja: Irene 54 % → Inés 35 % → Sara 23 % (envío a las 12:00).

## Novedad semanal · Vestido Marta (25/11/2026)
- Campaña `01M891VBB0T7CZ5WKRPN8MFCER`, mensaje `01M891VBCBKRBJ8RPH775KA3FV`, plantilla `VCY4mw`, lista «Oelnor | Suscriptores email» (`Wev8G3`).
- **Programada para el 25/11 a las 19:00 (Canarias = 19:00 UTC)**, aprobada por la dueña.
- Asunto «Sastrería arriba, brillo abajo» · vista previa «Vestido Marta: el de las cenas de diciembre. Y con 2 productos, medias de regalo.»
- Fotos de los creativos (m1 noche de cabecera, m2 estudio, m3 detalle). 64,95 € · negro · XS a 3XL · «pide antes del 7 de diciembre
  para recibirlo antes de Navidad» · bloque del regalo de medias hasta el 30 nov. Sin materiales sin confirmar.
- Vista previa en móvil: `docs/creativos/vestido-marta/email-novedad-preview.png`.
- **Resultado (26/11):** 23 enviados · 23 entregados · 6 aperturas únicas (**26 %**) · 0 clics · 0 pedidos · 1 baja.
  Lectura: la apertura está bien (asunto ok), pero nadie pinchó → el cuerpo/botón no empujó al clic. Lista muy pequeña (23):
  una sola persona mueve 4 puntos, así que no sacar conclusiones fuertes.

## Flujos · revisión del 26/11/2026 (últimos 30 días)
| Flujo | Estado | Envíos | Apertura | Clics | Pedidos |
|---|---|---|---|---|---|
| 1 · Bienvenida con 10 % (3 emails) | activo | 1 persona × 3 emails | 100 % | 0 | 0 |
| 2 · Navegación abandonada | activo | **0** | — | — | — |
| 3 · Carrito abandonado | activo | **0** | — | — | — |
| 4 · Pago abandonado (1 h y 24 h) | activo | **0** | — | — | — |
| 5 · Petición de reseña | activo | 3 | 33 % | 1 (33 %) | 0 |
| Antiguos (sept./oct., 5 flujos) | borrador | — | — | — | — |

**Por qué 2, 3 y 4 no envían:**
- Los tres solo envían a perfiles **suscritos al marketing por email** (filtro de consentimiento). Quien empieza el pago sin marcar
  «quiero recibir novedades» no entra. Hubo 14 «Checkout Started» en Klaviyo desde el 27/10 y ninguno estaba suscrito.
  Es lo correcto según la LSSI/RGPD → la palanca es **conseguir más suscripciones** (popup, casilla en el checkout), no quitar el filtro.
- El flujo 2 además escucha la métrica «Viewed Product» **de Shopify (`QTeuj7`), que no registra nada** (0 eventos en 30 días);
  la que sí registra es la «Viewed Product» de Klaviyo (`VDv6dV`). **Arreglado el 26/11:** nuevo flujo «OELNOR 2026 | 2 · Navegación abandonada (v2)» (`TZGUSq`, activo) con el disparador
  `VDv6dV` y el mismo email (plantilla copiada `Vb7KLg`); el antiguo `QQPtpQ` pasa a borrador.
- **Popup en las fichas (26/11):** la dueña quiere que salga también en las fichas. En el tema publicado está en modo «solo pestaña»
  (`product_teaser: true`). Ajuste: Personalizar tema → pie de página → «O3 · Popup oferta» → desmarcar «En fichas de producto,
  solo una pestaña discreta» (y dejar marcado «solo al hacer scroll»): sale al bajar el 35 % de la ficha o al ir a cerrar la pestaña.

**Cómo leer un flujo:** se mira **por email** (no solo el total): destinatarios (si es 0, el flujo no se dispara → revisar
disparador y filtros), apertura (> 40 % en flujos), clics (> 3 %), pedidos y € por destinatario. Un flujo con 0 envíos no es
«malo»: está roto o filtrado.
