const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  createUser = async (user) => {
    try {
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateUser = async (userId, updateData) => {
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,   // Trả về tài liệu đã được cập nhật
        runValidators: true, // Chạy các validator của schema
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getAllUser = async () => {
    try {
      return await User.find().select('-__v ');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteUserById = async (user_id) => {
    try {
      return await User.findByIdAndDelete(user_id);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  loginUser = async (email, password) => {
    try {
      // Kiểm tra xem email có tồn tại trong hệ thống không
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Email hoặc mật khẩu không chính xác');
      }
      if (password !== user.password) {
        throw new Error('Email hoặc mật khẩu không chính xác');
      }

      // Tạo JWT token nếu mật khẩu đúng
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return {
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar, 
        },
      };
    } catch (error) {
      throw error; 
    }
  };
  
}

module.exports = new UserService();
