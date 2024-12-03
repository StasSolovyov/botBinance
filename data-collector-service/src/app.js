const logger = require('./config/logger');
const { setupWebSocket } = require('./services/exchangeService');
const { setupErrorHandling } = require('./utils/errorHandler');

setupWebSocket();
setupErrorHandling();