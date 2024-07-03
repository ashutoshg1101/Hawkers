const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.port;
const hawkerRoute = require('./routes/hawkerRoutes');
const itemsRoute = require('./routes/itemsRoute');

const connectToMonogoDB = require('./connection');

connectToMonogoDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/hawker",hawkerRoute);
app.use("/items",itemsRoute);

app.listen(port,() => console.log(`server listening on port ${port}`));