import React, { useState } from 'react';
import './Blog.css';
import Header from '../components/Header';
import { Button, Input, Form, Select } from 'antd';
import BlogEditor from "./BlogEditor";

const { Option } = Select;

function Blog() {
    const [selectedDishes, setSelectedDishes] = useState([]);

    const handleDishChange = (values) => {
        setSelectedDishes(values);
    };

    return (
        <div>
            <Header />
            <header>
                {/* Header nội dung của bạn, nếu cần */}
            </header>
            <main className="blog-container">
                <a href="#">戻って読み続ける</a>
                <Form layout="vertical">
                    <Form.Item>
                        <Input className="title" placeholder="タイトル" />
                    </Form.Item>
                    {/* Box Món ăn Nhật liên quan */}
                    <Form.Item>
                        <div className="related-box">
                            <span className="related-label">日本の関連する料理:</span>
                            <div className="related-dropdown">
                                <Select 
                                    mode="multiple"
                                    placeholder=" 料理を選ぶ"
                                    style={{ width: '100%', height: '44px' }}
                                    onChange={handleDishChange}
                                    dropdownStyle={{ maxHeight: 300, overflow: 'auto' }} 
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
                    <div className="flex">
                        <Form.Item className="flex-grow" style={{ marginBottom: 0 }}>
                            <Input className="tag" placeholder="タグ" style={{height:'44px'}}/>
                        </Form.Item>
                                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{height: '44px'}}>
                                <div style={{width: 80, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    投稿
                                </div>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
                <div className="center">
                    <div className="border">
                        <BlogEditor/>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Blog;
