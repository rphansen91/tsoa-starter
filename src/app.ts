import express from 'express';
import bodyParser from 'body-parser';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from './generated/routes';
import swaggerUi from 'swagger-ui-express';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, async (_, res) => {
  return res.send(swaggerUi.generateHTML(await import('../dist/swagger.json')));
});

RegisterRoutes(app);

app.use((err: unknown, req, res, next) => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    console.log('Unknown error', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});
