import React, { useState, useContext } from 'react';
import { Button, Input, Form, Select, Upload, Rate } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BlogEditor from "./BlogEditor";
import { AuthContext } from '../../context/auth_context';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Blog.css';

const { Option } = Select;

function Blog() {
    const { loggedInUser } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState("");
    const [media, setMedia] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [rating, setRating] = useState(0);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleTagsChange = (values) => setTags(values);

    const handleAddDish = (e) => {
        if (e.key === 'Enter') {
            const newDish = e.target.value.trim();
            if (newDish && !dishes.includes(newDish)) {
                setDishes([...dishes, newDish]);
                e.target.value = '';
            }
        }
    };

    const handleRemoveDish = (index) => {
        const updatedDishes = dishes.filter((_, i) => i !== index);
        setDishes(updatedDishes);
    };

    const handleMediaUpload = ({ fileList }) => {
        const updatedMedia = fileList.map(async file => {
            const fileType = file.type.split('/')[0];
            if (fileType !== "image" && fileType !== "video") {
                alert("Please upload an image or video file.");
                return null;
            }

            const formData = new FormData();
            formData.append('file', file.originFileObj);

            console.log('Uploading media:', file.originFileObj);

            try {
                const response = await fetch('http://localhost:8000/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data.url) {
                    console.log('Media uploaded:', data.url);
                    return { type: fileType, url: data.url };
                }
            } catch (error) {
                console.error('Error uploading media:', error);
                return null;
            }
        });

        Promise.all(updatedMedia).then(results => {
            setMedia(results.filter(item => item !== null));
        });
    };

    const handleSave = () => {
        if (!title || !content || media.length === 0) {
            alert("Please fill all required fields before saving.");
            return;
        }

        const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
        const newId = (existingBlogs.length > 0 ? Math.max(...existingBlogs.map(blog => blog.id)) : 0) + 1;

        const newBlog = {
            id: newId,
            title,
            content,
            dishes,
            rating,
            author_id: loggedInUser?.id || 0,
            tags: tags,
            tags: tags,
            status: "public",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        newBlog.media = media.map((item, index) => ({ ...item, id: index + 1 }));

        localStorage.setItem("blogs", JSON.stringify([...existingBlogs, newBlog]));
        alert("ブログが正常に保存されました！");
        navigate("/all-blogs");
    };

    return (
        <div className="blog-container">
            <a href="/all-blogs" className="back-link">戻って投稿する</a>
            {step === 1 && (
                <Form layout="vertical">
                    <Form.Item>
                        <Input
                            className="form-control"
                            placeholder="タイトル"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            mode="tags"
                            placeholder="タグ"
                            onChange={handleTagsChange}
                            value={tags}
                        >
                            <Option value="寿司">寿司</Option>
                            <Option value="ラーメン">ラーメン</Option>
                            <Option value="天ぷら">天ぷら</Option>
                            <Option value="ドーナツ">ドーナツ</Option>
                        </Select>
                    </Form.Item>
                    <div className="row">
                        <div className="col-9 editor-container">
                            <div className="editor-wrapper">
                                <BlogEditor onContentChange={setContent} />
                            </div>
                        </div>
                        <div className="col-3 media-upload-container">
                            <Upload
                                multiple
                                listType="picture-card"
                                onChange={handleMediaUpload}
                                beforeUpload={() => false}
                                accept="image/*,video/*"
                            >
                                <div>
                                    <PlusOutlined />
                                    <div>Upload Media</div>
                                </div>
                            </Upload>
                        </div>
                    </div>
                    <div>
                        <Button type="primary" onClick={() => setStep(2)}>次へ</Button>
                    </div>
                </Form>
            )}
            {step === 2 && (
                <div className="editor-container">
                    <div className="action-buttons">
                        <div className="container mt-4">
                            <p>日本ではこの料理の味と同じ料理がありますか？</p>
                            {dishes.map((dish, index) => (
                                <div className="input-group mb-2" key={index}>
                                    <Input
                                        defaultValue={dish}
                                        onKeyDown={handleAddDish}
                                        onPressEnter={(e) => e.preventDefault()}
                                        className="form-control"
                                    />
                                    <div className="input-group-append">
                                        <Button
                                            type="danger"
                                            onClick={() => handleRemoveDish(index)}
                                        >
                                            ×
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <div className="input-group mb-3">
                                <Input
                                    placeholder="新しい料理を追加..."
                                    onKeyDown={handleAddDish}
                                    className="form-control"
                                />
                            </div>
                            <div className="d-flex align-items-center mb-3" style={{ marginTop: '30px' }}>
                                <p className="mb-0 mr-3">この料理はいかがでしょうか？　　　</p>
                                <Rate value={rating} onChange={setRating} />
                            </div>

                            <div className="d-flex justify-content-between mt-3">
                                <Button onClick={() => setStep(1)}>戻る</Button>
                                <Button type="primary" onClick={handleSave}>保存</Button>
                            </div>

                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default Blog;
