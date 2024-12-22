import React, { useState } from 'react';
import './Blog.css';
import Header from '../../components/header/header';
import { Button, Input, Form, Select, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import BlogEditor from "./BlogEditor";

const { Option } = Select;

function Blog() {
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [additionalDishes, setAdditionalDishes] = useState([]);
    const [croppedImage, setCroppedImage] = useState(null); // Lưu 1 ảnh duy nhất
    const handleDishChange = (values) => {
        setSelectedDishes(values);
    };

    const addInputField = () => {
        setAdditionalDishes((prev) => [...prev, ""]); // Thêm một ô input mới vào danh sách
    };

    const handleAdditionalDishChange = (index, value) => {
        const newDishes = [...additionalDishes];
        newDishes[index] = value;
        setAdditionalDishes(newDishes);
    };

    const removeInputField = (index) => {
        const newDishes = [...additionalDishes];
        newDishes.splice(index, 1); // Xóa ô input tại index
        setAdditionalDishes(newDishes);
    };

    // Xu ly anh 
    const cropImage = (file, width, height) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');

                    // Tính toán để crop ảnh giữ tỷ lệ trung tâm
                    const scale = Math.max(width / img.width, height / img.height);
                    const x = (width - img.width * scale) / 2;
                    const y = (height - img.height * scale) / 2;

                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                    resolve(canvas.toDataURL('image/jpeg'));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async ({ file }) => {
        const cropped = await cropImage(file.originFileObj || file, 800, 400);
        setCroppedImage(cropped); // Chỉ lưu ảnh duy nhất
    };

    const handleRemoveImage = () => {
        setCroppedImage(null); // Xóa ảnh đã upload
    };

    return (
        <div>
            <header>
                {/* Header nội dung của bạn, nếu cần */}
            </header>
            <main className="blog-container">
                <a href="#">戻って読み続ける</a>
                <Form layout="vertical">
                    <Form.Item>
                        <Input className="title" placeholder="タイトル" />
                    </Form.Item>
                    <Form.Item>
                        <div className="related-box">
                            <div className="related-dropdown">
                                <Select
                                    mode="multiple"
                                    placeholder="タグ"
                                    style={{ width: '100%', height: '44px' }}
                                    onChange={handleDishChange}
                                    dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                                    onSearch={(searchText) => {
                                        // Không cần thay đổi gì ở đây
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            // Khi người dùng nhấn dấu cách hoặc Enter
                                            const newTag = e.target.value.trim();  // Lấy giá trị nhập vào và loại bỏ khoảng trắng ở đầu và cuối
                                            if (newTag) {
                                                const tags = newTag.split(" ");  // Tách các từ theo dấu cách
                                                const filteredTags = tags.filter(tag => tag && !selectedDishes.includes(tag));  // Loại bỏ các tag đã có và trống
                                                if (filteredTags.length > 0) {
                                                    // Thêm tag mới vào danh sách
                                                    setSelectedDishes((prev) => [...prev, ...filteredTags]);
                                                    e.target.value = ""; // Reset input sau khi thêm tag
                                                }
                                            }
                                        }
                                    }}
                                    value={selectedDishes}
                                >
                                    <Option value="sushi">寿司</Option>
                                    <Option value="ramen">天ぷら</Option>
                                    <Option value="tempura">ラーメン</Option>
                                    <Option value="takoyaki">たこ焼き</Option>
                                    <Option value="mochi">餅</Option>
                                    <Option value="matcha">抹茶</Option>
                                </Select>
                            </div>
                            {selectedDishes.length > 0 && (
                                <div className="selected-dishes">
                                    {selectedDishes.map((dish, index) => (
                                        <span key={index} className="selected-dish">
                                            {dish}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Form.Item>
                    <span className="related-label">日本の関連する料理</span>
                    <div className="flex">
                        <Form.Item className="flex-grow" style={{ marginBottom: 0 }}>
                            <Input className="tag" placeholder="どんな日本料理の味に似ていますか" style={{height:'44px'}}/>
                        </Form.Item>
                                        
                        <Form.Item>
                            <Button
                                type="dashed"
                                icon={<span style={{ fontSize: '20px', color: '#1890ff' }}>+</span>} // Thêm dấu cộng vào nút
                                onClick={addInputField}
                                style={{ height: '44px' }}
                            >
                                <div style={{ width: 80, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    コメント
                                </div>
                            </Button>
                        </Form.Item>
                    </div>

                    {/* Hiển thị các ô input mới và nút "-" để xóa */}
                    {additionalDishes.map((dish, index) => (
                        <Form.Item key={index} style={{ marginBottom: '0' }}>
                            <div className="flex">
                                <Input
                                    className="tag"
                                    value={dish}
                                    onChange={(e) => handleAdditionalDishChange(index, e.target.value)}
                                    placeholder={`どんな日本料理の味に似ていますか`}
                                    style={{ height: '44px' }}
                                />
                                <Button
                                    type="dashed"
                                    icon={<span style={{ fontSize: '20px', color: 'red' }}>-</span>} 
                                    onClick={() => removeInputField(index)} // Khi nhấn vào nút "-", ô input tương ứng sẽ bị xóa
                                    style={{ height: '44px' }}
                                >
                                </Button>
                            </div>
                        </Form.Item>
                    ))}
                </Form>
            <div className='center'>
                {/* Khung Upload ảnh */}
                <div className="upload-container">
                    {croppedImage ? (
                        <div className="uploaded-image-container">
                            <img src={croppedImage} alt="Uploaded" className="uploaded-image" />
                            <Button
                                icon={<DeleteOutlined />}
                                type="text"
                                danger
                                onClick={handleRemoveImage}
                            >
                                写真を削除
                            </Button>
                        </div>
                    ) : (
                        <Upload
                            listType="picture-card"
                            onChange={handleImageUpload}
                            beforeUpload={() => false} // Ngăn upload thực sự, chỉ xử lý cục bộ
                            maxCount={1} // Chỉ cho phép tải lên 1 file
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    )}
                </div>

                <div className="border">
                    <BlogEditor/>
                </div>
            </div>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        height: '44px',
                        width: '20%',  // Đảm bảo nút chiếm toàn bộ chiều rộng của container
                        display: 'flex',
                        margin: '0 auto',
                        top: '20px',
                        justifyContent: 'center',  // Căn giữa nội dung của nút
                        alignItems: 'center',      // Căn giữa theo chiều dọc
                    }}
                >
                    投稿
                </Button>
            </Form.Item>

           
            </main>
        </div>
    );
}

export default Blog;