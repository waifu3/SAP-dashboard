// src/hooks/useSAPData.js
// Hook para manejar datos de SAP de forma fácil

import { useState, useEffect } from 'react';
import * as sapService from '../services/sapService';

/**
 * Hook para obtener datos de SAP
 * @param {function} fetchFunction - Función del servicio a ejecutar
 * @param {*} dependencies - Dependencias para re-ejecutar
 */
export const useSAPData = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err.message || 'Error al obtener datos');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

/**
 * Hook para obtener dashboard completo
 */
export const useDashboardData = () => {
  const { data, loading, error } = useSAPData(
    sapService.getDashboardCompleto
  );

  return { dashboardData: data, loading, error };
};

/**
 * Hook para obtener KPIs
 */
export const useKPIData = () => {
  const { data, loading, error } = useSAPData(
    sapService.getKPIData
  );

  return { kpis: data, loading, error };
};

/**
 * Hook para obtener ventas por región
 */
export const useVentasPorRegion = (periodo = 'mes') => {
  const { data, loading, error } = useSAPData(
    () => sapService.getVentasPorRegion(periodo),
    [periodo]
  );

  return { ventasPorRegion: data, loading, error };
};

/**
 * Hook para obtener tendencia de ventas
 */
export const useTendenciaVentas = () => {
  const { data, loading, error } = useSAPData(
    sapService.getTendenciaVentas
  );

  return { tendenciaVentas: data, loading, error };
};

/**
 * Hook para obtener inventario
 */
export const useInventario = () => {
  const { data, loading, error } = useSAPData(
    sapService.getInventarioPorCategoria
  );

  return { inventario: data, loading, error };
};

/**
 * Hook para obtener top productos
 */
export const useTopProductos = (limite = 10) => {
  const { data, loading, error } = useSAPData(
    () => sapService.getTopProductos(limite),
    [limite]
  );

  return { topProductos: data, loading, error };
};

/**
 * Hook para datos en tiempo real con WebSocket
 */
export const useRealTimeData = () => {
  const [realtimeData, setRealtimeData] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const ws = sapService.subscribeToRealTimeData((data) => {
      setRealtimeData(data);
      setWsConnected(true);
    });

    return () => {
      if (ws) {
        ws.close();
        setWsConnected(false);
      }
    };
  }, []);

  return { realtimeData, wsConnected };
};
