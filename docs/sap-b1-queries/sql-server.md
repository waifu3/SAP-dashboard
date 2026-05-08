# SAP B1 Queries - SQL Server

Plantillas para SAP Business One sobre Microsoft SQL Server. Ajusta campos, moneda, almacenes y reglas de negocio antes de usarlas en producción.

## DASHBOARD_KPIS

Devuelve las 8 tarjetas superiores del dashboard.

```sql
DECLARE @Today DATE = CAST(GETDATE() AS DATE);
DECLARE @MonthStart DATE = DATEFROMPARTS(YEAR(@Today), MONTH(@Today), 1);
DECLARE @YearStart DATE = DATEFROMPARTS(YEAR(@Today), 1, 1);
DECLARE @PreviousMonthStart DATE = DATEADD(MONTH, -1, @MonthStart);
DECLARE @PreviousMonthEnd DATE = DATEADD(DAY, -1, @MonthStart);

WITH SalesMonth AS (
    SELECT COALESCE(SUM(DocTotal - VatSum), 0) AS Amount
    FROM OINV
    WHERE CANCELED = 'N'
      AND DocDate >= @MonthStart
      AND DocDate <= @Today
),
CreditMonth AS (
    SELECT COALESCE(SUM(DocTotal - VatSum), 0) AS Amount
    FROM ORIN
    WHERE CANCELED = 'N'
      AND DocDate >= @MonthStart
      AND DocDate <= @Today
),
SalesPreviousMonth AS (
    SELECT COALESCE(SUM(DocTotal - VatSum), 0) AS Amount
    FROM OINV
    WHERE CANCELED = 'N'
      AND DocDate >= @PreviousMonthStart
      AND DocDate <= @PreviousMonthEnd
),
CreditPreviousMonth AS (
    SELECT COALESCE(SUM(DocTotal - VatSum), 0) AS Amount
    FROM ORIN
    WHERE CANCELED = 'N'
      AND DocDate >= @PreviousMonthStart
      AND DocDate <= @PreviousMonthEnd
),
SalesYtd AS (
    SELECT COALESCE(SUM(DocTotal - VatSum), 0) AS Amount
    FROM OINV
    WHERE CANCELED = 'N'
      AND DocDate >= @YearStart
      AND DocDate <= @Today
),
CreditYtd AS (
    SELECT COALESCE(SUM(DocTotal - VatSum), 0) AS Amount
    FROM ORIN
    WHERE CANCELED = 'N'
      AND DocDate >= @YearStart
      AND DocDate <= @Today
),
GrossMargin AS (
    SELECT
        COALESCE(SUM(L.LineTotal), 0) AS Revenue,
        COALESCE(SUM(L.StockPrice * L.Quantity), 0) AS Cost
    FROM OINV H
    INNER JOIN INV1 L ON H.DocEntry = L.DocEntry
    WHERE H.CANCELED = 'N'
      AND H.DocDate >= @MonthStart
      AND H.DocDate <= @Today
),
OpenOrders AS (
    SELECT COUNT(*) AS Qty
    FROM ORDR
    WHERE CANCELED = 'N'
      AND DocStatus = 'O'
),
OverdueAr AS (
    SELECT COALESCE(SUM(DocTotal - PaidToDate), 0) AS Amount
    FROM OINV
    WHERE CANCELED = 'N'
      AND DocStatus = 'O'
      AND DocDueDate < @Today
),
StockAvailable AS (
    SELECT COALESCE(SUM(OnHand - IsCommited), 0) AS Qty
    FROM OITW
),
ItemsBelowMinimum AS (
    SELECT COUNT(*) AS Qty
    FROM OITW
    WHERE MinStock > 0
      AND OnHand < MinStock
),
TopProducts AS (
    SELECT COUNT(*) AS Qty
    FROM (
        SELECT TOP 10 L.ItemCode
        FROM OINV H
        INNER JOIN INV1 L ON H.DocEntry = L.DocEntry
        WHERE H.CANCELED = 'N'
          AND H.DocDate >= @MonthStart
          AND H.DocDate <= @Today
        GROUP BY L.ItemCode
        ORDER BY SUM(L.LineTotal) DESC
    ) T
)
SELECT 1 AS id, 'Ventas del Mes' AS title,
       (SM.Amount - CM.Amount) AS value, 'CLP' AS currency,
       CASE WHEN (SP.Amount - CP.Amount) = 0 THEN 0
            ELSE ROUND((((SM.Amount - CM.Amount) - (SP.Amount - CP.Amount)) / NULLIF((SP.Amount - CP.Amount), 0)) * 100, 1)
       END AS change,
       'TrendingUp' AS icon, 'blue' AS color
FROM SalesMonth SM CROSS JOIN CreditMonth CM CROSS JOIN SalesPreviousMonth SP CROSS JOIN CreditPreviousMonth CP
UNION ALL
SELECT 2, 'Ventas Acumuladas Año', (SY.Amount - CY.Amount), 'CLP', 0, 'BarChart3', 'green'
FROM SalesYtd SY CROSS JOIN CreditYtd CY
UNION ALL
SELECT 3, 'Margen Bruto Mensual',
       CASE WHEN Revenue = 0 THEN 0 ELSE ROUND(((Revenue - Cost) / Revenue) * 100, 1) END,
       NULL, 0, 'Percent', 'purple'
FROM GrossMargin
UNION ALL
SELECT 4, 'Órdenes de Venta Abiertas', Qty, NULL, 0, 'ShoppingCart', 'orange'
FROM OpenOrders
UNION ALL
SELECT 5, 'Cuentas por Cobrar Vencidas', Amount, 'CLP', 0, 'CircleDollarSign', 'red'
FROM OverdueAr
UNION ALL
SELECT 6, 'Stock Disponible Total', Qty, NULL, 0, 'Package', 'cyan'
FROM StockAvailable
UNION ALL
SELECT 7, 'Productos Bajo Mínimo', Qty, NULL, 0, 'TriangleAlert', 'amber'
FROM ItemsBelowMinimum
UNION ALL
SELECT 8, 'Top Productos por Venta', Qty, NULL, 0, 'Boxes', 'slate'
FROM TopProducts;
```

