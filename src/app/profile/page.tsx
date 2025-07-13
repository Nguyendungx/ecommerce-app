"use client";
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Avatar, Button, Form, Input, Select, Tabs, List, Tag, Progress, Space } from 'antd';
import { EditOutlined, SaveOutlined, BookOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  const userInfo = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    avatar: "https://via.placeholder.com/150x150/1677ff/ffffff?text=NV",
    joinDate: "2023-01-15",
    level: "Gold",
    points: 1250
  };

  const recentCourses = [
    { id: 1, title: "React.js Cơ bản", progress: 75, lastAccessed: "2024-03-10" },
    { id: 2, title: "Node.js Backend", progress: 45, lastAccessed: "2024-03-08" },
    { id: 3, title: "Python Data Science", progress: 90, lastAccessed: "2024-03-05" }
  ];

  const achievements = [
    { id: 1, name: "Học viên tích cực", description: "Hoàn thành 10 khóa học", icon: "🏆" },
    { id: 2, name: "Thành viên VIP", description: "Đạt 1000 điểm", icon: "⭐" },
    { id: 3, name: "Chia sẻ kiến thức", description: "Đăng 5 bài viết", icon: "📝" }
  ];

  const handleSave = (values: Record<string, unknown>) => {
    console.log('Saved:', values);
    setEditing(false);
  };

  const tabItems = [
    {
      key: '1',
      label: 'Thông tin cá nhân',
      children: (
        <Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center' }}>
                <Avatar size={120} src={userInfo.avatar} />
                <Title level={4} style={{ marginTop: 16 }}>{userInfo.name}</Title>
                <Tag color="gold">{userInfo.level}</Tag>
                <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                  Thành viên từ {new Date(userInfo.joinDate).toLocaleDateString('vi-VN')}
                </Text>
              </div>
            </Col>
            <Col xs={24} md={16}>
              <Form
                form={form}
                layout="vertical"
                initialValues={userInfo}
                onFinish={handleSave}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Họ và tên" name="name">
                      <Input disabled={!editing} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email" name="email">
                      <Input disabled={!editing} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Số điện thoại" name="phone">
                      <Input disabled={!editing} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Cấp độ" name="level">
                      <Select disabled={!editing}>
                        <Option value="Bronze">Bronze</Option>
                        <Option value="Silver">Silver</Option>
                        <Option value="Gold">Gold</Option>
                        <Option value="Platinum">Platinum</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  {editing ? (
                    <Space>
                      <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                        Lưu
                      </Button>
                      <Button onClick={() => setEditing(false)}>
                        Hủy
                      </Button>
                    </Space>
                  ) : (
                    <Button type="primary" icon={<EditOutlined />} onClick={() => setEditing(true)}>
                      Chỉnh sửa
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      )
    },
    {
      key: '2',
      label: 'Khóa học của tôi',
      children: (
        <Card>
          <List
            dataSource={recentCourses}
            renderItem={(course) => (
              <List.Item
                key={course.id}
                actions={[
                  <Button type="link" key="continue">Tiếp tục học</Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<BookOutlined style={{ fontSize: 24, color: '#1677ff' }} />}
                  title={course.title}
                  description={
                    <div>
                      <Progress percent={course.progress} size="small" style={{ marginBottom: 8 }} />
                      <Text type="secondary">
                        <ClockCircleOutlined /> Truy cập lần cuối: {course.lastAccessed}
                      </Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )
    },
    {
      key: '3',
      label: 'Thành tích',
      children: (
        <Card>
          <Row gutter={[16, 16]}>
            {achievements.map(achievement => (
              <Col xs={24} sm={12} md={8} key={achievement.id}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{achievement.icon}</div>
                  <Title level={5}>{achievement.name}</Title>
                  <Text type="secondary">{achievement.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      )
    }
  ];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px', color: '#1677ff' }}>
        Hồ Sơ Cá Nhân
      </Title>
      <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          style={{ padding: '24px' }}
        />
      </div>
    </div>
  );
} 