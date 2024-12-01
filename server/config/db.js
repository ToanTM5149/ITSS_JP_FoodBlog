// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();
const logger = require('../ultis/logger'); 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error('MongoDB Connection Failed', err);
    process.exit(1);
  }
};

module.exports = connectDB;
