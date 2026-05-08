# SAP Dashboard

Dashboard React/Vite para visualizar KPIs, paneles y graficos orientados a SAP Business One.

## Arquitectura

```text
React Dashboard
  -> API Express local
  -> SAP B1 Service Layer / vistas SQL-HANA
  -> SAP Business One
```

El frontend no se conecta directo a SAP B1. La API intermedia permite proteger credenciales, cachear metricas pesadas y normalizar la informacion para los componentes del dashboard.

La primera definición funcional de KPIs está en `docs/sap-b1-kpi-catalog.md`.

## Scripts

```bash
npm run dev
npm run api
npm run build
npm run lint
```

Para desarrollo normal, usa dos terminales:

```bash
npm run api
npm run dev
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores.

```env
VITE_USE_MOCK_DATA=true
VITE_SAP_API_URL=http://localhost:3001/api

PORT=3001
SAP_B1_USE_MOCK=true
DASHBOARD_CACHE_TTL_MS=300000
```

Modo recomendado por etapa:

- Desarrollo sin SAP: `VITE_USE_MOCK_DATA=true` y `SAP_B1_USE_MOCK=true`.
- Probar API local: `VITE_USE_MOCK_DATA=false` y `SAP_B1_USE_MOCK=true`.
- Integracion SAP B1 real: `VITE_USE_MOCK_DATA=false` y `SAP_B1_USE_MOCK=false`.

## Endpoints disponibles

```text
GET /api/health
GET /api/sap/status
GET /api/sap/ping
GET /api/dashboard/completo
GET /api/kpis
GET /api/ventas/por-region
GET /api/ventas/tendencia-mensual
GET /api/inventario/por-categoria
GET /api/productos/top
GET /api/clientes/por-industria
GET /api/metricas/desempeno
```

## Siguiente paso SAP B1

La integracion real parte en `server/sapB1ServiceLayer.js` y `server/sapB1DashboardProvider.js`.

Configura estas variables para autenticar contra SAP B1 Service Layer:

```env
SAP_B1_USE_MOCK=false
SAP_B1_SERVICE_LAYER_URL=https://sap-server:50000/b1s/v1
SAP_B1_COMPANY_DB=SBODEMOCL
SAP_B1_USERNAME=usuario
SAP_B1_PASSWORD=clave
```

Despues apunta cada dataset del dashboard a un endpoint compatible:

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

Cada respuesta debe usar las mismas claves que consume el frontend. Si un path no esta configurado, el backend mantiene ese dataset con datos mock y reporta el faltante en `_sap.missingDatasets`.
