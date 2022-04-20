var bodyParser = require('body-parser');
const express = require("express");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./db.model");

db.sequelize.sync();

require('./all.router')(app);
require('./admin.router')(app);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

