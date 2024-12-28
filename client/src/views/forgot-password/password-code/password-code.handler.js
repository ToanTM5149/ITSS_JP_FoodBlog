/**
 * Xử lý thay đổi mã xác thực
 * @param {Event} e - Sự kiện thay đổi input
 * @param {Array} code - Mảng lưu mã xác thực
 * @param {Function} setCode - Hàm setCode từ state
 * @param {Number} index - Vị trí của ô nhập hiện tại
 */
export const handleChangeCode = (e, code, setCode, index) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
  
      // Tự động chuyển sang ô tiếp theo
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  
  /**
   * Xử lý quay lại màn hình trước
   */
  export const handleBack = (navigate) => {
    navigate("/forgot-password2");
    // Logic điều hướng về trang đăng nhập nếu cần
   };
  /**
   * Xử lý tiếp tục sau khi nhập mã
   */
  export const handleContinue = (code) => {
    if (code.join("").length === 4) {
      alert("コードを確認しました！");
    } else {
      alert("4桁のコードを入力してください！");
    }
  };
  
  /**
   * Xử lý gửi lại mã xác thực
   */
  export const handleResend = () => {
    alert("コードを再送信しました！");
  };
  