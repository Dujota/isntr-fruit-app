/* eslint-disable no-console */
require('dotenv').config();
require('./config/database');
const express = require('express');

// Models
const Fruit = require('./models/fruit');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : '3000';

app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.listen(PORT, () => {
  console.info(`App started on port: ${PORT}`);
});
