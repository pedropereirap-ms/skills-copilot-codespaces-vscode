// create web server
const express = require('express');
const app = express();

// parse incoming requests with JSON payloads
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// enable CORS
const cors = require('cors');
app.use(cors());

// connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

