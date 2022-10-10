// express server
const express = require('express');
const path = require('path');
const PORT = 3001;
// const uuid = require('./helpers/uuid');
const fs = require('fs')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () => {
    console.log(`Server available at localhost${PORT}`);
  });