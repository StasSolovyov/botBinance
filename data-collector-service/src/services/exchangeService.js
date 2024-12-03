const WebSocket = require('ws');
const logger = require('../config/logger');
const { sendToQueue } = require('./queueService');

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@ticker';

// настройки WebSocket и получения данных
function setupWebSocket() {
	const ws = new WebSocket(BINANCE_WS_URL);

	ws.on('open', () => {
		logger.info('Connected to Binance WebSocket');
	});

	ws.on('message', (data) => {
		const marketData = JSON.parse(data);
		logger.info(`Market Data: ${JSON.stringify(marketData)}`);
		sendToQueue(marketData);
	});

	ws.on('error', (error) => {
		logger.error(`WebSocket Error: ${error.message}`);
	});

	ws.on('close', () => {
		logger.warn('WebSocket connection closed. Reconnecting...');
		setTimeout(setupWebSocket, 5000);
	});
}

module.exports = { setupWebSocket };