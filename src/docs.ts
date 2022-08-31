import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

export function RegisterDocs(app: Application) {
  app.use(express.static('public'));
  app.use('/docs', swaggerUi.serve, async (_, res) => {
    const doc = await loadSwagger();
    return res.send(swaggerUi.generateHTML(doc));
  });
}

function loadSwagger() {
  return import('../dist/swagger.json');
}
