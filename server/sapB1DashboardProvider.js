import mockData from '../src/data/mockData.js';
import { requestSapB1 } from './sapB1ServiceLayer.js';

const DATASET_PATHS = {
  kpis: 'SAP_B1_KPIS_PATH',
  ventasPorRegion: 'SAP_B1_VENTAS_REGION_PATH',
  productosTop: 'SAP_B1_PRODUCTOS_TOP_PATH',
  tendenciasMensual: 'SAP_B1_TENDENCIAS_MENSUAL_PATH',
  inventarioPorCategoria: 'SAP_B1_INVENTARIO_CATEGORIA_PATH',
  clientesPorIndustria: 'SAP_B1_CLIENTES_INDUSTRIA_PATH',
  ordenesRecientes: 'SAP_B1_ORDENES_RECIENTES_PATH',
  desempeño: 'SAP_B1_DESEMPENO_PATH',
};

const unwrapSapResponse = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  return response?.value
    || response?.Value
    || response?.results
    || response?.data
    || response;
};

const fetchDataset = async (datasetName, envKey) => {
  const path = process.env[envKey];

  if (!path) {
    return {
      datasetName,
      configured: false,
      data: mockData[datasetName],
    };
  }

  const response = await requestSapB1(path);

  return {
    datasetName,
    configured: true,
    data: unwrapSapResponse(response),
  };
};

export const getSapB1Dashboard = async () => {
  const datasets = await Promise.all(
    Object.entries(DATASET_PATHS).map(([datasetName, envKey]) => fetchDataset(datasetName, envKey))
  );

  const dashboard = {};
  const configuredDatasets = [];
  const missingDatasets = [];

  datasets.forEach(({ datasetName, configured, data }) => {
    dashboard[datasetName] = data;

    if (configured) {
      configuredDatasets.push(datasetName);
    } else {
      missingDatasets.push(datasetName);
    }
  });

  return {
    ...dashboard,
    _sap: {
      configuredDatasets,
      missingDatasets,
    },
  };
};
