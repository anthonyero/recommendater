const mongoose = require('mongoose');
require('dotenv').config(); // Added to allow access to our local environmental variable that contains MONGODB_URI.

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recommendaterDB');

module.exports = mongoose.connection;
