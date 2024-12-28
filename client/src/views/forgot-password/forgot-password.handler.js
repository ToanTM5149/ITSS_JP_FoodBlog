import { message } from "antd";

/**
 * Xử lý sự kiện thay đổi email
 * @param {Event} e - Sự kiện thay đổi input
 * @param {Function} setEmail - Hàm setEmail từ state
 */
export const handleEmailChange = (e, setEmail) => {
  setEmail(e.target.value);
};

/**
 * Xử lý sự kiện khi nhấn nút "続ける"
 * @param {string} email - Địa chỉ email người dùng đã nhập
 */
export const handleContinue = (navigate) => {
  // if (!email) {
  //   message.error("メールアドレスを入力してください！");
  // } else {
  //   message.success("確認コードをメールで送信しました。");
  //   navigate("/")
  // }
  message.info("ログインページに戻ります...");
  navigate("/forgot-password2");
};

/**
 * Xử lý sự kiện khi nhấn nút "戻る"
 */

export const handleBack = (navigate) => {
 message.info("ログインページに戻ります...");
 navigate("/login");
 // Logic điều hướng về trang đăng nhập nếu cần
};
