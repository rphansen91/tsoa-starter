import express, { Application } from 'express';
import swaggerUi, { JsonObject, SwaggerUiOptions } from 'swagger-ui-express';

export function RegisterDocs(app: Application) {
  app.use(express.static('public'));
  app.use('/docs', swaggerUi.serve, async (_, res) => {
    const doc = await loadSwagger();
    const html = generateHTML(doc);
    return res.send(html);
  });
}

function generateHTML(doc: JsonObject) {
  const opts: SwaggerUiOptions = {};
  opts.customSiteTitle = doc.info.title;
  if (doc.info['x-logo']) {
    opts.customCss = `.swagger-ui img { content: url(${doc.info['x-logo']}); }`;
  }
  if (doc.info['x-favicon']) {
    opts.customfavIcon = doc.info['x-favicon'];
  }
  return swaggerUi.generateHTML(doc, opts);
}

function loadSwagger() {
  return import('../dist/swagger.json');
}