## DASHBOARD_PRODUCTOS_TOP

```sql
DECLARE @MonthStart DATE = DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1);

SELECT TOP 10
    L.ItemCode AS id,
    COALESCE(I.ItemName, L.Dscription) AS nombre,
    SUM(L.LineTotal) AS ventas,
    SUM(L.Quantity) AS cantidad
FROM OINV H
INNER JOIN INV1 L ON H.DocEntry = L.DocEntry
LEFT JOIN OITM I ON L.ItemCode = I.ItemCode
WHERE H.CANCELED = 'N'
  AND H.DocDate >= @MonthStart
  AND H.DocDate <= CAST(GETDATE() AS DATE)
GROUP BY L.ItemCode, COALESCE(I.ItemName, L.Dscription)
ORDER BY SUM(L.LineTotal) DESC;
```

## DASHBOARD_VENTAS_REGION

Usa `OCRD.Territory`, `OCRD.GroupCode`, `OSLP.SlpName` o un UDF de sucursal según tu instalación.

```sql
DECLARE @MonthStart DATE = DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1);

SELECT
    COALESCE(C.City, 'Sin Región') AS region,
    SUM(H.DocTotal - H.VatSum) AS ventas,
    0 AS target
FROM OINV H
INNER JOIN OCRD C ON H.CardCode = C.CardCode
WHERE H.CANCELED = 'N'
  AND H.DocDate >= @MonthStart
  AND H.DocDate <= CAST(GETDATE() AS DATE)
GROUP BY COALESCE(C.City, 'Sin Región')
ORDER BY ventas DESC;
```

