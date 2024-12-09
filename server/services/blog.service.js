const Blog = require('../models/Blog');
const Like = require('../models/Like');

class BlogService {
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

      // Thêm bài viết mới
  createPost = async (data) => {
    try {
      const newPost = new Blog(data);
      return await newPost.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //Lưu lượt like cho bài viết
  likePost = async (userId, blogId) => {
    try {
      const like = new Like({ user_id: userId, blog_id: blogId });
      await like.save();
      return like;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //Trả về số lượt like của bài viết
  countLikes = async (blogId) => {
    try {
      const likeCount = await Like.countDocuments({ blog_id: blogId });
      return likeCount;
    } catch (error) {
      throw new Error(error.message);
    }
  };

}

module.exports = new BlogService();