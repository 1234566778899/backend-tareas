const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/timetracker';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB exitosamente');
        console.log('📍 Database:', mongoose.connection.name);
    })
    .catch((error) => {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    });

// Manejo de errores de conexión
mongoose.connection.on('error', (error) => {
    console.error('❌ Error de MongoDB:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB desconectado');
});

// Cerrar conexión cuando la app se cierre
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB desconectado por cierre de aplicación');
    process.exit(0);
});

module.exports = mongoose;