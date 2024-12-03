const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const proxyRoutes = require('./proxyRoutes');


router.get('/', (req, res) => {
	res.send('API Gateway is up and running!');
});

// Подключение маршрутов прокси
router.use('/api/data', authenticateToken, proxyRoutes);

module.exports = router;