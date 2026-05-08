# SAP B1 Queries - HANA

Plantillas para SAP Business One sobre SAP HANA. Ajusta campos, moneda, almacenes y reglas de negocio antes de usarlas en producción.

## DASHBOARD_KPIS

```sql
WITH dates AS (
    SELECT
        CURRENT_DATE AS today,
        TO_DATE(YEAR(CURRENT_DATE) || '-' || MONTH(CURRENT_DATE) || '-01') AS month_start,
        TO_DATE(YEAR(CURRENT_DATE) || '-01-01') AS year_start,
        ADD_MONTHS(TO_DATE(YEAR(CURRENT_DATE) || '-' || MONTH(CURRENT_DATE) || '-01'), -1) AS previous_month_start,
        ADD_DAYS(TO_DATE(YEAR(CURRENT_DATE) || '-' || MONTH(CURRENT_DATE) || '-01'), -1) AS previous_month_end
    FROM DUMMY
),
sales_month AS (
    SELECT COALESCE(SUM("DocTotal" - "VatSum"), 0) AS amount
    FROM "OINV", dates
    WHERE "CANCELED" = 'N'
      AND "DocDate" BETWEEN dates.month_start AND dates.today
),
credit_month AS (
    SELECT COALESCE(SUM("DocTotal" - "VatSum"), 0) AS amount
    FROM "ORIN", dates
    WHERE "CANCELED" = 'N'
      AND "DocDate" BETWEEN dates.month_start AND dates.today
),
sales_previous_month AS (
    SELECT COALESCE(SUM("DocTotal" - "VatSum"), 0) AS amount
    FROM "OINV", dates
    WHERE "CANCELED" = 'N'
      AND "DocDate" BETWEEN dates.previous_month_start AND dates.previous_month_end
),
credit_previous_month AS (
    SELECT COALESCE(SUM("DocTotal" - "VatSum"), 0) AS amount
    FROM "ORIN", dates
    WHERE "CANCELED" = 'N'
      AND "DocDate" BETWEEN dates.previous_month_start AND dates.previous_month_end
),
sales_ytd AS (
    SELECT COALESCE(SUM("DocTotal" - "VatSum"), 0) AS amount
    FROM "OINV", dates
    WHERE "CANCELED" = 'N'
      AND "DocDate" BETWEEN dates.year_start AND dates.today
),
credit_ytd AS (
    SELECT COALESCE(SUM("DocTotal" - "VatSum"), 0) AS amount
    FROM "ORIN", dates
    WHERE "CANCELED" = 'N'
      AND "DocDate" BETWEEN dates.year_start AND dates.today
),
gross_margin AS (
    SELECT
        COALESCE(SUM(L."LineTotal"), 0) AS revenue,
        COALESCE(SUM(L."StockPrice" * L."Quantity"), 0) AS cost
    FROM "OINV" H
    INNER JOIN "INV1" L ON H."DocEntry" = L."DocEntry", dates
    WHERE H."CANCELED" = 'N'
      AND H."DocDate" BETWEEN dates.month_start AND dates.today
),
open_orders AS (
    SELECT COUNT(*) AS qty
    FROM "ORDR"
    WHERE "CANCELED" = 'N'
      AND "DocStatus" = 'O'
),
overdue_ar AS (
    SELECT COALESCE(SUM("DocTotal" - "PaidToDate"), 0) AS amount
    FROM "OINV", dates
    WHERE "CANCELED" = 'N'
      AND "DocStatus" = 'O'
      AND "DocDueDate" < dates.today
),
stock_available AS (
    SELECT COALESCE(SUM("OnHand" - "IsCommited"), 0) AS qty
    FROM "OITW"
),
items_below_minimum AS (
    SELECT COUNT(*) AS qty
    FROM "OITW"
    WHERE "MinStock" > 0
      AND "OnHand" < "MinStock"
),
top_products AS (
    SELECT COUNT(*) AS qty
    FROM (
        SELECT L."ItemCode"
        FROM "OINV" H
        INNER JOIN "INV1" L ON H."DocEntry" = L."DocEntry", dates
        WHERE H."CANCELED" = 'N'
          AND H."DocDate" BETWEEN dates.month_start AND dates.today
        GROUP BY L."ItemCode"
        ORDER BY SUM(L."LineTotal") DESC
        LIMIT 10
    ) T
)
SELECT 1 AS "id", 'Ventas del Mes' AS "title",
       (SM.amount - CM.amount) AS "value", 'CLP' AS "currency",
       CASE WHEN (SP.amount - CP.amount) = 0 THEN 0
            ELSE ROUND((((SM.amount - CM.amount) - (SP.amount - CP.amount)) / NULLIF((SP.amount - CP.amount), 0)) * 100, 1)
       END AS "change",
       'TrendingUp' AS "icon", 'blue' AS "color"
FROM sales_month SM, credit_month CM, sales_previous_month SP, credit_previous_month CP
UNION ALL
SELECT 2, 'Ventas Acumuladas Año', (SY.amount - CY.amount), 'CLP', 0, 'BarChart3', 'green'
FROM sales_ytd SY, credit_ytd CY
UNION ALL
SELECT 3, 'Margen Bruto Mensual',
       CASE WHEN revenue = 0 THEN 0 ELSE ROUND(((revenue - cost) / revenue) * 100, 1) END,
       NULL, 0, 'Percent', 'purple'
FROM gross_margin
UNION ALL
SELECT 4, 'Órdenes de Venta Abiertas', qty, NULL, 0, 'ShoppingCart', 'orange'
FROM open_orders
UNION ALL
SELECT 5, 'Cuentas por Cobrar Vencidas', amount, 'CLP', 0, 'CircleDollarSign', 'red'
FROM overdue_ar
UNION ALL
SELECT 6, 'Stock Disponible Total', qty, NULL, 0, 'Package', 'cyan'
FROM stock_available
UNION ALL
SELECT 7, 'Productos Bajo Mínimo', qty, NULL, 0, 'TriangleAlert', 'amber'
FROM items_below_minimum
UNION ALL
SELECT 8, 'Top Productos por Venta', qty, NULL, 0, 'Boxes', 'slate'
FROM top_products;
```

