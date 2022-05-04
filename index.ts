import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const route_main = require('./controllers/MainService');

app.use( "/api/", route_main );

app.listen( process.env.PORT || 3001, () => {
    // tslint:disable-next-line:no-console
    console.log( `API is running!` );
} );