## DASHBOARD_TENDENCIAS

```sql
DECLARE @YearStart DATE = DATEFROMPARTS(YEAR(GETDATE()), 1, 1);

SELECT
    FORMAT(H.DocDate, 'MMM', 'es-CL') AS mes,
    SUM(L.LineTotal) AS ventas,
    0 AS presupuesto,
    SUM(L.LineTotal - (L.StockPrice * L.Quantity)) AS ganancia
FROM OINV H
INNER JOIN INV1 L ON H.DocEntry = L.DocEntry
WHERE H.CANCELED = 'N'
  AND H.DocDate >= @YearStart
  AND H.DocDate <= CAST(GETDATE() AS DATE)
GROUP BY MONTH(H.DocDate), FORMAT(H.DocDate, 'MMM', 'es-CL')
ORDER BY MONTH(H.DocDate);
```

## DASHBOARD_INVENTARIO

```sql
SELECT
    COALESCE(G.ItmsGrpNam, 'Sin Categoría') AS categoria,
    SUM(W.OnHand - W.IsCommited) AS disponible,
    SUM(W.MinStock) AS minimo,
    CASE
        WHEN SUM(W.OnHand) < SUM(W.MinStock) THEN 'Crítico'
        WHEN SUM(W.OnHand) < SUM(W.MinStock) * 1.25 THEN 'Bajo'
        ELSE 'Óptimo'
    END AS estado,
    'Media' AS rotacion
FROM OITW W
INNER JOIN OITM I ON W.ItemCode = I.ItemCode
LEFT JOIN OITB G ON I.ItmsGrpCod = G.ItmsGrpCod
GROUP BY COALESCE(G.ItmsGrpNam, 'Sin Categoría')
ORDER BY disponible DESC;
```

## DASHBOARD_CLIENTES

```sql
DECLARE @YearStart DATE = DATEFROMPARTS(YEAR(GETDATE()), 1, 1);

SELECT
    COALESCE(G.GroupName, 'Sin Grupo') AS industria,
    COUNT(DISTINCT C.CardCode) AS clientes,
    COALESCE(SUM(H.DocTotal - H.VatSum), 0) AS ingresos
FROM OCRD C
LEFT JOIN OCRG G ON C.GroupCode = G.GroupCode
LEFT JOIN OINV H ON C.CardCode = H.CardCode
    AND H.CANCELED = 'N'
    AND H.DocDate >= @YearStart
    AND H.DocDate <= CAST(GETDATE() AS DATE)
WHERE C.CardType = 'C'
GROUP BY COALESCE(G.GroupName, 'Sin Grupo')
ORDER BY ingresos DESC;
```

## DASHBOARD_ORDENES

```sql
SELECT TOP 10
    H.DocNum AS id,
    H.CardName AS cliente,
    COALESCE(MIN(L.Dscription), 'Varios') AS producto,
    H.DocTotal AS monto,
    CASE WHEN H.DocStatus = 'O' THEN 'Abierta' ELSE 'Cerrada' END AS estado,
    CONVERT(VARCHAR(10), H.DocDate, 23) AS fecha,
    CASE WHEN H.DocTotal = 0 THEN 0 ELSE ROUND((H.PaidToDate / H.DocTotal) * 100, 0) END AS porcentaje
FROM ORDR H
INNER JOIN RDR1 L ON H.DocEntry = L.DocEntry
WHERE H.CANCELED = 'N'
GROUP BY H.DocNum, H.CardName, H.DocTotal, H.DocStatus, H.DocDate, H.PaidToDate
ORDER BY H.DocDate DESC;
```

## DASHBOARD_DESEMPENO

```sql
SELECT
    4.7 AS satisfaccionCliente,
    4.2 AS tiempoEntrega,
    2.1 AS tasaDevolucion,
    125000 AS costoPorUnidad,
    87.5 AS eficienciaOperacional;
```
