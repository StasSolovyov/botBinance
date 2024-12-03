const logger = require('./config/logger');
const { setupErrorHandling } = require('./utils/errorHandler');
const { setupAiProcessor } = require('./services/aiService');

// Настройка обработки ошибок
setupErrorHandling();

// для анализа данных
setupAiProcessor();

logger.info('AI Analysis Microservice is up and running.');
