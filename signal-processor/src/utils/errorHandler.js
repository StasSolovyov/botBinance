const logger = require('../config/logger');

function setupErrorHandling() {
	process.on('uncaughtException', (error) => {
		logger.error(`Uncaught Exception: ${error.message}`);
	});

	process.on('unhandledRejection', (reason, promise) => {
		logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
	});
}

module.exports = { setupErrorHandling };