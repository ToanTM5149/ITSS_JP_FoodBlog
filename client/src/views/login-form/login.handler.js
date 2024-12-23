import { message } from "antd";

export const handleLogin = (values, setLoading, navigate, handleAuthLogin) => {
  setLoading(true); // Bắt đầu trạng thái loading

  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      handleAuthLogin(user); // Gọi hàm handleLogin từ AuthContext
      message.success("Đăng nhập thành công!");
      navigate("/"); // Chuyển hướng sang homepage
    } else {
      message.error("Email hoặc mật khẩu không chính xác!");
    }
  } catch (error) {
    console.error("Login error:", error);
    message.error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại!");
  } finally {
    setLoading(false); // Kết thúc trạng thái loading
  }
};
