import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'express-jwt';

import { User as SpaUser } from '../../shared/types';
import db from './db-func';

dotenv.config();

// typing for Express request with jwt
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: SpaUser;
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

// user profile protected by jwt
app.get(
  '/user/:id',
  jwt({
    secret: process.env.EXPRESS_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth',
  }),
  (req, res) => {
    // check that the token matches the id url param
    // decoded token resides in req.user
    if (req.auth.id !== Number(req.params.id)) return res.sendStatus(401);
    return res.sendStatus(200);
  },
);

// verify login
app.post('/login', (req, res) => {
  // authenticate user
});

// // read data from options file
// const sundaeOptionsRaw = fs.readFileSync("./sundae-options.json", "utf-8");
// const sundaeOptions = JSON.parse(sundaeOptionsRaw);

// app.get("/scoops", (req, res) => {
//   // return data from file
//   res.json(sundaeOptions.iceCreamFlavors);
// });

// app.get("/toppings", (req, res) => {
//   // return data from file
//   res.json(sundaeOptions.toppings);
// });

// app.post("/order", (req, res) => {
//   // create a random order number
//   const orderNumber = Math.floor(Math.random() * 10000000000);

//   res
//     // set status to 201 (created)
//     .status(201)

//     // return "order number" as the response
//     .json({ orderNumber });
// });

if (require.main === module) {
  // eslint-disable-next-line no-console
  app.listen(3030, () => console.log('Spa server listening on port 3030!'));
}

module.exports = app;
