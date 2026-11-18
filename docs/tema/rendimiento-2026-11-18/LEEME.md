# Tema «OELNOR 3.0 · Rendimiento · 18 NOV» (copia de «Ficha Sara · 15 NOV»)

Archivos cambiados en la copia:
- `assets/o3-product.css`: al principio, las ~3 KB de reglas de `o3-pages.css` que usa la ficha (migas, cajón de tallas,
  preguntas frecuentes, stock). Sacadas con un script que conserva solo los selectores cuyas clases existen en las fichas.
- `snippets/o3-head.liquid`: la ficha ya no carga `o3-pages.css` (16 KB que bloqueaban la carga y se usaban 2 KB).
- `sections/header-group.json`: quitada la segunda «barra de anuncios» (`announcement_bar_FzNC44`), que estaba vacía
  (su único anuncio, «OFERTA», desactivado) pero salía como una franja vacía bajo la cabecera y cargaba otra vez
  `component-slideshow.css` y `component-slider.css` en todas las páginas.

Comprobación: capturas de la ficha de Sara en móvil y ordenador, y con el cajón de la guía de tallas abierto, antes y
después: idénticas (solo cambia el segundero de la cuenta atrás).
