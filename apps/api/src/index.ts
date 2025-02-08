import { contract } from '@sommhai/api-contract';
import { createExpressEndpoints } from '@ts-rest/express';
import express from 'express';

import { router } from './router';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

createExpressEndpoints(contract, router, app, {
  responseValidation: true,
});

app.get('/', (req, res) => {
  res.send('SomMhai is up! 🚀');
});
app.listen(port, () => {
  console.log(`SomMhai app listening on port ${port}`);
});
