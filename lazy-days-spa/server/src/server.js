require("dotenv").config();
const express = require("express");
const cors = require("cors");
var jwt = require("express-jwt");
const mongoose = require("mongoose");

const app = express();

// CORS for react app, assuming port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// use middleware to serve static images
app.use(express.static("public"));

// user profile protected by jwt
app.get(
  "/user/:id",
  jwt({ secret: process.env.EXPRESS_SECRET }),
  function (req, res) {
    // check that the token matches the id url param
    if (req.user.id !== req.params.id) return res.sendStatus(401);
    res.sendStatus(200);
  }
);

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
  const user = process.env.MONGODB_USERNAME;
  const pass = process.env.MONGODB_PASSWORD;
  const address = process.env.MONGODB_ADDRESS;
  const dbName = process.env.MONGODB_DBNAME;
  const query = process.env.MONGODB_QUERYSTRING;

  // change to mongodb:// for local mongodb
  const prefix = "mongodb+srv://";

  const mongodbUri = `${prefix}${user}:${pass}@${address}/${dbName}?${query}`;

  mongoose.connect(process.env.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  // const MongoClient = require('mongodb').MongoClient;
  // const uri = "mongodb+srv://dbUser:<password>@cluster0.igkk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });

  app.listen(3030, () => console.log("Spa server listening on port 3030!"));
}

module.exports = app;
