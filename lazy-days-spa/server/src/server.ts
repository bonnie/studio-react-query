/* eslint-disable import/no-unresolved */
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import esMain from 'es-main';
import express from 'express';
import jwt from 'express-jwt';

import { User as UserType } from '../../shared/types';
import appointmentRoutes from './route-methods/appointment.js';
// add .js for ts-node; https://github.com/microsoft/TypeScript/issues/41887#issuecomment-741902030
import treatmentRoutes from './route-methods/treatment.js';
import userRoutes from './route-methods/user.js';

dotenv.config();
if (!process.env.EXPRESS_SECRET) {
  // eslint-disable-next-line no-console
  console.error('EXPRESS_SECRET must be defined in .env\nEXITING.');
}

// typing for Express request with jwt
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: UserType;
    }
  }
}

const app = express();

// CORS for react app, assuming port 3000
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// use middleware to serve static images
app.use(express.static('public'));

// middleware for parsing json body
app.use(json());

/* *********** routes ********* */

// verify login
app.post('/signin', userRoutes.auth);

// user profile protected by jwt
app.get(
  '/user/:id',
  jwt({
    // process.env.EXPRESS_SECRET is checked for truthiness on app startup
    // the || is to satisfy typescript
    secret: process.env.EXPRESS_SECRET || 'NOT SO SECRET',
    algorithms: ['HS256'],
    requestProperty: 'auth',
  }),
  userRoutes.get,
);

app.post('/user', userRoutes.create);
app.delete('/user/:id', userRoutes.remove);
app.patch('/user/:id', userRoutes.update);

app.get('/appointments', appointmentRoutes.get);
app.post('/appointment', appointmentRoutes.create);
app.delete('/appointment/:id', appointmentRoutes.remove);
app.patch('/appointment/:id', appointmentRoutes.update);

app.get('/treatments', treatmentRoutes.get);
/* *********** END: routes ********* */

if (esMain(import.meta)) {
  // eslint-disable-next-line no-console
  app.listen(3030, () => console.log('Spa server listening on port 3030!'));
}

export default app;
