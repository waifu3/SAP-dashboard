// src/services/sapService.js
// Servicio para conectar con SAP (Backend)

import axios from 'axios';

// Configuración base
const SAP_API_BASE_URL = process.env.REACT_APP_SAP_API_URL || 'http://localhost:3001/api';
const SAP_TIMEOUT = 30000; // 30 segundos

// Crear instancia axios
const sapAxios = axios.create({
  baseURL: SAP_API_BASE_URL,
  timeout: SAP_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar token
sapAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('sap_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
sapAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('SAP API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================
// ENDPOINTS PARA TRAER DATOS DE SAP
// ============================================

/**
 * Obtener datos de KPIs desde SAP
 */
export const getKPIData = async () => {
  try {
    const response = await sapAxios.get('/kpis');
    return response.data;
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    throw error;
  }
};

/**
 * Obtener ventas por región desde SAP
 */
export const getVentasPorRegion = async (periodo = 'mes') => {
  try {
    const response = await sapAxios.get('/ventas/por-region', {
      params: { periodo }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ventas por región:', error);
    throw error;
  }
};

/**
 * Obtener tendencia de ventas (últimos 12 meses)
 */
export const getTendenciaVentas = async () => {
  try {
    const response = await sapAxios.get('/ventas/tendencia-mensual');
    return response.data;
  } catch (error) {
    console.error('Error fetching tendencia de ventas:', error);
    throw error;
  }
};

/**
 * Obtener inventario por categoría
 */
export const getInventarioPorCategoria = async () => {
  try {
    const response = await sapAxios.get('/inventario/por-categoria');
    return response.data;
  } catch (error) {
    console.error('Error fetching inventario:', error);
    throw error;
  }
};

/**
 * Obtener top productos
 */
export const getTopProductos = async (limite = 10) => {
  try {
    const response = await sapAxios.get('/productos/top', {
      params: { limite }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top productos:', error);
    throw error;
  }
};

/**
 * Obtener clientes por industria
 */
export const getClientesPorIndustria = async () => {
  try {
    const response = await sapAxios.get('/clientes/por-industria');
    return response.data;
  } catch (error) {
    console.error('Error fetching clientes por industria:', error);
    throw error;
  }
};

/**
 * Obtener métricas de desempeño
 */
export const getMetricasDesempeño = async () => {
  try {
    const response = await sapAxios.get('/metricas/desempeño');
    return response.data;
  } catch (error) {
    console.error('Error fetching métricas de desempeño:', error);
    throw error;
  }
};

/**
 * Obtener datos completos del dashboard
 */
export const getDashboardCompleto = async () => {
  try {
    const response = await sapAxios.get('/dashboard/completo');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard completo:', error);
    throw error;
  }
};

/**
 * Conexión con WebSocket para datos en tiempo real
 */
export const subscribeToRealTimeData = (callback) => {
  const wsURL = process.env.REACT_APP_SAP_WS_URL || 'ws://localhost:3001/ws';
  const ws = new WebSocket(wsURL);

  ws.onopen = () => {
    console.log('Conectado a SAP en tiempo real');
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      callback(data);
    } catch (error) {
      console.error('Error parsing WebSocket data:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('Desconectado de SAP en tiempo real');
  };

  return ws;
};

/**
 * Sincronizar datos periódicamente
 */
export const startDataSync = (interval = 60000) => {
  // Sincronizar cada 60 segundos
  return setInterval(async () => {
    try {
      await getDashboardCompleto();
      console.log('Datos sincronizados desde SAP');
    } catch (error) {
      console.error('Error al sincronizar datos:', error);
    }
  }, interval);
};

export default sapAxios;
