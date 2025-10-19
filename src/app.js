require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./models/index');

const port = process.env.PORT || 4000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

// Configuración de CORS mejorada
const corsOptions = {
    origin: function (origin, callback) {
        // Permitir requests sin origin (como mobile apps o Postman)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            frontendUrl,
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:4173'
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        version: '1.0.0',
        message: 'TimeTracker API - Running',
        timestamp: new Date().toISOString()
    });
});

// Health check para Railway
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

// Routes
app.use('/api/users', require('./routes/User'));
app.use('/api/entries', require('./routes/TimeEntry'));
app.use('/api/tasks', require('./routes/Task'));

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.originalUrl
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Error interno del servidor' 
            : err.message
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log('=================================');
    console.log('🚀 TimeTracker Backend Server');
    console.log('=================================');
    console.log(`📡 Server running on port: ${port}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Frontend URL: ${frontendUrl}`);
    console.log('=================================');
});