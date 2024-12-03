const logger = require('../config/logger');

console.log('Logger:', logger); // Лог для отладки

function setupErrorHandling() {
	process.on('uncaughtException', (error) => {
		if (logger && typeof logger.error === 'function') {
			logger.error(`Uncaught Exception: ${error.message}`);
		} else {
			console.error('Метод logger.error не найден:', error.message);
		}
	});

	process.on('unhandledRejection', (reason, promise) => {
		if (logger && typeof logger.error === 'function') {
			logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
		} else {
			console.error('Метод logger.error не найден:', reason);
		}
	});
}

module.exports = { setupErrorHandling };
