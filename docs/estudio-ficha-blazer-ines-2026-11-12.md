# Estudio de la ficha · Blazer Inés · 12/11/2026

Revisada en móvil (iPhone, como llega el tráfico de Meta) tras el test del 11/11 (29,59 €, 0 pedidos).
Fotos de la ficha: `docs/creativos/blazer-ines/ficha-fotos-2026-11-12.jpg`.

## Datos
| | Blazer Inés (11/11) | Abrigo Irene (05–09/11) |
|---|---|---|
| Sesiones desde redes (móvil) | 33 (de 75 clics en Meta) | 230 |
| Carritos | 1 (3,0 %) | 9 (3,9 %) |
| Rebote | 64 % | 85 % |
| Duración media | 14 s | 27 s |
| Pedidos | 0 | 3 |

**Corrección a la lectura del cierre:** la tasa de carrito es parecida a la de Irene. Con 33 sesiones, lo esperable con la
ficha de Irene era ~1 carrito y ~0,4 pedidos: **la muestra era demasiado pequeña** para culpar a la ficha.
El problema principal fue el **coste por visita**: 0,90 € por sesión (29,59/33) frente a 0,55 € de Irene (127/230), por un CPM
alto (23–35 € vs ~10 €). Aun así, la ficha tiene fallos que conviene arreglar en todas las fichas.

## Fallos encontrados (por importancia)
1. **Opiniones importadas presentadas como «verificadas».** Loox muestra 4 opiniones (Julia «Top!!!!1», Sofia, Daniela, Natalia,
   todas del 11/10/2026) en un producto **sin ventas**, con el texto «4 opiniones verificadas». Es engañoso (ley de consumo
   y Ómnibus: hay que poder demostrar que son de compradoras) y va contra la regla de «nada de copy engañoso». Además,
   4 opiniones del mismo día y una «Top!!!!1» restan confianza. → Ocultar las importadas o quitar «verificadas».
2. **Demasiadas ofertas a la vez:** −16 %, «Ahorras 10 €», tachado, regalo de medias con contador y pestaña lateral
   «−10 % primera compra». Parece tienda de chollos, no de calidad, y confunde (¿se suman?). → Dejar una sola oferta principal.
3. **La pestaña «−10 % primera compra» tapa el texto** del lado izquierdo en móvil (descripción, opiniones). → Ocultarla en
   la ficha de producto en móvil o hacerla más pequeña.
4. **La primera foto no es la del anuncio.** El anuncio enseña a una modelo de noche; la ficha abre con un bodegón
   (foto 1). En el blanco solo hay bodegón y espalda: **ninguna foto puesta en blanco**, y en el anuncio sí salía de día.
   → Primera foto = la del anuncio que más clics trae; añadir 1–2 fotos del blanco puesto.
5. **Escote muy abierto sin nada debajo** en todas las fotos con modelo (3, 9). Para fiestas y oficina, muchas clientas
   querrán verlo con un top o body debajo. → Una foto con top/body debajo y la línea «Queda genial con un body o top debajo».
6. **Falta información que pesa en 50 €:** composición («cuerpo de tejido liso» no dice nada), si lleva forro, si el encaje
   da de sí, cómo se lava, y talla/altura de la modelo. → Pedir al proveedor y añadirlo.
7. **Plazo largo:** «Recíbelo entre el lun 23 nov y el mié 2 dic». Correcto, pero para una prenda de fiestas pesa.
   No se puede acortar; en los anuncios de fiestas, decir «llega a tiempo para las cenas de diciembre».
8. **El tema sigue diciendo «Compra 2 piezas»** (caja de promo y cesta); los creativos ya dicen «2 productos».
9. **Velocidad:** ~3,8 s en cargar con buena conexión; con 4G será más. 75 clics → 33 sesiones (en Irene también se perdían
   muchos). → Revisar apps y scripts que cargan en la ficha.

## Lo que está bien
Precio visible arriba con tachado válido, envío gratis y 30 días de devolución bien visibles, guía de tallas clara con
consejo de talla, barra fija de «Añadir» abajo, métodos de pago (Shop Pay, Apple Pay, Klarna) y descripción con «cómo combinarlo».

## Para el próximo test
Los puntos 1, 2, 3 y 8 son de toda la tienda: arreglarlos antes del miércoles 18/11. Los puntos 4, 5 y 6 se repasan
en la ficha del producto elegido.

## Arreglos hechos (13/11, la dueña: «arregla todo lo que puedas menos las reseñas»)
- **Tema nuevo «OELNOR 3.0 · Ficha limpia · 13 NOV»** (211157942609), copia del activo «botón arriba · 9 NOV», **sin publicar**
  hasta que la dueña diga sí:
  - Fuera la etiqueta «−16 %» de la foto y la píldora «Ahorras 10 €» (se quedan precio y tachado): una sola oferta, el regalo.
  - Pestaña lateral «−10 % primera compra» oculta en móvil en las fichas (el popup de bienvenida sigue).
  - «Compra 2 piezas» → «Compra 2 productos» en barra superior, caja del regalo, franja de la ficha y cesta.
  - Comprobado en vista previa móvil (Playwright): pestaña oculta, 0 «pieza», precio limpio.
- **Blazer Inés:** primera foto = modelo con el negro puesto (antes bodegón); consejo «con un body o top debajo» en «Cómo combinarlo».
- **Pendiente:** composición/forro/lavado y talla de la modelo (proveedor); fotos del blanco puesto (si se relanza);
  velocidad de carga; opiniones (decisión de la dueña: no tocarlas por ahora).
