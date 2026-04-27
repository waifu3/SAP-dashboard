# 🔗 Guía de Integración SAP - Dashboard

## 📋 TABLA DE CONTENIDOS
1. Opciones de conexión
2. Arquitectura propuesta
3. Instalación del backend
4. Configuración SAP
5. Integración en React
6. Datos en tiempo real
7. Seguridad
8. Troubleshooting

---

## 1️⃣ OPCIONES DE CONEXIÓN CON SAP

### Opción A: OData API (Recomendado) ⭐
**Mejor para:** SAP ERP, SAP Analytics Cloud
**Ventajas:** REST, moderno, fácil integración
**Desventajas:** Requiere configuración OData

```
Frontend → Node.js Backend → SAP OData API
```

### Opción B: RFC Gateway (Avanzado)
**Mejor para:** Acceso profundo a SAP
**Ventajas:** Máxima compatibilidad
**Desventajas:** Complejo, requiere SAP RFC gateway

```
Frontend → Node.js + node-rfc → SAP Backend
```

### Opción C: Web Services SOAP
**Mejor para:** SAP Business One, integración legacy
**Ventajas:** Estable, bien documentado
**Desventajas:** XML, más lento

```
Frontend → Node.js + SOAP client → SAP Web Services
```

### Opción D: SQL directo a DB SAP (NO RECOMENDADO) ❌
- ⚠️ Vulnerabilidades de seguridad
- ⚠️ Queries complejas
- ⚠️ Mantenimiento difícil
- **Usa siempre un API intermediario**

---

## 2️⃣ ARQUITECTURA PROPUESTA

```
┌─────────────────────────────────────────┐
│         NAVEGADOR DEL USUARIO           │
│  (React Dashboard - http://localhost:5173)
└────────────┬────────────────────────────┘
             │ HTTP/HTTPS + JWT
             ↓
┌─────────────────────────────────────────┐
│    BACKEND NODE.JS (SEGURO)             │
│   (http://localhost:3001/api)           │
│                                         │
│  - Valida autenticación                 │
│  - Conecta con SAP                      │
│  - Cachea datos                         │
│  - Transforma respuestas                │
│  - WebSocket en tiempo real             │
└────────────┬────────────────────────────┘
             │ OData/SOAP/RFC (Seguro)
             ↓
┌─────────────────────────────────────────┐
│          SAP SYSTEM                     │
│    (ERP, Business One, etc)             │
│                                         │
│  - Datos reales en tiempo real          │
│  - Actualizaciones constantes           │
└─────────────────────────────────────────┘
```

**Ventajas:**
✅ Seguro (credenciales SAP en backend)
✅ Cacheable (reduce carga SAP)
✅ Transformable (adapta datos)
✅ Tiempo real (WebSocket)

---

## 3️⃣ INSTALACIÓN DEL BACKEND

### Crear proyecto backend

```bash
mkdir backend
cd backend
npm init -y
npm install express axios cors dotenv ws
npm install --save-dev nodemon
```

### Estructura

```
backend/
├── server.js
├── .env
├── .env.example
├── package.json
├── routes/
│   ├── kpis.js
│   ├── ventas.js
│   └── inventario.js
├── services/
│   ├── sapOData.js
│   └── sapRFC.js
└── logs/
```

### package.json scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 4️⃣ CONFIGURACIÓN SAP

### A. SAP OData

**1. Habilitar OData en SAP:**

```
SAP → SICF → Services
Activar servicios OData necesarios
```

**2. Permisos de usuario:**

```
SAP → PFCG
Usuario SAP debe tener permisos a servicios OData
```

**3. URL OData típica:**

```
https://sap-server:8080/sap/opu/odata/sap/C_SALESORDER_TP
```

### B. SAP Business One Web Services

**1. Habilitar Web Services:**

```
SAP B1 → Tools → Web Services
Crear servicios necesarios
```

**2. URL típica:**

```
http://sap-server:50000/b1s/v1
```

### C. RFC Gateway

**1. Requerimientos:**

```bash
npm install node-rfc
# Requiere SDK SAP (nwrfcsdk)
```

**2. Configuración:**

```javascript
const rfc = require('node-rfc');

const client = new rfc.Client({
  host: 'sap-server',
  port: 3300,
  user: 'usuario',
  passwd: 'contraseña',
  ashost: 'sapserver',
  sysnr: '00',
});
```

---

## 5️⃣ INTEGRACIÓN EN REACT

