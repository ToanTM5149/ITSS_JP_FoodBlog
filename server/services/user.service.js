const User = require('../models/User'); 

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
}

module.exports = new UserService();
