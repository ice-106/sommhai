import { contract } from '@sommhai/api-contract';
import { generateOpenApi } from '@ts-rest/open-api';
import { RequestHandler } from 'express';
import * as swaggerUi from 'swagger-ui-express';

export const sommhaiSwaggerHandler: RequestHandler = (...args) => {
  return swaggerUi.setup(openApiDocument)(...args);
};

const openApiDocument = generateOpenApi(
  contract,
  {
    info: {
      title: 'SomMhai API',
      version: 'lastest',
    },
  },
  {
    setOperationId: true,
  },
);
