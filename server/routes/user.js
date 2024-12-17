const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser, updateUser, loginUser } = require('../controllers/user.controller');

router.get('/get-all', getAllUsers);

router.post('/create', createUser);
router.post('/login', loginUser);

router.put('/update/:userId', updateUser);
router.delete('/delete/:user_id', deleteUser);

module.exports = router;