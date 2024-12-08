// app.js
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./server/config/db');
const authToken = require('./server/middleware/verifyToken')
const userRoutes = require('./server/routes/user');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
const app = express();

app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('Hello, Food Blog App!'));

app.use('/api/user', userRoutes);

module.exports = app;
