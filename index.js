require('dotenv').config();
const cors = require('cors');

const express = require('express');
const router = require('./app/routers/routers');

const app = express();
app.use(express.json());

app.use( cors('*') );
   
app.use(express.urlencoded({extended: true})); 

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});