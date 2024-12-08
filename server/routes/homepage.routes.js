const express = require('express');
const HomepageController = require('../controllers/homepage.controller');
const router = express.Router();
router.get('/public-posts', HomepageController.getPublicPosts);
router.get('/recent-posts', HomepageController.getRecentPosts);
// POST tạo bài viết mới
router.post('/create-post', HomepageController.createPost);

module.exports = router;