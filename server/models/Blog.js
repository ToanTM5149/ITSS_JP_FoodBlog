// models/Blog.js
const mongoose = require('mongoose');
const User = require('./User');
const enums = require('./Enum');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    content: { type: String, required: true },
    image_url: { type: String, maxlength: 255 },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(enums.status_t), default: enums.status_t.DRAFT},
    recommend_food: { type: String, maxlength: 255 },
  },
  {
    timestamps: true,  // Tự động tạo created_at và updated_at
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
