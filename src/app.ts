import express from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from './generated/routes';
import { RegisterDocs } from './docs';
import { handleError } from './errors';

// IMPORT ALL CONTROLLERS FOR SERVICE
import './health/controller';
import './user/controller';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterDocs(app);
RegisterRoutes(app);

app.use(handleError);
