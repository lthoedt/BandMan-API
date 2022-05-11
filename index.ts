require('dotenv').config();

const express = require("express");
const dbl = require("./database/dbl");
const route_main = require('./controllers/MainController');
const bodyParser = require('body-parser')

const app = express();

dbl.init();

app.use(bodyParser.json())
app.use( "/api/", route_main );

app.listen( process.env.PORT || 3001, () => {
    // tslint:disable-next-line:no-console
    console.log( `API is running!` );
});