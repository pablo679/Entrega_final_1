const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hermanosjota';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// --- MIDDLEWARES ---

app.use(cors({
    origin: CLIENT_URL,
}));

// 1. Middleware global para loguear peticiones
app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`);
    next(); // Es crucial llamar a next() para que la petición continúe
});

// 2. Middleware para parsear JSON (necesario para futuras peticiones POST/PUT)
app.use(express.json());

// --- RUTAS ---

// Usamos nuestras rutas de productos bajo el prefijo /api/productos
app.use('/api/productos', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', orderRoutes);
app.use('/api/orders', orderRoutes); // alias en inglés

// --- MANEJO DE ERRORES ---

// 3. Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'La ruta solicitada no existe.' });
});

// 4. Middleware centralizado para manejar otros errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Loguea el error en la consola del servidor
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
});


// Conectamos a MongoDB y luego levantamos el servidor
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Conectado a MongoDB');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err);
        process.exit(1);
    });
