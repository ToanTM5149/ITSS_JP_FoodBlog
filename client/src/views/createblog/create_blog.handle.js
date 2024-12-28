import { message } from "antd";
import { useContext } from "react";
import { DataContext } from "../../context/data_context";

export const useCreateBlog = () => {
  const { data, updateData } = useContext(DataContext);
  
  const getinCreateBlog = () => {
    const loggedInUserEmail = JSON.parse(localStorage.getItem("loggedInUser"))?.email;

    if (!loggedInUserEmail) {
      message.error("Bạn chưa đăng nhập!");
      return { user: null };
    }

    const user = data.users.find((user) => user.email === loggedInUserEmail);
    if (!user) {
      message.error("Không tìm thấy thông tin người dùng!");
      return { user: null };
    }
    return { user };
  };

  const createBlog = (newPost) => {
    // if (!newPost.title || !newPost.content) {
    //   message.error("Vui lòng điền đầy đủ thông tin bài viết!");
    //   return false;
    // }

    // // Kiểm tra nếu bài viết có id trùng lặp
    // const existingPost = data.blogs.find((post) => post.id === newPost.id);
    // if (existingPost) {
    //   message.error("ID bài viết đã tồn tại!");
    //   return false;
    // }

    // // Cập nhật danh sách bài viết mới
    // const updatedBlogs = [...data.blogs, newPost];
    // updateData("blogs", updatedBlogs);

    // message.success("Bài viết đã được tạo thành công!");
    return true;
  };

  return { getinCreateBlog, createBlog };
};
