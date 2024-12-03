const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();

// Прокси для сервиса данных
router.use('/', createProxyMiddleware({
	target: 'http://localhost:4000', // адрес сервиса данных
	changeOrigin: true
}));

module.exports = router;