// models/Follow.js
const mongoose = require('mongoose');
const User = require('./User');

const followSchema = new mongoose.Schema(
  {
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followed_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,  // Thêm thời gian theo dõi
  }
);

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
