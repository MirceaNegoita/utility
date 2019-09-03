// Importam librariile instalate de npm
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import fileUploader from 'express-fileupload';
import cors from 'cors';
import 'dotenv/config';

// Importam baza de date si rutele
import Database from './config/database';
import Routes from './routes/index';

// Instatam aplicatia utilizan frameworkul express
const app = express();
const appPort = process.env.PORT || 3001;
const appName = process.env.NAME || "Diff App";

// Aplicam toate middleware-ul 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(fileUploader());

// Ne conectam la baza de date
Database.prototype.connect();
// Setam rutele API-ului
Routes.prototype.setRoutes(app);

// Pornim aplicatie pe portul din .env
app.listen(appPort, () => {
    console.log(`${appName} started on port ${appPort}`);
});