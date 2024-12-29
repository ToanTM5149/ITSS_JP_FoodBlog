const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Tạo các thư mục nếu chưa tồn tại
const createFolders = () => {
  const imagesPath = path.join(__dirname, 'images');
  const videosPath = path.join(__dirname, 'videos');

  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
  }

  if (!fs.existsSync(videosPath)) {
    fs.mkdirSync(videosPath);
  }
};

createFolders();

// Cấu hình Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'images');
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, 'videos');
    } else {
      cb(new Error('Unsupported file type'), null);
    }
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất để tránh trùng lặp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter để chấp nhận chỉ ảnh và video
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Phục vụ các thư mục tĩnh
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Route kiểm tra
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Route upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded or unsupported file type.' });
    }

    // Xác định URL truy cập file
    const protocol = req.protocol;
    const host = req.get('host');
    let fileUrl = '';

    if (req.file.mimetype.startsWith('image/')) {
        fileUrl = `${protocol}://${host}/images/${req.file.filename}`;
    } else if (req.file.mimetype.startsWith('video/')) {
        fileUrl = `${protocol}://${host}/videos/${req.file.filename}`;
    }

    res.json({ url: fileUrl });
});

// Xử lý lỗi Multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message === 'Unsupported file type') {
        return res.status(400).json({ error: err.message });
    }
    next(err);
});

// Bắt đầu server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
