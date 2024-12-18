import React, { useState } from 'react';
import { Layout, Input, Button, Row, Col, Badge } from 'antd';
import { SearchOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import headerHandle from './header.handler'; // Import headerHandle
import './header.css';

const { Header } = Layout;

const HeaderBar = ({ showSearch = true }) => {
  const [searchVisible, setSearchVisible] = useState(showSearch);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();  // Khởi tạo navigate ở đây

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearchSubmit = () => {
    headerHandle.handleSearch(searchValue);  // Gọi hàm tìm kiếm từ headerHandle
  };
  
  return (
    <Header className="header-container">
      <Row style={{ width: '100%' }} align="middle">
        <Col span={6}>
          <h2 className="header-title">ベトフード</h2>
        </Col>

        {searchVisible && (
          <Col span={6}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="ブログを探す"
              value={searchValue}
              onChange={onSearchChange}
              onPressEnter={onSearchSubmit} // Gọi hàm tìm kiếm khi nhấn Enter
              style={{ width: '150%' }}
            />
          </Col>
        )}

        <Col span={12} className="button-container">
          <Badge count={5}>
            <Button shape="circle" icon={<BellOutlined />} />
          </Badge>

          <Button type="link" className="header-button">編集</Button>

          <Button type="link" className="header-button">ブログ</Button>

          <Button type="link" className="header-button">プロフィール</Button>

          <Button 
            type="link" 
            className="header-button" 
            onClick={() => headerHandle.handleLogout(navigate)} // Truyền navigate vào đây
          >
            ログアウト
          </Button> 
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderBar;
