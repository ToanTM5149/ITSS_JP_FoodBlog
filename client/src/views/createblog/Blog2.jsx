import React, { useState, useRef } from 'react';
import './Blog.css';
import Header from '../../components/header/header';
import { Button, Input, Form, Select, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import BlogEditor from "./BlogEditor";
import mockData from '../../mockdata/mockdata.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Option } = Select;

function Blog() {
    const [selectedDishes, setSelectedDishes] = useState([]);  // Các tag món ăn
    const [additionalDishes, setAdditionalDishes] = useState([]);  // Bình luận về các món ăn liên quan
    const [croppedImage, setCroppedImage] = useState(null);  // Lưu ảnh duy nhất
    const [title, setTitle] = useState("");  // Tiêu đề bài viết
    const editorRef = useRef(null);  // Tham chiếu đến BlogEditor để lấy nội dung HTML

    const navigate = useNavigate(); // Initialize navigate with useNavigate

    // Xử lý thay đổi tag món ăn
    const handleDishChange = (values) => {
        setSelectedDishes(values);
    };

    // Thêm ô input mới vào danh sách bình luận
    const addInputField = () => {
        setAdditionalDishes((prev) => [...prev, ""]); // Thêm một trường input mới với giá trị mặc định là chuỗi rỗng
    };

    

    // Xử lý thay đổi bình luận của từng món ăn liên quan
    const handleAdditionalDishChange = (index, value) => {
        const newDishes = [...additionalDishes];
        newDishes[index] = value; // Cập nhật giá trị tại vị trí index cụ thể
        setAdditionalDishes(newDishes); // Cập nhật lại state
    };


    // Xóa ô input của bình luận món ăn liên quan
    const removeInputField = (index) => {
        const newDishes = [...additionalDishes];
        newDishes.splice(index, 1); // Xóa phần tử tại vị trí index
        setAdditionalDishes(newDishes); // Cập nhật lại state
    };

    // Xử lý ảnh tải lên
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

    // Xử lý ảnh upload
    const handleImageUpload = async ({ file }) => {
        const cropped = await cropImage(file.originFileObj || file, 800, 400);
        setCroppedImage(cropped); // Lưu ảnh duy nhất
    };

    // Xóa ảnh đã tải lên
    const handleRemoveImage = () => {
        setCroppedImage(null);
    };

    // Lưu bài viết
    const handlePost = () => {
        // Lấy nội dung HTML từ BlogEditor
        const editorElement = editorRef.current.querySelector(".ql-editor");
        const content = editorElement.innerHTML;

        // Tạo dữ liệu bài viết mới
        const postData = {
            id: Date.now(), // ID bài viết - String
            userId: 1, // ID người viết (giả định là 1) - String
            title, // String
            tags: selectedDishes,  // Lưu các tag món ăn - String[]
            dishes: additionalDishes,  // Lưu các bình luận món ăn liên quan - String[]
            timestamp: new Date().toISOString(), // Thời gian đăng bài -String[]
            image: croppedImage,
            content,
        };
        
        // Thêm bài viết mới vào mockData (giả sử mockData là mảng lưu trữ bài viết)
        mockData.push(postData);
        // Lưu dữ liệu vào localStorage
        localStorage.setItem("mockData", JSON.stringify(mockData));
        // Navigate to WatchBlog page with post data
        navigate("/watchblog", { state: { blog: postData } });
        // Kiểm tra log và thông báo
        console.log("Dữ liệu bài viết đã được lưu:", postData);
        alert("Bài viết đã được lưu thành công!");
    };

    return (
        <div>
            <Header />
            <header>
                {/* Header nội dung của bạn */}
            </header>
            <main className="blog-container">
                <a href="#">戻って読み続ける</a>
                <Form layout="vertical">
                    <Form.Item>
                        <Input 
                            className="title"
                            placeholder="タイトル"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <div className="related-box">
                            <div className="related-dropdown">
                                <Select
                                    mode="multiple"
                                    placeholder="タグ"
                                    style={{ width: '100%', height: '44px' }}
                                    onChange={handleDishChange}
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
                                    <Option value="寿司">寿司</Option>
                                    <Option value="ラーメン">ラーメン</Option>
                                    <Option value="天ぷら">天ぷら</Option>
                                    <Option value="たこ焼き">たこ焼き</Option>
                                    <Option value="餅">餅</Option>
                                    <Option value="抹茶">抹茶</Option>
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
                            icon={<PlusOutlined />}
                            onClick={addInputField}
                            style={{ height: '44px' }}
                        >
                            <div style={{ width: 80, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                コメント
                            </div>
                        </Button>

                        </Form.Item>
                    </div>

                    {/* // Render các ô input mới cho additionalDishes */}
                    {additionalDishes.map((dish, index) => (
                        <Form.Item key={index} style={{ marginBottom: '0' }}>
                            <div className="flex">
                                <Input
                                    className="tag"
                                    value={dish} // Liên kết giá trị từ state
                                    onChange={(e) => handleAdditionalDishChange(index, e.target.value)} // Gọi hàm xử lý khi giá trị thay đổi
                                    placeholder={`どんな日本料理の味に似ていますか`}
                                    style={{ height: '44px' }}
                                />
                                <Button
                                    type="dashed"
                                    icon={<span style={{ fontSize: '20px', color: 'red' }}>-</span>}
                                    onClick={() => removeInputField(index)} // Gọi hàm xóa khi nhấn nút "-"
                                    style={{ height: '44px' }}
                                />
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
                        <div ref={editorRef}>
                            <BlogEditor />
                        </div>
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
                        onClick={handlePost} 
                    >
                        投稿
                    </Button>
                </Form.Item>
            </main>
        </div>
    );
}

export default Blog;
