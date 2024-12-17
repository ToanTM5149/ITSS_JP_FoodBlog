const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header "Authorization"

  if (!token) {
    return res.status(401).json({ error: 'Token không có hoặc hết hạn' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token không hợp lệ hoặc hết hạn' });
    }

    req.user = decoded;  // Thông tin người dùng trong token (ví dụ: userId, email)
    next();
  });
};

module.exports = authenticateToken;
