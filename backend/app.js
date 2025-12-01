const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// --- MIDDLEWARES ---
app.use(cors({ origin: CLIENT_URL }));

// Log de peticiones
app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`);
    next();
});

// Parseo de JSON
app.use(express.json());

// --- RUTAS ---
app.use('/api/productos', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', orderRoutes);
app.use('/api/orders', orderRoutes); // alias en inglés

// --- MANEJO DE ERRORES ---
app.use((req, res, next) => {
    res.status(404).json({ message: 'La ruta solicitada no existe.' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
});

module.exports = app;
