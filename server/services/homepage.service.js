const Blog = require('../models/Blog');

class HomepageService {
    getPublicPosts = async () => {
        try {
          console.log('Finding public posts...');
          const posts = await Blog.find({ status: 'public' })
            .populate('author_id', 'username email') // Sử dụng 'author_id'
            .select('-__v');
          console.log(`Found ${posts.length} public posts.`);
          return posts;
        } catch (error) {
          console.error('Error in getPublicPosts:', error);
          throw new Error(error.message);
        }
      };
    
    // Lấy danh sách bài viết gần đây
    getRecentPosts = async () => {
        try {
          return await Blog.find().sort({ createdAt: -1 })
          .limit(10)
          .populate('author_id', 'username email') // Sử dụng 'author_id'
          .select('-__v');
        } catch (error) {
          throw new Error(error.message);
        }
    };
}

module.exports = new HomepageService();