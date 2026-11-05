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
