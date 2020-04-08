const express = require('express');

const app = express();

// =====================================
// get de la '/'
// =====================================
app.get('/', (req, res) => {
  res.send('index.html');
});

module.exports = app;
