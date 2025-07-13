 
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Typography, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import mockEvents, { Event } from '../../api/mockEvents';
import EventCard from '../../components/EventCard';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function EventsPage() {
  const [events] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = ['all', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'AI/ML', 'Web Development'];
  const types = ['all', 'online', 'offline', 'hybrid'];
  const statuses = ['all', 'upcoming', 'ongoing', 'completed', 'cancelled'];

  const filterEvents = useCallback(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory, selectedType, selectedStatus]);

  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'online': return 'green';
      case 'offline': return 'blue';
      case 'hybrid': return 'purple';
      default: return 'orange';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'online': return 'Trực tuyến';
      case 'offline': return 'Trực tiếp';
      case 'hybrid': return 'Kết hợp';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'blue';
      case 'ongoing': return 'green';
      case 'completed': return 'gray';
      case 'cancelled': return 'red';
      default: return 'orange';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Sắp diễn ra';
      case 'ongoing': return 'Đang diễn ra';
      case 'completed': return 'Đã kết thúc';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRegister = (event: Event) => {
    if (event.participants >= event.maxParticipants) {
      message.warning('Sự kiện đã đầy!');
      return;
    }
    
    if (event.isFree) {
      message.success('Đăng ký thành công!');
    } else {
      message.info('Vui lòng thanh toán để hoàn tất đăng ký');
    }
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px', color: '#1677ff' }}>
        Sự Kiện
      </Title>

      {/* Filters */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Search
              placeholder="Tìm kiếm sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Danh mục"
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: '100%' }}
              size="large"
            >
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category === 'all' ? 'Tất cả' : category}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Hình thức"
              value={selectedType}
              onChange={setSelectedType}
              style={{ width: '100%' }}
              size="large"
            >
              {types.map(type => (
                <Option key={type} value={type}>
                  {type === 'all' ? 'Tất cả' : getTypeText(type)}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Trạng thái"
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: '100%' }}
              size="large"
            >
              {statuses.map(status => (
                <Option key={status} value={status}>
                  {status === 'all' ? 'Tất cả' : getStatusText(status)}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong>
              Tìm thấy {filteredEvents.length} sự kiện
            </Text>
          </Col>
        </Row>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {filteredEvents.map(event => (
            <Col xs={24} sm={12} lg={8} key={event.id}>
              <EventCard
                event={event}
                onRegister={handleRegister}
                formatPrice={formatPrice}
                getTypeColor={getTypeColor}
                getTypeText={getTypeText}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
                formatDate={formatDate}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
} 