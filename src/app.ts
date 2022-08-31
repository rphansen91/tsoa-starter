import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import { RegisterRoutes } from './generated/routes';
import { RegisterDocs } from './docs';
import { handleError } from './errors';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(responseTime());
app.use(morgan('tiny'));
// app.use(cors());

RegisterDocs(app);
RegisterRoutes(app);

app.use(handleError);
