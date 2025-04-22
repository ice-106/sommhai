import * as line from '@line/bot-sdk';
import { contract } from '@sommhai/api-contract';
import { createExpressEndpoints } from '@ts-rest/express';
import cors from 'cors';
import express from 'express';
import * as swaggerUi from 'swagger-ui-express';

import { sommhaiSwaggerHandler } from './common/libs/swagger';
import { exceptionHandler } from './common/middleware/exceptionHandler';
import { lineConfig, lineHandler } from './common/middleware/lineHandler';
import { PORT } from './env';
import { router } from './router';
const app = express();

app.use(cors({ origin: '*' }));
app.use('/webhook', line.middleware(lineConfig));
app.post('/webhook', lineHandler);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, sommhaiSwaggerHandler);

createExpressEndpoints(contract, router, app, {
  responseValidation: true,
});

app.use(exceptionHandler);

app.get('/', (req, res) => {
  res.send('SomMhai is up! 🚀');
});

app.listen(PORT, () => {
  console.log(`SomMhai app listening on port ${PORT}`);
});
