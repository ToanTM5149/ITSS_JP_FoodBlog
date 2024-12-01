// models/BlogTag.js
const mongoose = require('mongoose');
const Blog = require('./Blog');
const Tag = require('./Tag');

const blogTagSchema = new mongoose.Schema(
  {
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true },
  },
  {
    timestamps: true,  // Thêm thời gian tạo và cập nhật mối quan hệ blog-tag
  }
);

const BlogTag = mongoose.model('BlogTag', blogTagSchema);

module.exports = BlogTag;
