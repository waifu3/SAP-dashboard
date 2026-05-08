import axios from 'axios';
import https from 'https';

const REQUIRED_CONFIG = [
  'SAP_B1_SERVICE_LAYER_URL',
  'SAP_B1_COMPANY_DB',
  'SAP_B1_USERNAME',
  'SAP_B1_PASSWORD',
];

let session = null;

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

export const getSapB1ConfigStatus = () => {
  const missing = REQUIRED_CONFIG.filter((key) => !process.env[key]);

  return {
    configured: missing.length === 0,
    missing,
    serviceLayerUrl: process.env.SAP_B1_SERVICE_LAYER_URL || null,
    companyDb: process.env.SAP_B1_COMPANY_DB || null,
  };
};

const getServiceLayerUrl = () => trimTrailingSlash(process.env.SAP_B1_SERVICE_LAYER_URL);

const getSessionCookie = (setCookieHeaders = []) => setCookieHeaders
  .map((cookie) => cookie.split(';')[0])
  .filter((cookie) => cookie.startsWith('B1SESSION=') || cookie.startsWith('ROUTEID='))
  .join('; ');

const getHttpsAgent = () => {
  if (process.env.SAP_B1_REJECT_UNAUTHORIZED === 'false') {
    return new https.Agent({ rejectUnauthorized: false });
  }

  return undefined;
};

const createSapAxios = (cookie) => axios.create({
  baseURL: getServiceLayerUrl(),
  timeout: Number(process.env.SAP_B1_TIMEOUT_MS || 30000),
  headers: {
    Cookie: cookie,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  httpsAgent: getHttpsAgent(),
});

export const loginToSapB1 = async () => {
  const status = getSapB1ConfigStatus();
  if (!status.configured) {
    throw new Error(`SAP B1 configuration is incomplete: ${status.missing.join(', ')}`);
  }

  if (session && session.expiresAt > Date.now()) {
    return session;
  }

  const response = await axios.post(`${getServiceLayerUrl()}/Login`, {
    CompanyDB: process.env.SAP_B1_COMPANY_DB,
    UserName: process.env.SAP_B1_USERNAME,
    Password: process.env.SAP_B1_PASSWORD,
  }, {
    timeout: Number(process.env.SAP_B1_TIMEOUT_MS || 30000),
    httpsAgent: getHttpsAgent(),
  });

  session = {
    cookie: getSessionCookie(response.headers['set-cookie']),
    sessionId: response.data?.SessionId || null,
    expiresAt: Date.now() + Number(process.env.SAP_B1_SESSION_TTL_MS || 1500000),
  };

  return session;
};

export const requestSapB1 = async (path, options = {}) => {
  const activeSession = await loginToSapB1();
  const sapAxios = createSapAxios(activeSession.cookie);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  try {
    const response = await sapAxios.request({
      url: normalizedPath,
      method: options.method || 'GET',
      data: options.data,
      params: options.params,
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      session = null;
    }

    throw error;
  }
};

export const pingSapB1 = async () => {
  const startedAt = Date.now();
  await requestSapB1(process.env.SAP_B1_PING_PATH || '/BusinessPartners?$top=1&$select=CardCode');

  return {
    ok: true,
    latencyMs: Date.now() - startedAt,
    checkedAt: new Date().toISOString(),
  };
};
