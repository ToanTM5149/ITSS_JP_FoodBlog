// models/User.js
const mongoose = require('mongoose');
const enums = require('./Enum');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, maxlength: 100, unique: true },
    password: { type: String, required: true, maxlength: 20 },
    role: { type: String, enum: Object.values(enums.roles_t), default: enums.roles_t.GUEST},
    sex: { type: String, enum: Object.values(enums.sex_t), default: enums.sex_t.MALE},
    avatar: { type: String, maxlength: 255 },
    address: { type: String, maxlength: 255 },
    phone: { type: String, maxlength: 10 },
  },
  {
    timestamps: true,  // Tự động tạo created_at và updated_at
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
