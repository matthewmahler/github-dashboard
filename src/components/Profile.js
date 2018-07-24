import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import { List, Avatar } from "antd";
import { Spin } from "antd";

class Profile extends Component {
  render() {
    const { userData, eventData, followerData, followingData } = this.props;

    return (
      <div style={{ textAlign: "left" }}>
        {userData ? (
          <div>
            <div className="name-container">
              <h1>{userData.name}</h1>
              <Avatar
                src={userData.avatar_url}
                shape="square"
                size="large"
                icon="user"
              />
            </div>
            <p>{userData.bio}</p>
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '50px'}}>
            <Spin />
          </div>
        )}

        <Row gutter={16}>
          <Col span={8}>
            <Card title="Recent Activities">
              <List
                itemLayout="horizontal"
                pagination={{ pageSize: 5 }}
                dataSource={eventData}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.type}
                      description={item.repo.name}
                    />
                  </List.Item>
                )}
              />,
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Following">
              <List
                itemLayout="horizontal"
                pagination={{ pageSize: 5 }}
                dataSource={followingData}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar_url} />}
                      title={<a href={item.html_url}>{item.login}</a>}
                    />
                  </List.Item>
                )}
              />,
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Followers">
              <List
                itemLayout="horizontal"
                pagination={{ pageSize: 5 }}
                dataSource={followerData}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar_url} />}
                      title={<a href={item.html_url}>{item.login}</a>}
                    />
                  </List.Item>
                )}
              />,
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
