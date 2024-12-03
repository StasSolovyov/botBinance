const logger = require('./config/logger');
const { setupErrorHandling } = require('./utils/errorHandler');
const { setupDataProcessor } = require('./services/dataProcessorService');


setupErrorHandling();
setupDataProcessor();

logger.info('Data Processor Microservice is up and running.');
