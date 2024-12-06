import React from 'react';
import './Blog.css';
import Header from '../components/Header';
import { Button, Input, Form } from 'antd';

function Blog() {
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
                        <img src="https://placehold.co/600x300" alt="Placeholder image" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Blog;
