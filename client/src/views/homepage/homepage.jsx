import React from 'react';
import { Layout, Menu, Card, Button, Col, Row } from 'antd';
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/header/header';

const { Sider, Content } = Layout;

const Homepage = () => {
  const handleLogout = () => {
    console.log('Logout');
    // Logic logout ở đây
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderBar showSearch={true} onLogout={handleLogout} />

      <Layout style={{ padding: '36px 24px 24px' }}>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>Products</Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>Profile</Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  title="Card Title 1"
                  bordered={false}
                  extra={<Button type="primary">More</Button>}
                >
                  Content for card 1
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Card Title 2"
                  bordered={false}
                  extra={<Button type="primary">More</Button>}
                >
                  Content for card 2
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Card Title 3"
                  bordered={false}
                  extra={<Button type="primary">More</Button>}
                >
                  Content for card 3
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Homepage;
