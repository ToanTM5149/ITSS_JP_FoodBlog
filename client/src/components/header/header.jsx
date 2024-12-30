import React, { useContext, useState } from 'react';
import { Layout, Input, Button, Row, Col, Badge, Modal } from 'antd';
import { SearchOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth_context';
import './header.css';

const { Header } = Layout;

const HeaderBar = ({ showSearch = true, onSearchSubmit }) => { // Thêm onSearchSubmit
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [searchVisible, setSearchVisible] = useState(showSearch);
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

   // Hàm xử lý thay đổi từ khóa tìm kiếm
   const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchSubmit) {
      onSearchSubmit(value); // Truyền từ khóa ngay khi nhập
    }
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (onSearchSubmit) {
      onSearchSubmit(searchValue); // Gọi hàm từ prop để xử lý tìm kiếm
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleLogoutAndNavigate = () => {
    handleLogout(); // Gọi hàm logout
    navigate('/');  // Chuyển hướng
  };

  const handleProtectedAction = (action) => {
    if (isLoggedIn) {
      action();
    } else {
      setIsModalVisible(true);
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    handleLoginRedirect();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header className="header-container">
        <Row style={{ width: '100%' }} align="middle">
          <Col span={6}>
            <Button
              type="link"
              className="header-title"
              onClick={() => navigate('/')}
            >
              ベトフード
            </Button>
          </Col>

          {searchVisible && (
            <Col span={6}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="ブログを探す"
                value={searchValue}
                onChange={handleSearchChange}
                onPressEnter={handleSearchSubmit} // Thực hiện tìm kiếm khi nhấn Enter
                style={{ width: '150%' }}
              />
            </Col>
          )}

          <Col span={12} className="button-container">
            <Badge count={5}>
              <Button shape="circle" icon={<BellOutlined />} />
            </Badge>

            <Button
              type="link"
              className="header-button"
              onClick={() => handleProtectedAction(() => navigate('/createblog'))}
            >
              編集
            </Button>

            <Button
              type="link"
              className="header-button"
              onClick={() => navigate('/all-blogs')}
            >
              ブログ
            </Button>

            <Button
              type="link"
              className="header-button"
              onClick={() => handleProtectedAction(() => navigate('/profile'))}
            >
              プロフィール
            </Button>

            {isLoggedIn ? (
              <Button
                type="link"
                className="header-button"
                onClick={handleLogoutAndNavigate}
              >
                ログアウト
              </Button>
            ) : (
              <Button
                type="link"
                className="header-button"
                onClick={handleLoginRedirect}
              >
                ログイン
              </Button>
            )}
          </Col>
        </Row>
      </Header>

      <Modal
        title="未ログインです"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="同意"
        cancelText="キャンセル"
        centered
      >
        <p>この操作を行うにはログインが必要です。</p>
      </Modal>
    </>
  );
};

export default HeaderBar;
