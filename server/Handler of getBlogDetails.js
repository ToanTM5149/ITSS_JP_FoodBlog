const express = require('express');
const router = express.Router();
const db = require('../db'); // Module để kết nối database

// API: Lấy chi tiết blog theo ID
router.get('/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        // Truy vấn lấy thông tin blog
        const query = `
            SELECT 
                blogs.id,
                blogs.title,
                blogs.content,
                blogs.image_url,
                blogs.status,
                blogs.created_at,
                blogs.updated_at,
                user.id,
                user.user_name,
                user.avatar,
                GROUP_CONCAT(t.name) AS tags
            FROM 
                blogs 
            LEFT JOIN user ON blogs.author_id = user.id
            LEFT JOIN blog_tag ON blogs.id = blog_tag.blog_id
            LEFT JOIN tags ON blog_tag.tag_id = tags.id
            WHERE 
                blogs.id = ?
            GROUP BY 
                blogs.id, user.id
        `;

        // Thực hiện truy vấn
        const [blog] = await db.execute(query, [blogId]);

        // Nếu không tìm thấy blog
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Trả về chi tiết blog
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
