# Fotos de fondo blanco con sombra de suelo (30/10/2026)

Primera foto de cada color de los 5 últimos productos: Greta, Mila, Adela, Olivia y Lara (la de Lara está en
`../botines-lara/`). Se añade una sombra de contacto suave donde la prenda o el zapato apoya en el suelo y un grano
fotográfico ligero, para que parezca fotografiado sobre un suelo blanco y no flotando. La prenda no se modifica.

En Shopify se sustituyó cada archivo en su sitio, con el mismo ID: no cambian el orden, el texto alternativo
ni la foto asociada a cada color.

Script: `python3 sombra_suelo.py entrada.png salida.png` (necesita numpy, pillow y scipy).

## Resto del catálogo (30/10/2026)
Mismo tratamiento en las **147 fotos de fondo blanco** de los otros 49 productos (una por color). Quedan fuera Top Cristina
y Jeans Haku, que tienen fotos reales y no de fondo blanco. Se sustituyó cada archivo en su sitio (`fileUpdate`), así que
no cambian el orden, el texto alternativo ni la foto de cada color. Resumen visual: `resumen-resto-1/2/3.jpg`.

`sombra_suelo.py` es la versión mejorada: trata como suelo el reflejo claro que traían algunas imágenes bajo bolsos,
botas y objetos, para que no quede una franja blanca bajo el producto.
