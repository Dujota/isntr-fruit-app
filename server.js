/* eslint-disable object-shorthand */
/* eslint-disable no-console */
require('dotenv').config();
require('./config/database');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');

// Models
const Fruit = require('./models/fruit');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : '3000';

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

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

app.get('/fruits/:id', async (req, res) => {
  // grab the id from the params
  const fruitId = req.params.id;
  // use the id to find the record in the database
  const fruit = await Fruit.findById(fruitId);
  // render the show template
  res.render('fruits/show.ejs', { fruit: fruit });
});

app.delete('/fruits/:id', async (req, res) => {
  // grab the id from the params
  const fruitId = req.params.id;
  // use the id to find the record and delete in the database
  await Fruit.findByIdAndDelete(fruitId);

  // send them back to the list of all fruits
  res.redirect('/fruits');
});

// setup a route to show a form to edit a fruit
app.get('/fruits/:id/edit', async (req, res) => {
  // grab the id from the params
  const fruitId = req.params.id;

  // find the fruit in the database
  const fruit = await Fruit.findById(fruitId);
  // render the edit form and pass it the fruit we want to edit
  res.render('fruits/edit.ejs', { fruit: fruit });
});

// handle the submission of the form
app.put('/fruits/:id', async (req, res) => {
  // grab the id from the params
  const fruitId = req.params.id;

  if (req.body.isReadyToEat) {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  // use the id to find the record and delete in the database
  await Fruit.findByIdAndUpdate(fruitId, req.body);

  // send them back to the list of all fruits
  res.redirect(`/fruits/${fruitId}`);
});

app.listen(PORT, () => {
  console.info(`App started on port: ${PORT}`);
});
