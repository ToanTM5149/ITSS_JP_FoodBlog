export const handlePasswordChange = (e, setPassword) => {
    setPassword(e.target.value);
  };
  
  export const handleConfirmPasswordChange = (e, setConfirmPassword) => {
    setConfirmPassword(e.target.value);
  };
  
  export const handleBack = (navigate) => {
    navigate("/forgot-password2");
  };
  
  export const handleContinue = (password, confirmPassword, navigate) => {
    if (!password || !confirmPassword) {
      alert("すべてのフィールドに入力してください！");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("パスワードが一致しません！");
      return;
    }
  
    if (password.length < 6) {
      alert("パスワードは6文字以上にしてください！");
      return;
    }
  
    alert("新しいパスワードが正常に設定されました！");
    navigate("/");
  };
  