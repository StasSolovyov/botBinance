const amqp = require('amqplib/callback_api');
const logger = require('../config/logger');

// Подключение к RabbitMQ и отправка данных в очередь
function sendToQueue(data) {
	amqp.connect('amqp://rabbitmq', (error0, connection) => { // Используем имя контейнера rabbitmq для подключения
		if (error0) {
			logger.error(`Error connecting to RabbitMQ: ${error0.message}`);
			return;
		}
		connection.createChannel((error1, channel) => {
			if (error1) {
				logger.error(`Error creating channel: ${error1.message}`);
				return;
			}
			const queue = 'market_data';
			const msg = JSON.stringify(data);

			channel.assertQueue(queue, {
				durable: false
			});
			channel.sendToQueue(queue, Buffer.from(msg));

			logger.info(`Sent data to queue: ${msg}`);
		});
	});
}

module.exports = { sendToQueue };
