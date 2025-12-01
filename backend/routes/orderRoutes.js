const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Todas las rutas acá requieren estar autenticado
router.use(authMiddleware);

// GET /api/pedidos - lista los pedidos del usuario autenticado
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos.' });
  }
});

// POST /api/pedidos - crea un pedido básico
router.post('/', async (req, res) => {
  try {
    const { items = [], total = 0 } = req.body;

    const newOrder = await Order.create({
      user: req.user.id,
      items: items.length ? items : [{ name: 'Pedido rápido', quantity: 1, price: 0 }],
      total,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear el pedido.' });
  }
});

module.exports = router;
