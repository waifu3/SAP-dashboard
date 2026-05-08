import mockData from '../src/data/mockData.js';
import { getSapB1Dashboard } from './sapB1DashboardProvider.js';
import { getSapB1ConfigStatus } from './sapB1ServiceLayer.js';

const DEFAULT_CACHE_TTL_MS = Number(process.env.DASHBOARD_CACHE_TTL_MS || 300000);

let dashboardCache = null;
let dashboardCacheExpiresAt = 0;

const withMeta = (data, source = 'mock') => ({
  ...data,
  _meta: {
    source,
    generatedAt: new Date().toISOString(),
    cacheTtlMs: DEFAULT_CACHE_TTL_MS,
  },
});

const getMockDashboard = () => withMeta(mockData, 'mock');

const getSapDashboard = async () => {
  const dashboard = await getSapB1Dashboard();
  return withMeta(dashboard, 'sap-b1-service-layer');
};

export const getDashboardData = async ({ forceRefresh = false } = {}) => {
  const useMock = process.env.SAP_B1_USE_MOCK !== 'false';
  const now = Date.now();

  if (!forceRefresh && dashboardCache && dashboardCacheExpiresAt > now) {
    return {
      ...dashboardCache,
      _meta: {
        ...dashboardCache._meta,
        cached: true,
      },
    };
  }

  const data = useMock ? getMockDashboard() : await getSapDashboard();
  dashboardCache = data;
  dashboardCacheExpiresAt = now + DEFAULT_CACHE_TTL_MS;

  return {
    ...data,
    _meta: {
      ...data._meta,
      cached: false,
    },
  };
};

export const getConnectionStatus = () => {
  const useMock = process.env.SAP_B1_USE_MOCK !== 'false';
  const configStatus = getSapB1ConfigStatus();

  return {
    status: useMock ? 'mock' : configStatus.configured ? 'configured' : 'missing-config',
    source: useMock ? 'Mock data' : 'SAP B1 Service Layer',
    config: configStatus,
    lastCheckedAt: new Date().toISOString(),
  };
};
