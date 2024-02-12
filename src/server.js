const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const server = require('http').Server( app );

mongoose.connect("mongodb+srv://kaua:283186@cluster0.9m3dc2c.mongodb.net/pokemon_?retryWrites=true&w=majority");


mongoose.connection
.once('open', () => console.log('Mongoose Connected!'))
.on('error', ( error ) => {
  console.log('Error: ', error );
});

app.use( cors());
app.use( express.json());
app.use( routes );

server.listen(3333);
