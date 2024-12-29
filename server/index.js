const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cors = require('cors'); // Added cors

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer storage
const storage = multer.diskStorage({});

// File filter to accept images and videos
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

app.use(cors()); // Added CORS middleware

app.get('/', (req, res) => {
    res.send('Hello World');
});

const upload = multer({ storage, fileFilter });

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file);
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'cm4c' });        
        res.json({ url: result.secure_url });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});