## DASHBOARD_PRODUCTOS_TOP

```sql
WITH dates AS (
    SELECT TO_DATE(YEAR(CURRENT_DATE) || '-' || MONTH(CURRENT_DATE) || '-01') AS month_start
    FROM DUMMY
)
SELECT
    L."ItemCode" AS "id",
    COALESCE(I."ItemName", L."Dscription") AS "nombre",
    SUM(L."LineTotal") AS "ventas",
    SUM(L."Quantity") AS "cantidad"
FROM "OINV" H
INNER JOIN "INV1" L ON H."DocEntry" = L."DocEntry"
LEFT JOIN "OITM" I ON L."ItemCode" = I."ItemCode", dates
WHERE H."CANCELED" = 'N'
  AND H."DocDate" BETWEEN dates.month_start AND CURRENT_DATE
GROUP BY L."ItemCode", COALESCE(I."ItemName", L."Dscription")
ORDER BY SUM(L."LineTotal") DESC
LIMIT 10;
```

## DASHBOARD_VENTAS_REGION

```sql
WITH dates AS (
    SELECT TO_DATE(YEAR(CURRENT_DATE) || '-' || MONTH(CURRENT_DATE) || '-01') AS month_start
    FROM DUMMY
)
SELECT
    COALESCE(C."City", 'Sin Región') AS "region",
    SUM(H."DocTotal" - H."VatSum") AS "ventas",
    0 AS "target"
FROM "OINV" H
INNER JOIN "OCRD" C ON H."CardCode" = C."CardCode", dates
WHERE H."CANCELED" = 'N'
  AND H."DocDate" BETWEEN dates.month_start AND CURRENT_DATE
GROUP BY COALESCE(C."City", 'Sin Región')
ORDER BY "ventas" DESC;
```

## DASHBOARD_TENDENCIAS

