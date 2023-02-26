require("dotenv").config();

const express = require("express");
const dbl = require("./database/dbl");
const route_main = require("./controllers/MainController");
const bodyParser = require("body-parser");

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express();

dbl.init();

app.use(bodyParser.json());
app.use("/api/", route_main);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(process.env.PORT || 3001, () => {
  // tslint:disable-next-line:no-console
  console.log(`API is running!`);
});