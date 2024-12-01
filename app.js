// app.js
const express = require('express');
const connectDB = require('./server/config/db');
const userRoutes = require('./server/routes/user');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('Hello, Food Blog App!'));

app.use('/api/user', userRoutes);

module.exports = app;
