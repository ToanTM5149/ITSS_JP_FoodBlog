const userService = require('../services/user.service'); 

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const newUser = await userService.createUser({ username, email, password});
    
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
    try {
      const { userId } = req.params; 
      const { username, email, password, avatar, address, phone } = req.body;  
  
      // Tạo đối tượng update, chỉ cập nhật những trường có giá trị trong body
      const updateData = {};
  
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (avatar) updateData.avatar = avatar;
      if (address) updateData.address = address;
      if (phone) updateData.phone = phone;
  
      const updatedUser = await userService.updateUser(userId, updateData);
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const deletedUser = await userService.deleteUserById(user_id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  createUser,
  deleteUser
};
