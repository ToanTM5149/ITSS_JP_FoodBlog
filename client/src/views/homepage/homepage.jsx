import React from 'react';
import { Layout, Card, Button, Col, Row, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
const { Title, Text } = Typography;
const { Meta } = Card;
import HeaderBar from '../../components/header/header';

const {Content } = Layout;

const Homepage = () => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderBar showSearch={true}/>

      <Layout style={{ padding: '0 0 0px' }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280, background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>

          <Card className="recent-blogs" bordered={false} style={{paddingBottom: 10}}>
            <Title level={2} className="section-title">最近のブログ投稿</Title>
            <Row gutter={[16, 16]}>
              <Col span={24} md={16}>
                <Card
                  cover={<div className="blog-image large-image">

                  </div>}

                >
                  <Meta
                    avatar={<Avatar>M</Avatar>}
                    title="新しいスニーカーが登場。500ドル!!!"
                    description="Male • 2023年1月1日"
                  />
                </Card>
              </Col>

              <Col span={24} md={8}>
                <Row gutter={[0, 16]}>
                  <Col span={24}>
                    <Card
                      hoverable
                      cover={<div className="blog-image small-image"></div>}
                    >
                      <Meta
                        avatar={<Avatar>M</Avatar>}
                        title="新しいスニーカーが登場。500ドル!!!"
                        description="Male • 2023年1月1日"
                      />
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Card
                      hoverable
                      cover={<div className="blog-image small-image">
                        <img src={"https://th.bing.com/th/id/R.2436bfd57f8da9d3352be6d9c69f7d0d?rik=9ZCsDkOmNhWhyQ&riu=http%3a%2f%2fwallpaperheart.com%2fwp-content%2fuploads%2f2018%2f04%2fbest-scenery-wallpaper-scenery-images.jpg&ehk=QhEgBXlBIdu4NBBKeTvxOQncAMHrLokkC8ustgaeB9c%3d&risl=&pid=ImgRaw&r=0"} 
                        alt="small-card-icon"
                        style={{
                          width: '100%',    
                          height: '200px', 
                          objectFit: 'cover' 
                        }}
                        />
                      </div>}
                    >
                      <Meta
                        avatar={<Avatar>M</Avatar>}
                        title="新しいスニーカーが登場。500ドル!!!"
                        description="Male • 2023年1月1日"
                      />
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          
          <Card>
          <Row gutter={16}>
          <Col span={24} md={16}>
              <div className="blog-image large-image">
                <img
                  src={"https://th.bing.com/th/id/R.2436bfd57f8da9d3352be6d9c69f7d0d?rik=9ZCsDkOmNhWhyQ&riu=http%3a%2f%2fwallpaperheart.com%2fwp-content%2fuploads%2f2018%2f04%2fbest-scenery-wallpaper-scenery-images.jpg&ehk=QhEgBXlBIdu4NBBKeTvxOQncAMHrLokkC8ustgaeB9c%3d&risl=&pid=ImgRaw&r=0"}
                  alt="large-card-image"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', border: '20px'}}
                />
              </div>
            </Col>

            <Col span={24} md={8}>
              <Meta
                avatar={<Avatar>M</Avatar>}
                title="新しいスニーカーが登場。500ドル!!!"
                description="Male • 2023年1月1日"
              />
            </Col>
          </Row>
          </Card>
          

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
  );
};

export default Homepage;
