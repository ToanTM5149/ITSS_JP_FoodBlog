const express = require('express');
const BlogController = require('../controllers/Blog.controller');
const router = express.Router();
router.get('/public-posts', BlogController.getPublicPosts);
router.get('/recent-posts', BlogController.getRecentPosts);
// POST tạo bài viết mới
router.post('/create-post', BlogController.createPost);
// POST lưu lượt like cho bài viết
router.post('/like-post', BlogController.likePost); // Thêm route cho like bài viết
//GET trả về số lượt like của bài viết
router.get('/count-likes/:blogId', BlogController.countLikes); // Route cho đếm lượt like

module.exports = router;