import { contract } from '@sommhai/api-contract';
import { createExpressEndpoints } from '@ts-rest/express';
import cors from 'cors';
import express from 'express';
import * as swaggerUi from 'swagger-ui-express';

import { sommhaiSwaggerHandler } from './common/libs/swagger';
import { exceptionHandler } from './common/middleware/exceptionHandler';
import { router } from './router';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/docs', swaggerUi.serve, sommhaiSwaggerHandler);

createExpressEndpoints(contract, router, app, {
  responseValidation: true,
});

app.use(exceptionHandler);

app.get('/', (req, res) => {
  res.send('SomMhai is up! 🚀');
});

app.listen(port, () => {
  console.log(`SomMhai app listening on port ${port}`);
});
