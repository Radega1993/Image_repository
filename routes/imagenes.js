const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const cargarDB = () => {

  try {

    counter = require('../db/data.json');

  } catch (e) {
    counter = 0;
  }

};

app.get('/imagen', (req, res) => {

  cargarDB();


  let pathImagen = path.resolve(__dirname, `../uploads/${counter}`);

  if (fs.existsSync(pathImagen)) {
    res.sendFile(pathImagen);
  }
})

module.exports = app;
