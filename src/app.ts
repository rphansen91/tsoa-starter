import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './generated/routes';
import { handleError } from './errors';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, async (_, res) => {
  return res.send(swaggerUi.generateHTML(await import('../dist/swagger.json')));
});

RegisterRoutes(app);

app.use(handleError);
