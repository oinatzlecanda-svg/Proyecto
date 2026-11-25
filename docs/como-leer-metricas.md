# Cómo leer las métricas de una campaña · guía de OELNOR (25/11/2026)

Petición de la dueña (25/11): **cada vez que pida mirar una campaña, analizar todas las métricas una a una y explicarle cómo
leerlas**, para que aprenda a hacerlo ella sola. Esta guía es la chuleta.

## El orden en que se leen (el embudo)
Una campaña es un embudo: cada paso pierde gente. Se lee **de arriba abajo** y el primer paso que falla es el que hay que arreglar.

```
Impresiones → Clics en el enlace → Visitas a la ficha → Añadir al carrito → Iniciar pago → Compra
   (CPM)          (CTR, CPC)         (% que llega)        (% carrito)        (% pago)      (CPA, ROAS)
```

## Las métricas, una a una

| Métrica | Qué es | Cómo se calcula | Bien en OELNOR | Mal | Qué significa si va mal |
|---|---|---|---|---|---|
| **Gasto** | Lo que te ha cobrado Meta | — | — | — | Sirve para saber en qué corte estás (10/20/30/50 €) |
| **Impresiones** | Veces que se ha visto el anuncio | — | — | — | Sola no dice nada; sirve para calcular el resto |
| **Alcance** | Personas distintas que lo han visto | — | — | — | — |
| **Frecuencia** | Veces que lo ha visto cada persona | Impresiones ÷ alcance | 1–2 en un test | > 3 | La misma gente lo ve una y otra vez: el público se agota |
| **CPM** | Lo que cuesta que 1.000 personas vean el anuncio | Gasto ÷ impresiones × 1.000 | < 10 € | > 20 € | Es el «precio del mercado». Sube en Black Friday y Navidad y no depende de ti |
| **CTR (enlace)** | De cada 100 que lo ven, cuántos pinchan para ir a la web | Clics en el enlace ÷ impresiones × 100 | > 1,5 % (Irene 5,9 %) | < 1 % | **La foto/vídeo o el texto no enganchan.** Cambia el creativo, no el producto |
| **CPC (enlace)** | Lo que pagas por cada persona que pincha | Gasto ÷ clics en el enlace | < 0,50 € (Irene 0,18 €) | ≥ 1 € (corte) | Es CPM ÷ CTR: sube si el mercado está caro (CPM) o si el anuncio no engancha (CTR) |
| **% que llega a la ficha** | De los que pinchan, cuántos llegan a cargar la web | Visitas de Meta en Shopify ÷ clics | 35–60 % | < 30 % | La web carga lenta en el móvil o se pinchó sin querer |
| **% añadir al carrito** | De cada 100 visitas, cuántas añaden al carrito | Carritos ÷ visitas × 100 | > 5 % | < 2 % | **La ficha o el precio no convencen**: fotos, precio, tallas, plazo de envío, confianza |
| **% que inicia el pago** | De los carritos, cuántos van a pagar | Pagos iniciados ÷ carritos | > 40 % | < 25 % | Gastos o sorpresas al ver el carrito |
| **% que compra** | De los que inician el pago, cuántos pagan | Compras ÷ pagos iniciados | > 40 % | < 20 % | Algo del último paso: plazo, impuestos (Canarias), formas de pago |
| **Tasa de conversión** | De cada 100 visitas, cuántas compran | Compras ÷ visitas × 100 | > 1 % | < 0,5 % | Resume ficha + pago |
| **CPA (coste por compra)** | Lo que te cuesta en anuncios cada venta | Gasto ÷ compras | **≤ CPA máx.** del producto | > CPA máx. | Si pasa del CPA máx., cada venta te hace perder dinero |
| **ROAS** | Euros vendidos por cada euro de anuncios | Ventas ÷ gasto | **≥ ROAS de equilibrio** | por debajo | Igual que el CPA, pero visto desde las ventas |

### Dos números que hay que saber de memoria para cada producto
- **CPA máx.** = lo máximo que puedes pagar en anuncios por una venta sin perder dinero
  = 0,905 × PVP − coste del proveedor − 5,25 €. Está en el plan de cada test.
- **ROAS de equilibrio** = PVP ÷ CPA máx. Por encima ganas, por debajo pierdes.

| Producto | PVP | CPA máx. | ROAS de equilibrio |
|---|---|---|---|
| Vestido Marta | 64,95 € | 32,2 € | **2,0** (Meta cuenta ventas con IVA: por debajo de 2 se pierde) |
| Abrigo Irene (referencia que vendió) | 79,95 € | 47,6 € | 1,7 — llegó a ROAS 2,09 ✅ |

## Vídeos: dos métricas extra
| Métrica | Qué es | Bien |
|---|---|---|
| **Hook rate (gancho)** | % de impresiones que ven al menos 3 s (reproducciones de 3 s ÷ impresiones) | > 25 % |
| **Hold rate (retención)** | % de los que pasan los 3 s y llegan al final (ThruPlays ÷ reproducciones de 3 s) | > 10 % |
Si el gancho es bajo, falla el primer segundo del vídeo; si la retención es baja, el vídeo aburre en medio.

## Por anuncio, no solo por campaña
Mira qué anuncio se lleva el gasto: Meta reparte el dinero hacia el que mejor funciona. Si un anuncio tiene el CTR alto y el
CPC bajo, es el ganador; los que no gastan casi nada es que Meta ya los ha descartado (no hace falta pausarlos).

## Cómo decidir (las reglas de corte)
Antes de la 1.ª compra (desde el próximo test, a 50 €/día): 10 € (CPC ≥ 1 €) · 20 € (0 carritos) · 30 € (0 compras y < 10
carritos) · 50 € (0 compras). Tras la 1.ª compra: **regla de beneficio** (pausar si el gasto alcanza la contribución acumulada sin
pedido nuevo). Lo que **no** se hace: tocar anuncios o presupuesto antes de un corte.

## Plantilla de cada revisión (lo que Claude explica siempre)
1. **Dónde estamos:** gasto y qué corte toca.
2. **Cada métrica** del embudo con su valor, si está bien o mal **y por qué**, comparada con los tests anteriores.
3. **El paso del embudo que falla** y qué significa.
4. **Por anuncio:** cuál gana y por qué.
5. **Decisión** según la regla y **cómo habrías llegado tú** a esa decisión.
6. Una pregunta o ejercicio corto para practicar (opcional).