```sql
WITH dates AS (
    SELECT TO_DATE(YEAR(CURRENT_DATE) || '-01-01') AS year_start
    FROM DUMMY
)
SELECT
    TO_VARCHAR(H."DocDate", 'Mon') AS "mes",
    SUM(L."LineTotal") AS "ventas",
    0 AS "presupuesto",
    SUM(L."LineTotal" - (L."StockPrice" * L."Quantity")) AS "ganancia"
FROM "OINV" H
INNER JOIN "INV1" L ON H."DocEntry" = L."DocEntry", dates
WHERE H."CANCELED" = 'N'
  AND H."DocDate" BETWEEN dates.year_start AND CURRENT_DATE
GROUP BY MONTH(H."DocDate"), TO_VARCHAR(H."DocDate", 'Mon')
ORDER BY MONTH(H."DocDate");
```

## DASHBOARD_INVENTARIO

```sql
SELECT
    COALESCE(G."ItmsGrpNam", 'Sin Categoría') AS "categoria",
    SUM(W."OnHand" - W."IsCommited") AS "disponible",
    SUM(W."MinStock") AS "minimo",
    CASE
        WHEN SUM(W."OnHand") < SUM(W."MinStock") THEN 'Crítico'
        WHEN SUM(W."OnHand") < SUM(W."MinStock") * 1.25 THEN 'Bajo'
        ELSE 'Óptimo'
    END AS "estado",
    'Media' AS "rotacion"
FROM "OITW" W
INNER JOIN "OITM" I ON W."ItemCode" = I."ItemCode"
LEFT JOIN "OITB" G ON I."ItmsGrpCod" = G."ItmsGrpCod"
GROUP BY COALESCE(G."ItmsGrpNam", 'Sin Categoría')
ORDER BY "disponible" DESC;
```

## DASHBOARD_CLIENTES

```sql
WITH dates AS (
    SELECT TO_DATE(YEAR(CURRENT_DATE) || '-01-01') AS year_start
    FROM DUMMY
)
SELECT
    COALESCE(G."GroupName", 'Sin Grupo') AS "industria",
    COUNT(DISTINCT C."CardCode") AS "clientes",
    COALESCE(SUM(H."DocTotal" - H."VatSum"), 0) AS "ingresos"
FROM "OCRD" C
LEFT JOIN "OCRG" G ON C."GroupCode" = G."GroupCode"
LEFT JOIN "OINV" H ON C."CardCode" = H."CardCode"
    AND H."CANCELED" = 'N'
    AND H."DocDate" BETWEEN (SELECT year_start FROM dates) AND CURRENT_DATE
WHERE C."CardType" = 'C'
GROUP BY COALESCE(G."GroupName", 'Sin Grupo')
ORDER BY "ingresos" DESC;
```

## DASHBOARD_ORDENES

```sql
SELECT
    H."DocNum" AS "id",
    H."CardName" AS "cliente",
    COALESCE(MIN(L."Dscription"), 'Varios') AS "producto",
    H."DocTotal" AS "monto",
    CASE WHEN H."DocStatus" = 'O' THEN 'Abierta' ELSE 'Cerrada' END AS "estado",
    TO_VARCHAR(H."DocDate", 'YYYY-MM-DD') AS "fecha",
    CASE WHEN H."DocTotal" = 0 THEN 0 ELSE ROUND((H."PaidToDate" / H."DocTotal") * 100, 0) END AS "porcentaje"
FROM "ORDR" H
INNER JOIN "RDR1" L ON H."DocEntry" = L."DocEntry"
WHERE H."CANCELED" = 'N'
GROUP BY H."DocNum", H."CardName", H."DocTotal", H."DocStatus", H."DocDate", H."PaidToDate"
ORDER BY H."DocDate" DESC
LIMIT 10;
```

## DASHBOARD_DESEMPENO

```sql
SELECT
    4.7 AS "satisfaccionCliente",
    4.2 AS "tiempoEntrega",
    2.1 AS "tasaDevolucion",
    125000 AS "costoPorUnidad",
    87.5 AS "eficienciaOperacional"
FROM DUMMY;
```
