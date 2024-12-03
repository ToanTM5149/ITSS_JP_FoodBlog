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

      <Layout style={{ padding: '0 0 0px' }}>
        {/* Main Content */}
        <Layout style={{ padding: '0 0px 0px' }}>
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
