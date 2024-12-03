import React, { useState } from 'react';
import { Layout, Input, Button, Row, Col, Badge } from 'antd';
import { SearchOutlined, BellOutlined, EditOutlined, AppstoreAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './header.css'; 

const { Header } = Layout;

const HeaderBar = ({ showSearch = true, onLogout }) => {
  const [searchVisible, setSearchVisible] = useState(showSearch);

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <Header className="header-container">
      <Row style={{ width: '100%' }} align="middle">
        <Col span={6}>
          <h2 className="header-title">Tên Trang</h2>
        </Col>

        {searchVisible && (
          <Col span={6}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              style={{ width: '180%' }}
            />
          </Col>
        )}

        <Col span={12} className="button-container">
        <Badge count={5}>
            <Button shape="circle" icon={<BellOutlined />} />
          </Badge>

          <Button type="link" className="header-button">Chỉnh sửa</Button>

          <Button type="link" className="header-button">Thêm mới</Button>

          <Button type="link" className="header-button">Thông tin</Button>

          <Button type="link" className="header-button" onClick={onLogout}>Đăng xuất</Button>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderBar;
