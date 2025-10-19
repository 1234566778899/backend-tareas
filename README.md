# TimeTracker Backend

Backend API para el sistema de control de tiempo laboral TimeTracker.

## Tecnologías

- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt

## Variables de Entorno

Crear archivo `.env` basado en `.env.example`:
```bash
MONGODB_URI=tu_connection_string_mongodb
PORT=4000
FRONTEND_URL=https://tu-frontend.vercel.app
NODE_ENV=production
```

## Instalación Local
```bash
npm install
npm run dev
```

## Despliegue en Railway

1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno en Railway
3. Railway detectará automáticamente Node.js y ejecutará `npm start`

## API Endpoints

### Users
- POST /api/users/register - Registrar usuario
- POST /api/users/login - Iniciar sesión

### Tasks
- POST /api/tasks/create - Crear tarea
- GET /api/tasks/user/:userId - Obtener tareas
- PUT /api/tasks/:id - Actualizar tarea
- DELETE /api/tasks/:id - Eliminar tarea

### Entries
- POST /api/entries/start - Iniciar timer
- POST /api/entries/pause - Pausar timer
- POST /api/entries/complete - Completar entrada
- POST /api/entries/resume/:id - Reanudar entrada
- GET /api/entries/active/:userId - Obtener entrada activa
- GET /api/entries/user/:userId/date/:fecha - Obtener por fecha
- GET /api/entries/user/:userId/range/:fechaInicio/:fechaFin - Obtener por rango
- DELETE /api/entries/:id - Eliminar entrada
```

---

## **📋 PASOS PARA DESPLEGAR EN RAILWAY:**

### **1. Preparar MongoDB Atlas (si no lo tienes)**

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster
4. Ve a "Database Access" → Crea un usuario con contraseña
5. Ve a "Network Access" → Añade `0.0.0.0/0` (permitir desde cualquier lugar)
6. Ve a "Database" → Click "Connect" → "Connect your application"
7. Copia la connection string: `mongodb+srv://usuario:password@...`

### **2. Crear proyecto en Railway**

1. Ve a [Railway.app](https://railway.app)
2. Sign up con GitHub
3. Click "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Conecta tu repositorio del backend

### **3. Configurar Variables de Entorno en Railway**

En el dashboard de Railway, ve a "Variables" y agrega:
```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/timetracker
PORT=4000
FRONTEND_URL=https://tu-frontend-url.vercel.app
NODE_ENV=production