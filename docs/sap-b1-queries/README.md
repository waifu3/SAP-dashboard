# Queries SAP B1 Para Dashboard

Estas plantillas sirven como punto de partida para crear consultas de reporting en SAP Business One.

## Archivos

- `sql-server.md`: consultas base para instalaciones SAP B1 sobre Microsoft SQL Server.
- `hana.md`: consultas base para instalaciones SAP B1 sobre SAP HANA.

## Uso Recomendado

1. Confirma si tu instalación usa SQL Server o HANA.
2. Revisa las reglas de negocio en `docs/sap-b1-kpi-catalog.md`.
3. Ajusta filtros de moneda, almacenes, sucursales y documentos cancelados.
4. Crea cada query en SAP B1 Service Layer `SQLQueries` o como vista/reporting query.
5. Configura `.env` con los paths:

```env
SAP_B1_KPIS_PATH=/SQLQueries('DASHBOARD_KPIS')/List
SAP_B1_VENTAS_REGION_PATH=/SQLQueries('DASHBOARD_VENTAS_REGION')/List
SAP_B1_PRODUCTOS_TOP_PATH=/SQLQueries('DASHBOARD_PRODUCTOS_TOP')/List
SAP_B1_TENDENCIAS_MENSUAL_PATH=/SQLQueries('DASHBOARD_TENDENCIAS')/List
SAP_B1_INVENTARIO_CATEGORIA_PATH=/SQLQueries('DASHBOARD_INVENTARIO')/List
SAP_B1_CLIENTES_INDUSTRIA_PATH=/SQLQueries('DASHBOARD_CLIENTES')/List
SAP_B1_ORDENES_RECIENTES_PATH=/SQLQueries('DASHBOARD_ORDENES')/List
SAP_B1_DESEMPENO_PATH=/SQLQueries('DASHBOARD_DESEMPENO')/List
```

## Contrato Esperado

El backend actual espera que cada endpoint devuelva JSON con las claves que usa el frontend:

- `kpis`: arreglo de tarjetas KPI.
- `ventasPorRegion`: arreglo `{ region, ventas, target }`.
- `productosTop`: arreglo `{ id, nombre, ventas, cantidad }`.
- `tendenciasMensual`: arreglo `{ mes, ventas, presupuesto, ganancia }`.
- `inventarioPorCategoria`: arreglo `{ categoria, disponible, minimo, estado, rotacion }`.
- `clientesPorIndustria`: arreglo `{ industria, clientes, ingresos }`.
- `ordenesRecientes`: arreglo `{ id, cliente, producto, monto, estado, fecha, porcentaje }`.
- `desempeño`: objeto `{ satisfaccionCliente, tiempoEntrega, tasaDevolucion, costoPorUnidad, eficienciaOperacional }`.

Si una query devuelve nombres distintos, se puede adaptar en `server/sapB1DashboardProvider.js`.
