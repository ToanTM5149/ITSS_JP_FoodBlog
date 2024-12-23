import { message } from "antd";

export const handleRegister = (values, setLoading, navigate) => {
  setLoading(true); // Bắt đầu trạng thái loading

  try {
    // Lấy danh sách người dùng hiện tại từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email đã tồn tại hay chưa
    const existingUser = users.find((user) => user.email === values.email);
    if (existingUser) {
      message.error("Email này đã được đăng ký!");
      setLoading(false);
      return;
    }

    // Thêm người dùng mới
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1, // ID tự động tăng
      username: values.username,
      email: values.email,
      password: values.password,
      role: "User", // Gán vai trò mặc định
      sex: "Unknown", // Có thể yêu cầu thêm thông tin trong tương lai
      avatar: "https://via.placeholder.com/150", // Avatar mặc định
      address: "Unknown",
      phone: "Unknown",
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Lưu danh sách người dùng cập nhật vào localStorage
    message.success("Đăng ký thành công!");
    navigate("/login"); // Chuyển hướng đến trang login
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    message.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
  } finally {
    setLoading(false); // Kết thúc trạng thái loading
  }
};
