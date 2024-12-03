const express = require('express');
const cors = require('cors');
const limiter = require('./middleware/rateLimiter');
const logger = require('./config/logger');
const swaggerDocs = require('./docs/swagger');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(limiter);

app.use('/', routes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
	logger.info(`API Gateway is listening on port ${PORT}`);
	console.log(`API Gateway is listening on port ${PORT}`);
});

swaggerDocs(app, PORT);
