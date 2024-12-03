const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 минут
	max: 100, // Ограничение: 100 запросов с одного IP
	message: 'Слишком много запросов с этого IP, попробуйте позже.'
});

module.exports = limiter;
