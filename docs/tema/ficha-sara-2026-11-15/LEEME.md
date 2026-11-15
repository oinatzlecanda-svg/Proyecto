# Tema «OELNOR 3.0 · Ficha Sara · 15 NOV» (copia de «Ficha limpia · 13 NOV»)

Archivos cambiados en la copia (se suben a Shopify desde aquí):
- `sections/o3-product.liquid`: la galería admite una foto principal y fotos extra guardadas en metacampos del producto
  (`oelnor.foto_principal`, `oelnor.fotos_extra`) y la descripción puede venir de `oelnor.descripcion_v2`; la guía de tallas
  del cajón, de `oelnor.guia_tallas_v2`. Si el producto no tiene esos metacampos, todo funciona como antes.
- `snippets/o3-gal-item.liquid`: una foto de la galería (nuevo).
- `snippets/o3-head.liquid`: la precarga de la foto principal usa `oelnor.foto_principal` si existe.
- `templates/product.json`: activa «Combínalo con» con complementos de la colección «Sugerencias del carrito».

El tema publicado no lee esos metacampos: mientras no se publique la copia, la web no cambia.
