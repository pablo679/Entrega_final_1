const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hermanosjota';

const connectDB = (uri = MONGODB_URI) => mongoose.connect(uri);

// Solo levantamos el servidor si se ejecuta directamente este archivo
if (require.main === module) {
    connectDB()
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
}

module.exports = { app, connectDB };
