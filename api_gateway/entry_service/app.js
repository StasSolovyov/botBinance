const express = require('express');
const cors = require('cors');
const limiter = require('../src/middleware/rateLimiter');
const logger = require('../src/config/logger');
const swaggerDocs = require('../src/docs/swagger');
const routes = require('../src/routes');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());
app.use(limiter);

app.use('/', routes);
const errorHandler = require('../src/middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
	logger.info(`API Gateway is listening on port ${PORT}`);
	console.log(`API Gateway is listening on port ${PORT}`);
});

swaggerDocs(app, PORT);
