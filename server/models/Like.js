// models/Like.js
const mongoose = require('mongoose');
const User = require('./User');
const Blog = require('./Blog');

const likeSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  },
  {
    timestamps: { createdAt: 'created_at' },  
  }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
