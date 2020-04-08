const express = require('express');
const path = require('path');

const app = express()
const port = 3000


app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index.js'));


app.listen(port, () => console.log(`App listening on port ${port}!`));
