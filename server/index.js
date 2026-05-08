import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { getConnectionStatus, getDashboardData } from './dashboardRepository.js';
import { pingSapB1 } from './sapB1ServiceLayer.js';

const app = express();
const port = Number(process.env.PORT || 3001);

const getPerformanceMetrics = (dashboard) => dashboard.desempeño || dashboard['desempeÃ±o'];

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'sap-dashboard-api',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/sap/status', (_req, res) => {
  res.json(getConnectionStatus());
});

app.get('/api/sap/ping', async (_req, res, next) => {
  try {
    res.json(await pingSapB1());
  } catch (error) {
    next(error);
  }
});

app.get('/api/dashboard/completo', async (req, res, next) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    res.json(await getDashboardData({ forceRefresh }));
  } catch (error) {
    next(error);
  }
});

app.get('/api/kpis', async (_req, res, next) => {
  try {
    const dashboard = await getDashboardData();
    res.json(dashboard.kpis);
  } catch (error) {
    next(error);
  }
});

app.get('/api/ventas/por-region', async (_req, res, next) => {
  try {
    const dashboard = await getDashboardData();
    res.json(dashboard.ventasPorRegion);
  } catch (error) {
    next(error);
  }
});

app.get('/api/ventas/tendencia-mensual', async (_req, res, next) => {
  try {
    const dashboard = await getDashboardData();
    res.json(dashboard.tendenciasMensual);
  } catch (error) {
    next(error);
  }
});

app.get('/api/inventario/por-categoria', async (_req, res, next) => {
  try {
    const dashboard = await getDashboardData();
    res.json(dashboard.inventarioPorCategoria);
  } catch (error) {
    next(error);
  }
});

app.get('/api/productos/top', async (req, res, next) => {
  try {
    const limit = Number(req.query.limite || 10);
    const dashboard = await getDashboardData();
    res.json(dashboard.productosTop.slice(0, limit));
  } catch (error) {
    next(error);
  }
});

app.get('/api/clientes/por-industria', async (_req, res, next) => {
  try {
    const dashboard = await getDashboardData();
    res.json(dashboard.clientesPorIndustria);
  } catch (error) {
    next(error);
  }
});

app.get('/api/metricas/desempeno', async (_req, res, next) => {
  try {
    const dashboard = await getDashboardData();
    res.json(getPerformanceMetrics(dashboard));
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res) => {
  console.error('API error:', error);
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'No fue posible obtener los datos del dashboard.',
  });
});

app.listen(port, () => {
  console.log(`SAP Dashboard API listening on http://localhost:${port}`);
});
