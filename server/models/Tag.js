// models/Tag.js
const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
  },
  {
    timestamps: true,  // Thêm thời gian tạo và cập nhật tag
  }
);

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
