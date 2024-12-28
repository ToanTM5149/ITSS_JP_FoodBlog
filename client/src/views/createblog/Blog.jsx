import React, { useState, useContext } from 'react';
import { Button, Input, Form, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BlogEditor from "./BlogEditor";
import { AuthContext } from '../../context/auth_context';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function Blog() {
    const { loggedInUser } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState("");
    const [media, setMedia] = useState(null); // Lưu ảnh hoặc video
    const [mediaType, setMediaType] = useState(null); // Xác định loại file (image/video)
    const navigate = useNavigate();

    const handleTagsChange = (values) => {
        setTags(values);
    };

    const handleMediaUpload = async ({ file }) => {
        const fileType = file.type.split('/')[0]; // "image" hoặc "video"
        if (fileType !== "image" && fileType !== "video") {
            alert("Please upload an image or video file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setMedia(e.target.result); // Lưu URL media
            setMediaType(fileType); // Lưu loại file (image/video)
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    };

    const handleSave = () => {
        if (!title || !content || !media) {
            alert("Please fill all required fields before saving.");
            return;
        }
    
        // Lấy danh sách blog hiện tại từ localStorage
        const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    
        // Xác định ID mới
        const maxId = existingBlogs.length > 0 ? Math.max(...existingBlogs.map(blog => blog.id)) : 0;
        const newId = maxId + 1;
    
        // Tạo blog mới
        const newBlog = {
            id: newId, // Sử dụng ID mới
            title,
            content,
            image_url: mediaType === "image" ? media : null,
            video_url: mediaType === "video" ? media : null,
            author_id: loggedInUser?.id || 0,
            tags: tags,
            status: "public",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
    
        // Lưu blog mới vào localStorage
        localStorage.setItem("blogs", JSON.stringify([...existingBlogs, newBlog]));
        alert("Blog has been saved successfully!");
        navigate("/all-blogs");
    };
    

    return (
        <div style={{ padding: "100px 20px 20px 20px", maxWidth: "800px", margin: "0 auto" }}>
            <a href="/all-blogs" style={{ display: "block", marginBottom: "20px", textDecoration: "underline" }}>
                戻って投稿する
            </a>
            <Form layout="vertical">
                <Form.Item style={{ marginBottom: "10px" }}>
                    <Input
                        placeholder="タイトル"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ height: "40px" }}
                    />
                </Form.Item>
                <Form.Item style={{ marginBottom: "10px" }}>
                    <Select
                        mode="tags"
                        placeholder="タグ"
                        style={{ width: "100%" }}
                        onChange={handleTagsChange}
                        value={tags}
                    >
                        <Option value="寿司">寿司</Option>
                        <Option value="ラーメン">ラーメン</Option>
                        <Option value="天ぷら">天ぷら</Option>
                        <Option value="ドーナツ">ドーナツ</Option>
                    </Select>
                </Form.Item>
            </Form>
            <div style={{ border: "1px dashed #d9d9d9", height: "400px", marginTop: "20px", position: "relative" }}>
                {!media ? (
                    <Upload
                        listType="picture-card"
                        onChange={handleMediaUpload}
                        beforeUpload={() => false}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                        accept="image/*,video/*"
                    >
                        <div>
                            <PlusOutlined />
                            <div>Upload Media</div>
                        </div>
                    </Upload>
                ) : (
                    <>
                        {mediaType === "image" ? (
                            <img
                                src={media}
                                alt="Uploaded"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            />
                        ) : (
                            <video
                                controls
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <source src={media} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <Button
                            onClick={() => {
                                setMedia(null);
                                setMediaType(null);
                            }}
                            style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "10px",
                                backgroundColor: "#ff4d4f",
                                color: "#fff",
                                border: "none",
                            }}
                        >
                            Re-upload
                        </Button>
                    </>
                )}
            </div>
            <div style={{ marginTop: "20px" }}>
                <h3>Content</h3>
                <div style={{ border: "1px solid #d9d9d9", padding: "10px", borderRadius: "4px" }}>
                    <BlogEditor onContentChange={setContent} />
                </div>
            </div>
            <Button
                type="primary"
                onClick={handleSave}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "#1677ff",
                    color: "#fff",
                    height: "44px",
                    width: "120px",
                    zIndex: 1000,
                }}
            >
                Save
            </Button>
        </div>
    );
}

export default Blog;
