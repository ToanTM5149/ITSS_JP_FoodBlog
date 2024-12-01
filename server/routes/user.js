const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser, updateUser } = require('../controllers/user.controller');

router.get('/get_all', getAllUsers);
router.post('/create', createUser);
router.put('/update/:userId', updateUser);
router.delete('/delete/:user_id', deleteUser);

module.exports = router;