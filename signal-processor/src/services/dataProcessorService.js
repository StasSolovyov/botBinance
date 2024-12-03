const amqp = require('amqplib/callback_api');
const logger = require('../config/logger');
const { url, inputQueue, outputQueue } = require('../config/rabbitmqConfig');

function setupDataProcessor() {
	amqp.connect(url, (error0, connection) => {
		if (error0) {
			logger.error(`Error connecting to RabbitMQ: ${error0.message}`);
			return;
		}

		connection.createChannel((error1, channel) => {
			if (error1) {
				logger.error(`Error creating channel: ${error1.message}`);
				return;
			}

			channel.assertQueue(inputQueue, { durable: false });
			logger.info(`Waiting for messages in ${inputQueue}`);

			// Получение данных из входной очереди
			channel.consume(inputQueue, (message) => {
				if (message !== null) {
					const rawData = JSON.parse(message.content.toString());
					logger.info(`Received data: ${JSON.stringify(rawData)}`);

					// Обработка данных
					const processedData = processData(rawData);

					// Отправка обработанных данных в выходную очередь для ИИ
					channel.assertQueue(outputQueue, { durable: false });
					channel.sendToQueue(outputQueue, Buffer.from(JSON.stringify(processedData)));
					logger.info(`Sent processed data to ${outputQueue}`);

					// Подтверждение получения сообщения
					channel.ack(message);
				}
			});
		});
	});
}

// Обработки данных
function processData(data) {
	return {
		pair: data.s, // Торговая пара 
		price: parseFloat(data.c), // Текущая цена
		volume: parseFloat(data.v), // Объем торгов
		timestamp: new Date().toISOString(), // Текущая временная метка
	};
}

module.exports = { setupDataProcessor };
