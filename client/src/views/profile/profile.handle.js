import { message } from "antd";

// Lấy thông tin người dùng hiện tại và bài viết của họ
export const fetchProfileData = () => {
  const loggedInUserEmail = JSON.parse(localStorage.getItem("loggedInUser"))?.email;

  if (!loggedInUserEmail) {
    message.error("Bạn chưa đăng nhập!");
    return { user: null, userBlogs: [] };
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const user = users.find((user) => user.email === loggedInUserEmail);
  if (!user) {
    message.error("Không tìm thấy thông tin người dùng!");
    return { user: null, userBlogs: [] };
  }

  const userBlogs = blogs.filter((blog) => blog.author_id === user.id);
  return { user, userBlogs };
};
//profile cua nguoi khackhac
export function fetchProfileData2(id) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const user = users.find((u) => u.id === id); // Tìm user theo id
  const userBlogs = blogs.filter((b) => b.userId === id); // Lọc bài viết theo userId

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