### Usando el Hook personalizado

```jsx
import { useSAPData } from '../hooks/useSAPData';
import * as sapService from '../services/sapService';

function Dashboard() {
  // Obtener datos de SAP
  const { kpis, loading, error } = useKPIData();

  if (loading) return <div>Cargando datos de SAP...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {kpis.map(kpi => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
```

### Obtener datos completos

```jsx
function Dashboard() {
  const { dashboardData, loading } = useDashboardData();

  if (!dashboardData) return <Loading />;

  const { kpis, ventasPorRegion, tendenciaVentas } = dashboardData;
  
  return (...);
}
```

---

## 6️⃣ DATOS EN TIEMPO REAL

### WebSocket

```jsx
function RealtimeMetrics() {
  const { realtimeData, wsConnected } = useRealTimeData();

  return (
    <div>
      {wsConnected && <span>🟢 En vivo</span>}
      <p>Órdenes pendientes: {realtimeData?.ordenesPendientes}</p>
      <p>Ventas hoy: ${realtimeData?.ventasHoy}</p>
    </div>
  );
}
```

### Sincronización periódica

```jsx
useEffect(() => {
  // Sincronizar cada 60 segundos
  const syncInterval = sapService.startDataSync(60000);
  
  return () => clearInterval(syncInterval);
}, []);
```

---

## 7️⃣ SEGURIDAD

### ✅ IMPLEMENTAR:

**Backend:**
```javascript
// JWT Authentication
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!jwt.verify(token, process.env.JWT_SECRET)) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};
```

**Variables de entorno:**
```bash
# NUNCA en git
SAP_USERNAME=usuario
SAP_PASSWORD=contraseña
JWT_SECRET=muy_secreto
```

**HTTPS:**
```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
};

https.createServer(options, app).listen(3001);
```

### ❌ EVITAR:

- ❌ Credenciales SAP en frontend
- ❌ Queries SQL directas
- ❌ Conectar SAP directamente desde React
- ❌ Almacenar tokens en localStorage
- ❌ Confiar en datos del cliente

---

## 8️⃣ TROUBLESHOOTING

### Error: "Cannot connect to SAP"

```bash
# 1. Verificar conectividad
ping sap-server

# 2. Verificar credenciales
curl -u usuario:password https://sap-server/api

# 3. Ver logs
node server.js --verbose
```

### Error: "OData service not found"

```
1. Verificar URL correcta en .env
2. Activar servicio en SAP (SICF)
3. Verificar permisos de usuario
4. Restart SAP services
```

### Datos lentos

```javascript
// Implementar caché
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

app.get('/api/kpis', (req, res) => {
  const cached = cache.get('kpis');
  if (cached) return res.json(cached);
  
  // Obtener de SAP si no está en caché
  ...
});
```

### WebSocket desconexión

```javascript
// Reconectar automáticamente
ws.onclose = () => {
  setTimeout(() => {
    ws = new WebSocket(wsURL);
  }, 3000);
};
```

---

## 🎯 CHECKLIST DE IMPLEMENTACIÓN

- [ ] Backend Node.js creado
- [ ] Variables `.env` configuradas
- [ ] SAP OData habilitado
- [ ] Credenciales SAP probadas
- [ ] Hooks personalizados integrados
- [ ] Dashboard conectado a datos reales
- [ ] WebSocket en tiempo real funcionando
- [ ] JWT authentication implementado
- [ ] HTTPS configurado
- [ ] Tests unitarios agregados
- [ ] Documentación API actualizada
- [ ] Monitoreo de errores (Sentry/LogRocket)

---

## 📚 RECURSOS

- [SAP OData Documentation](https://odata.org/)
- [SAP CAP (Cloud Application Programming)](https://cap.cloud.sap)
- [node-rfc](https://github.com/SAP/node-rfc)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [WebSocket MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

## ❓ PREGUNTAS FRECUENTES

**¿Puedo conectar directamente desde React?**
No, siempre usa un backend intermediario por seguridad.

**¿Qué es OData?**
Es un protocolo REST estándar para acceder a datos SAP.

**¿Puedo cachear datos?**
Sí, especialmente para reportes que no cambian constantemente.

**¿Cómo actualizo datos en tiempo real?**
Usa WebSocket o polling cada X segundos.

**¿Dónde coloco las credenciales SAP?**
En backend, en archivo `.env` (NUNCA en git).

---

**Versión:** 1.0 | **Última actualización:** Abril 2026
