/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, Tag, Badge, Button, Typography, Space, Divider, Rate } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Event } from '../api/mockEvents';

const { Title, Text, Paragraph } = Typography;

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  formatPrice: (price: number) => string;
  getTypeColor: (type: string) => string;
  getTypeText: (type: string) => string;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  formatDate: (dateString: string) => string;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onRegister,
  formatPrice,
  getTypeColor,
  getTypeText,
  getStatusColor,
  getStatusText,
  formatDate,
}) => {
  return (
    <Card
      hoverable
      cover={
        <div style={{ position: 'relative' }}>
          <img
            alt={event.title}
            src={event.image}
            style={{ height: 200, objectFit: 'cover' }}
          />
          {event.isFree && (
            <Badge
              count="MIỄN PHÍ"
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                backgroundColor: '#52c41a',
              }}
            />
          )}
          <Tag
            color={getStatusColor(event.status)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              fontSize: '12px',
            }}
          >
            {getStatusText(event.status)}
          </Tag>
        </div>
      }
      actions={[
        <Button
          key="register"
          type="primary"
          size="large"
          block
          disabled={
            event.participants >= event.maxParticipants ||
            event.status === 'completed' ||
            event.status === 'cancelled'
          }
          onClick={() => onRegister(event)}
        >
          {event.participants >= event.maxParticipants
            ? 'Đã đầy'
            : event.status === 'completed'
            ? 'Đã kết thúc'
            : event.status === 'cancelled'
            ? 'Đã hủy'
            : event.isFree
            ? 'Đăng ký miễn phí'
            : 'Đăng ký ngay'}
        </Button>,
      ]}
      style={{ height: '100%' }}
    >
      <div style={{ marginBottom: '12px' }}>
        <Tag color={getTypeColor(event.type)} style={{ marginBottom: '8px' }}>
          {getTypeText(event.type)}
        </Tag>
        <Tag color="blue">{event.category}</Tag>
      </div>

      <Title level={4} style={{ marginBottom: '8px', fontSize: '16px' }}>
        {event.title}
      </Title>

      <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
        Tổ chức: {event.organizer}
      </Text>

      <Space style={{ marginBottom: '12px' }}>
        <Rate disabled defaultValue={event.rating} style={{ fontSize: '14px' }} />
        <Text type="secondary">({event.rating})</Text>
      </Space>

      <div style={{ marginBottom: '12px' }}>
        <Space>
          <CalendarOutlined />
          <Text type="secondary">{formatDate(event.startDate)}</Text>
        </Space>
        <Space style={{ marginLeft: '16px' }}>
          <ClockCircleOutlined />
          <Text type="secondary">
            {event.startTime} - {event.endTime}
          </Text>
        </Space>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <Space>
          <EnvironmentOutlined />
          <Text type="secondary">{event.location}</Text>
        </Space>
        <Space style={{ marginLeft: '16px' }}>
          <UserOutlined />
          <Text type="secondary">
            {event.participants}/{event.maxParticipants} người
          </Text>
        </Space>
      </div>

      <Paragraph
        ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
        style={{ marginBottom: '12px', fontSize: '14px' }}
      >
        {event.description}
      </Paragraph>

      <Divider style={{ margin: '12px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text strong style={{ fontSize: '18px', color: event.isFree ? '#52c41a' : '#1677ff' }}>
            {formatPrice(event.price)}
          </Text>
          {event.originalPrice && event.originalPrice > event.price && !event.isFree && (
            <Text delete style={{ marginLeft: '8px', color: '#999' }}>
              {formatPrice(event.originalPrice)}
            </Text>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {event.participants >= event.maxParticipants
              ? 'Đã đầy'
              : `${event.maxParticipants - event.participants} chỗ trống`}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default EventCard; 