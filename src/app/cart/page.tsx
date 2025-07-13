"use client";
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, InputNumber, List, Divider, Space, Empty, Tag } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

type CartItem = {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  type: 'course' | 'material' | 'event';
};

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "React.js Cơ bản đến Nâng cao",
      price: 1200000,
      originalPrice: 1500000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100/1677ff/ffffff?text=React",
      type: 'course'
    },
    {
      id: 2,
      title: "Hướng dẫn Node.js API Development",
      price: 300000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100/52c41a/ffffff?text=Node.js",
      type: 'material'
    },
    {
      id: 3,
      title: "Workshop React.js 2024",
      price: 0,
      quantity: 1,
      image: "https://via.placeholder.com/100x100/fa8c16/ffffff?text=Workshop",
      type: 'event'
    }
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'course': return 'Khóa học';
      case 'material': return 'Tài liệu';
      case 'event': return 'Sự kiện';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'blue';
      case 'material': return 'green';
      case 'event': return 'orange';
      default: return 'default';
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const total = subtotal;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.back()}
          style={{ marginBottom: '16px' }}
        >
          Quay lại
        </Button>
        <Title level={2} style={{ color: '#1677ff', margin: 0 }}>
          <ShoppingCartOutlined /> Giỏ Hàng
        </Title>
      </div>

      {cartItems.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '48px' }}>
          <Empty
            image={<ShoppingCartOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
            description="Giỏ hàng trống"
          >
            <Button type="primary" onClick={() => router.push('/')}>
              Tiếp tục mua sắm
            </Button>
          </Empty>
        </Card>
      ) : (
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card title="Sản phẩm trong giỏ hàng" style={{ marginBottom: '24px' }}>
              <List
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item
                                         actions={[
                       <Button 
                         key="delete"
                         type="text" 
                         danger 
                         icon={<DeleteOutlined />}
                         onClick={() => removeItem(item.id)}
                       >
                         Xóa
                       </Button>
                     ]}
                  >
                    <List.Item.Meta
                      avatar={
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={item.image} 
                          alt={item.title}
                          style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '4px' }}
                        />
                      }
                      title={
                        <div>
                          <Text strong>{item.title}</Text>
                          <Tag color={getTypeColor(item.type)} style={{ marginLeft: 8 }}>
                            {getTypeText(item.type)}
                          </Tag>
                        </div>
                      }
                      description={
                        <div style={{ marginTop: 8 }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text strong style={{ fontSize: '16px', color: '#1677ff' }}>
                              {formatPrice(item.price)}
                            </Text>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <Text delete style={{ marginLeft: 8, color: '#999' }}>
                                {formatPrice(item.originalPrice)}
                              </Text>
                            )}
                          </div>
                          <Space>
                            <Text>Số lượng:</Text>
                            <InputNumber
                              min={1}
                              max={10}
                              value={item.quantity}
                              onChange={(value) => updateQuantity(item.id, value || 1)}
                            />
                          </Space>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Tóm tắt đơn hàng">
              <div style={{ marginBottom: '16px' }}>
                <Row justify="space-between">
                  <Text>Tạm tính:</Text>
                  <Text>{formatPrice(subtotal)}</Text>
                </Row>
                {discount > 0 && (
                  <Row justify="space-between" style={{ marginTop: '8px' }}>
                    <Text type="secondary">Giảm giá:</Text>
                    <Text type="secondary" style={{ color: '#52c41a' }}>
                      -{formatPrice(discount)}
                    </Text>
                  </Row>
                )}
                <Divider />
                <Row justify="space-between">
                  <Text strong>Tổng cộng:</Text>
                  <Text strong style={{ fontSize: '18px', color: '#1677ff' }}>
                    {formatPrice(total)}
                  </Text>
                </Row>
              </div>

              <Button 
                type="primary" 
                size="large" 
                block
                style={{ marginBottom: '12px' }}
              >
                Thanh toán ngay
              </Button>

              <Button 
                size="large" 
                block
                onClick={() => router.push('/')}
              >
                Tiếp tục mua sắm
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
} 