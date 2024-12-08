const homepageService = require('../services/homepage.service');

class HomepageController {
    getPublicPosts = async (req, res) => {
        try {
          const posts = await homepageService.getPublicPosts();
          res.status(200).json(posts);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };

      getRecentPosts = async (req, res) => {
        try {
          const posts = await homepageService.getRecentPosts();
          res.status(200).json(posts);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    };
}

module.exports = new HomepageController();