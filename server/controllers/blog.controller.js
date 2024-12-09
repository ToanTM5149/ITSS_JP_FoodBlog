const blogService = require('../services/blog.service');

class BlogController {
    getPublicPosts = async (req, res) => {
        try {
          const posts = await blogService.getPublicPosts();
          res.status(200).json(posts);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };

      getRecentPosts = async (req, res) => {
        try {
          const posts = await blogService.getRecentPosts();
          res.status(200).json(posts);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    };
    createPost = async (req, res) => {
      try {
        const post = await blogService.createPost(req.body);
        res.status(201).json(post);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    likePost = async (req, res) => {
      try {
        const { userId, blogId } = req.body;
        if (!userId || !blogId) {
          return res.status(400).json({ message: 'userId and blogId are required' });
        }
        const like = await blogService.likePost(userId, blogId);
        res.status(201).json(like);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    countLikes = async (req, res) => {
      try {
        const { blogId } = req.params;
        if (!blogId) {
          return res.status(400).json({ message: 'blogId is required' });
        }
        const likeCount = await blogService.countLikes(blogId);
        res.status(200).json({ likeCount });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
}

module.exports = new BlogController();