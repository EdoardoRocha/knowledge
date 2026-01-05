const express = require("express");
const app = express();
const consign = require("consign");
const db = require('./config/db.js');
const mongoose = require('mongoose');
require('./config/mongodb.js');
require('dotenv').config();

app.db = db;
app.mongoose = mongoose;

consign()
    .include('config/passport.js')
    .then('config/middlewares.js')
    .then('api/validation.js')
    .then('api')
    .then('schedule')
    .then('config/routes.js')
    .into(app)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Backend executando na porta " + port )
})