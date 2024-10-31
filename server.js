/* eslint-disable object-shorthand */
/* eslint-disable no-console */
require('dotenv').config();
require('./config/database');
const express = require('express');

// Models
const Fruit = require('./models/fruit');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : '3000';

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', async (req, res) => {
  res.render('index.ejs');
});

// FRUIT ROUTES
app.get('/fruits', async (req, res) => {
  const fruits = await Fruit.find({});

  res.render('fruits/index.ejs', { fruits });
});

// setup a route to show a form to add a fruit
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs');
});
// handle the submission of the form
app.post('/fruits', async (req, res) => {
  // pull the info from teh req.body
  if (req.body.isReadyToEat) {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  // Model.create(body info)
  await Fruit.create(req.body);
  // send the user to some place (redirect to some other route)
  res.redirect('/fruits');
});
// setup a route to show a form to edit a fruit

// handle the submission of the form

app.listen(PORT, () => {
  console.info(`App started on port: ${PORT}`);
});
