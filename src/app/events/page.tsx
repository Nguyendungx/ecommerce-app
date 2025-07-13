"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Input, Select, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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

  // Đổi danh mục cho phù hợp chủ đề ngôn ngữ
  const categories = ['all', 'Tiếng Anh', 'IELTS', 'TOEIC', 'Tiếng Nhật', 'Tiếng Hàn', 'Tiếng Trung'];
  const types = ['all', 'online', 'offline'];
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
      default: return 'orange';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'online': return 'Trực tuyến';
      case 'offline': return 'Trực tiếp';
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
    <div >
      <Title level={2} className="text-center mb-8 font-extrabold tracking-wide text-blue-600 text-2xl md:text-4xl">
        Sự kiện ngôn ngữ & luyện thi
      </Title>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div>
            <Search
              placeholder="Tìm kiếm sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
              className="w-full"
            />
          </div>
          <div>
            <Select
              placeholder="Danh mục"
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-full"
              size="large"
            >
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category === 'all' ? 'Tất cả' : category}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              placeholder="Hình thức"
              value={selectedType}
              onChange={setSelectedType}
              className="w-full"
              size="large"
            >
              {types.map(type => (
                <Option key={type} value={type}>
                  {type === 'all' ? 'Tất cả' : getTypeText(type)}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              placeholder="Trạng thái"
              value={selectedStatus}
              onChange={setSelectedStatus}
              className="w-full"
              size="large"
            >
              {statuses.map(status => (
                <Option key={status} value={status}>
                  {status === 'all' ? 'Tất cả' : getStatusText(status)}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Text strong className="block text-right md:text-left">
              Tìm thấy {filteredEvents.length} sự kiện
            </Text>
          </div>
        </div>
      </div>
      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
              formatPrice={formatPrice}
              getTypeColor={getTypeColor}
              getTypeText={getTypeText}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
} 