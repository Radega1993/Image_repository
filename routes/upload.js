const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload());

let counter = 0;

const guardarDB = () => {
  let data = JSON.stringify(counter);

  fs.writeFile('db/data.json', data, (err) => {
    if (err) throw new Error('No se pudo grabar', err);
  });
};

const cargarDB = () => {

  try {

    counter = require('../db/data.json');

  } catch (e) {
    counter = 0;
  }

};

app.post('/upload', function(req, res) {

  cargarDB();

  if (!req.files) {
    return res.status(400)
      .json({
        ok: false,
        err: {
          message: 'No se ha seleccionado ningún archivo'
        }
      });
  }

  let archivo = req.files.archivo;

  // Extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
  let nombrecortado = archivo.name.split('.');
  let extension = nombrecortado[nombrecortado.length - 1];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'La extension permitida son: ' + extensionesValidas.join(', '),
        ext: extension
      }
    })
  }

  // cambiar nombre archivo
  let nombreArchivo = `${ counter }.png`;

  archivo.mv(`uploads/${ nombreArchivo }`, (err) => {

    if (err) {
      return res.status(500)
        .json({
          ok: false,
          err
        });
    }


    res.json({
      ok: true,
      img: nombreArchivo
    });
    counter++;
    guardarDB();
  })
});

module.exports = app;
