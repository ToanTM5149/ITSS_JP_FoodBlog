import { message } from "antd";
import { Navigate } from "react-router-dom";

// Lấy thông tin người dùng hiện tại và bài viết của họ
export const fetchProfileData = () => {
  const loggedInUserEmail = JSON.parse(localStorage.getItem("loggedInUser"))?.email;

  if (!loggedInUserEmail) {
    message.error("Bạn chưa đăng nhập!");
    
    return { user: null, userBlogs: [] };
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const likes = JSON.parse(localStorage.getItem("likes")) || [];

  const user = users.find((user) => user.email === loggedInUserEmail);
  if (!user) {
    return { user: null, userBlogs: [] };
  }

  const userBlogs = blogs.filter((blog) => blog.author_id === Number(user.id));
  userBlogs.forEach((blog) => {
    blog.likes = likes.filter((like) => like.blog_id === blog.id).length;
  });
  return { user, userBlogs };
};

export const fetchProfileData2 = (id) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const likes = JSON.parse(localStorage.getItem("likes")) || [];

  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    message.error("Không tìm thấy thông tin người dùng!");
    return { user: null, userBlogs: [] };
  }

  const userBlogs = blogs.filter((blog) => blog.author_id === user.id);
  userBlogs.forEach((blog) => {
    blog.likes = likes.filter((like) => like.blog_id === blog.id).length;
  });
  return { user, userBlogs };
}

// Xóa bài viết
export const deletePost = (postId, userPosts, setUserPosts) => {
  const updatedPosts = userPosts.filter((post) => post.id !== postId);
  setUserPosts(updatedPosts);

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const updatedBlogs = blogs.filter((blog) => blog.id !== postId);
  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

  message.success("Đã xóa bài viết!");
};
