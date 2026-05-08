# Catálogo KPI SAP B1

Este documento define la primera versión de KPIs y datasets que el dashboard debe consumir desde SAP Business One.

## KPIs Base

| ID | KPI | Descripción | Dataset | Formato esperado |
| --- | --- | --- | --- | --- |
| `ventas_mes` | Ventas del Mes | Total facturado en el mes actual, neto de notas de crédito si aplica. | `kpis` | `{ title, value, currency, change, icon, color }` |
| `ventas_ytd` | Ventas Acumuladas Año | Total facturado desde el inicio del año hasta hoy. | `kpis` | `{ title, value, currency, change, icon, color }` |
| `margen_bruto_mensual` | Margen Bruto Mensual | Porcentaje de margen bruto del mes. | `kpis` | `{ title, value, unit: "%", change, icon, color }` |
| `ordenes_venta_abiertas` | Órdenes de Venta Abiertas | Cantidad de pedidos de venta abiertos o parcialmente entregados. | `kpis` | `{ title, value, change, icon, color }` |
| `cxc_vencidas` | Cuentas por Cobrar Vencidas | Saldo vencido pendiente de pago. | `kpis` | `{ title, value, currency, change, icon, color }` |
| `stock_disponible_total` | Stock Disponible Total | Stock disponible agregado por artículos y almacenes relevantes. | `kpis` | `{ title, value, unit: "unidades", change, icon, color }` |
| `productos_bajo_minimo` | Productos Bajo Mínimo | Cantidad de artículos con stock bajo el mínimo definido. | `kpis` | `{ title, value, change, icon, color }` |
| `top_productos_venta` | Top Productos por Venta | Cantidad de productos destacados en el ranking. | `kpis` | `{ title, value, unit: "productos", change, icon, color }` |

## Datasets Para Paneles

| Dataset | Uso en dashboard | Variable de endpoint |
| --- | --- | --- |
| `kpis` | Tarjetas superiores | `SAP_B1_KPIS_PATH` |
| `ventasPorRegion` | Ventas por zona, sucursal o territorio | `SAP_B1_VENTAS_REGION_PATH` |
| `productosTop` | Ranking de productos por venta | `SAP_B1_PRODUCTOS_TOP_PATH` |
| `tendenciasMensual` | Ventas, presupuesto y margen por mes | `SAP_B1_TENDENCIAS_MENSUAL_PATH` |
| `inventarioPorCategoria` | Stock por grupo/categoría | `SAP_B1_INVENTARIO_CATEGORIA_PATH` |
| `clientesPorIndustria` | Ventas/clientes por grupo de cliente o industria | `SAP_B1_CLIENTES_INDUSTRIA_PATH` |
| `ordenesRecientes` | Pedidos o documentos recientes | `SAP_B1_ORDENES_RECIENTES_PATH` |
| `desempeño` | Indicadores operacionales adicionales | `SAP_B1_DESEMPENO_PATH` |

## Reglas De Negocio A Confirmar

- Si ventas deben considerar facturas, entregas, órdenes o una combinación.
- Si notas de crédito descuentan ventas y margen.
- Qué almacenes cuentan para stock disponible.
- Qué definición usa SAP B1 para stock mínimo en tu instalación.
- Moneda base: CLP, USD o moneda de documento convertida.
- Si margen usa costo promedio, último costo o costo del documento.
- Si cuentas por cobrar vencidas deben excluir documentos en disputa o clientes relacionados.
