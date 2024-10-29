/* eslint-disable no-console */
const express = require('express');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : '3000';

app.get('/', async (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.info(`App started on port: ${PORT}`);
});
