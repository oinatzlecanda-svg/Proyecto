# Rendimiento y animaciones de la tienda · 04/11/2026

Tema en vivo: «OELNOR 3.0 · Popup nuevo · 4 NOV». Los cambios de abajo están en la copia
**«OELNOR 3.0 · Animaciones suaves · 4 NOV»** (id 210270093649), pendiente de publicar por la dueña
(Shopify no permite editar el tema publicado desde la API).

## Medición (Lighthouse móvil, antes de los cambios)

| Página | Nota | LCP | Bloqueo (TBT) |
|---|---|---|---|
| Inicio | 45 | 4,8 s | 2.420 ms |
| Ficha de producto | 48 | 4,3 s | 1.620 ms |
| Colección | 37 | **25,5 s** (la foto del popup era el elemento más grande) | 1.380 ms |

La imagen principal pesa poco (91 KB) y carga en 0,3 s: **el 60 % del LCP es «render delay», el navegador está ocupado
ejecutando scripts de terceros**. Bloqueo por origen (inicio): Google Tag Manager / Google Ads 1,2 s · píxeles de Shopify
0,4 s · Facebook 0,3 s · Loox 0,16 s · ConversionBear (iconos de pago) · Klaviyo · Upcart (161 KB, 0,6 s de CPU).
397 peticiones y 3,6 MB en la página de inicio.

## Cambios en la copia del tema (`sections/o3-popup.liquid`, bloque de estilos que se carga en todas las páginas)
- Curvas de animación más suaves (`--o3-ease-in-out` de .77,0,.175,1 a .45,0,.2,1).
- Entradas sin inclinación ni giro 3D: títulos suben un 55 % con fundido (antes 105 % + skew 6°); tarjetas 3D sin rotación de 28°;
  balanceo 3D de ±7° a ±3°; zoom inicial de la foto de portada de 6 % a 3 %.
- Aparición al hacer scroll: 14 px en vez de 24 px, con fundido más largo.
- Efectos al pasar el ratón (segunda foto de las tarjetas, índice, foto de «sobre nosotros») con opacidad/transform
  (GPU) en vez de `clip-path`, que repinta en cada fotograma.
- Popup en el móvil sin foto: así no se convierte en el elemento más grande de la página (colección: LCP 25,5 s → 8,9 s).
- Se respeta «reducir movimiento» del sistema.

Medición en la vista previa (con la barra de vista previa de Shopify, que añade carga): inicio 40, colección 36 — dentro del
ruido. **La nota no sube de verdad hasta quitar scripts de terceros.**

## Recomendaciones (las decide la dueña, desde Shopify)
1. **Upcart**: el tema ya tiene su propio carrito lateral. Si no se usan sus upsells, desactivar su app embed
   (Personalizar → Integraciones de apps) o desinstalarla: −161 KB y −0,6 s de CPU en cada página.
2. **Google Ads (AW-18514096906)**: si no se hacen campañas de Google Ads, quitar la conversión de Google Ads en la app
   Google & YouTube. Es el script que más bloquea (≈1 s).
3. **Klaviyo**: si no hay flujos activos en Klaviyo (el popup es del tema), desactivar su app embed.
4. **ConversionBear (iconos de pago)**: comprobar que no muestra métodos que no se aceptan (bitcoin).
5. Quitar apps desinstaladas que dejan código y revisar los píxeles en Configuración → Eventos de clientes.
