/* eslint-disable import/no-unresolved */
import cors from 'cors';
import dotenv from 'dotenv';
import esMain from 'es-main';
import express from 'express';
import jwt from 'express-jwt';

import { User as UserType } from '../../shared/types';
import db from './db-func/db.js'; // add .js for ts-node; https://github.com/microsoft/TypeScript/issues/41887#issuecomment-741902030
import {
  addNewUser,
  authUser,
  deleteUser,
  getUserDataById,
} from './db-func/user.js';

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

// verify login
app.post('/signin', async (req, res) => {
  try {
    const userWithToken = await authUser(req.body.email, req.body.password);
    return res.status(200).json({ user: userWithToken });
  } catch (e) {
    return res.status(401).json({ message: e });
  }
});

/* *********** user routes ********* */
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
  async (req, res) => {
    const requestedId = Number(req.params.id);

    // check that the token matches the id url param
    // (decoded token resides in req.user)
    if (req.auth?.id !== requestedId) return res.status(401);

    // get data for user
    const user = await getUserDataById(requestedId);
    return res.status(200).json({ user });
  },
);

app.post('/user', async (req, res) => {
  // create new user
  const user = addNewUser(req.body.email, req.body.password);
  return res.status(201).json(user);
});

app.delete('/user/:id', async (req, res) => {
  await deleteUser(Number(req.params.id));
  return res.status(204);
});

app.patch('/user/:id', async (req, res) => {
  // update user
});
/* *********** END: user routes ********* */

/* *********** appointment routes ********* */

/* *********** END: appointment routes ********* */

/* *********** treatment routes ********* */
app.get('/treatments', async (req, res) => {
  const treatments = await db.getTreatments();
  return res.status(200).json({ treatments });
});
/* *********** END: treatment routes ********* */

if (esMain(import.meta)) {
  // eslint-disable-next-line no-console
  app.listen(3030, () => console.log('Spa server listening on port 3030!'));
}

export default app;
