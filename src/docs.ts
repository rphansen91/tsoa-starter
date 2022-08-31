import express, { Application } from 'express';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  LOGO: str({ default: '/logo.png' }),
});

export function RegisterDocs(app: Application) {
  app.use(express.static('public'));
  app.use('/docs', swaggerUi.serve, async (_, res) => {
    const doc = await loadSwagger();
    const html = generateHTML(doc);
    return res.send(html);
  });
}

function generateHTML(doc: JsonObject) {
  return swaggerUi.generateHTML(doc, {
    customSiteTitle: doc.info.title,
    customCss: `.swagger-ui img { content: url(${env.LOGO}); }`,
    customfavIcon: '/favicon.ico',
  });
}

function loadSwagger() {
  return import('../dist/swagger.json');
}
