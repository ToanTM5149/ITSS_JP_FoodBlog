// app.js
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./server/config/db');
const userRoutes = require('./server/routes/user');
const blogRoutes = require('./server/routes/blog'); // Import route cho homepage
require('dotenv').config(); // Đọc các biến môi trường từ file .env trước khi kết nối DB

const app = express();
app.use(cors())

connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('Hello, Food Blog App!'));

app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes); // Sử dụng route cho homepage
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
