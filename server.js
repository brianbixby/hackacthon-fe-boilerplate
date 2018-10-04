'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

// app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});