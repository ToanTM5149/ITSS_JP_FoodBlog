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
      message.success("ログインに成功しました！");

      navigate("/"); // Chuyển hướng sang homepage
    } else {
      message.error("メールアドレスまたはパスワードが正しくありません！");
    }
  } catch (error) {
    console.error("ログインエラー:", error);
    message.error("ログイン中にエラーが発生しました。もう一度お試しください！");
  } finally {
    setLoading(false); // Kết thúc trạng thái loading
  }
};
