# Devoluciones · cómo se gestionan (desde el 25/11/2026)

La dueña delega en Claude la gestión de las devoluciones (25/11). Reparto:
- **Claude:** revisa cada mañana las solicitudes en Shopify, decide la propuesta, redacta los correos y aprueba o deniega la solicitud
  en Shopify (Admin API).
- **Dueña:** envía los correos desde su Gmail (Claude no tiene acceso) y hace los reembolsos en Shopify (la conexión bloquea los reembolsos).

## Dirección de devolución (almacén del agente en China)
```
Recipient: Ruby + win-winfulfillment
CHN SNG092711
Phone: 17758231352
Address Line 1: No. 160 Nijiayan Road
Address Line 2: Jiangbei District
City: Ningbo
State/Province: Zhejiang
Postal Code: 315000
Country: China
```
El destinatario tiene que ser exactamente «Ruby + win-winfulfillment» y llevar el código CHN SNG092711 para que el almacén identifique el paquete.

## Reglas
- Plazo: 30 días desde la recepción (desistimiento legal: 14 días). Prenda sin usar y con etiquetas.
- Cambio de opinión o talla: el envío de vuelta lo paga la clienta (política de la tienda). Defecto: lo asume OELNOR (pedir fotos).
- Primero se ofrece un **reembolso parcial quedándose la prenda** (abrigos 24 €, calzado 20 €) y, si no, devolución completa.
- Reembolso de la devolución completa: cuando llegue al almacén **o** cuando la clienta mande justificante de envío con seguimiento,
  lo que ocurra antes (ley española).
- El agente devuelve a OELNOR solo el precio del producto (no el servicio ni el envío).
- Sin respuesta de la clienta en ~6 días tras el recordatorio: aprobar en Shopify y mandar las instrucciones.

## Abiertas
| Pedido | Clienta | Producto | Estado |
|---|---|---|---|
| #10220 | Ana Karina | Abrigo Irene gris XL (79,95 €) | Sin respuesta a 2 correos (20/11 y 23/11). Aprobar el 26/11 y mandar instrucciones |
| #10170 | Carmen | Botines Lara negros 38 (69,95 €) | Recordatorio 24/11. Esperando respuesta |
