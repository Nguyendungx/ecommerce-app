/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Typography, Tag, Button, Input, Select, Rate, Space, Divider } from 'antd';
import { SearchOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import mockCourses, { Course } from '../../api/mockCourses';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function CoursesPage() {
  const [courses] = useState<Course[]>(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = ['all', 'Frontend', 'Backend', 'Data Science', 'DevOps', 'Mobile'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const filterCourses = useCallback(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  useEffect(() => {
    filterCourses();
  }, [filterCourses]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'green';
      case 'intermediate': return 'orange';
      case 'advanced': return 'red';
      default: return 'blue';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Cơ bản';
      case 'intermediate': return 'Trung cấp';
      case 'advanced': return 'Nâng cao';
      default: return level;
    }
  };

  return (
    <div >
      <Title level={2} className="text-center mb-8 text-blue-600 font-bold text-3xl md:text-4xl">
        Các Khóa Học
      </Title>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div>
            <Search
              placeholder="Tìm kiếm khóa học..."
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
              placeholder="Cấp độ"
              value={selectedLevel}
              onChange={setSelectedLevel}
              className="w-full"
              size="large"
            >
              {levels.map(level => (
                <Option key={level} value={level}>
                  {level === 'all' ? 'Tất cả' : getLevelText(level)}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Text strong className="block text-right md:text-left">
              Tìm thấy {filteredCourses.length} khóa học
            </Text>
          </div>
        </div>
      </div>
      {/* Course Grid */}
      {loading ? (
        <div className="text-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card
              key={course.id}
              hoverable
              cover={
                <div className="relative">
                  <img
                    alt={course.title}
                    src={course.image}
                    className="h-52 w-full object-cover rounded-t-xl"
                  />
                  {course.originalPrice && course.originalPrice > course.price && (
                    <Tag
                      color="red"
                      className="absolute top-2 right-2 text-xs"
                    >
                      -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                    </Tag>
                  )}
                </div>
              }
              actions={[
                <Button key="register" type="primary" size="large" block>
                  Đăng ký ngay
                </Button>
              ]}
              className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer rounded-xl"
              bodyStyle={{ padding: 20 }}
            >
              <div className="flex flex-wrap gap-2 mb-2">
                <Tag color={getLevelColor(course.level)}>{getLevelText(course.level)}</Tag>
                <Tag color="blue">{course.category}</Tag>
              </div>
              <Title level={4} className="!my-2 !text-lg !font-semibold line-clamp-2">{course.title}</Title>
              <Text type="secondary" className="block mb-2">Giảng viên: {course.instructor}</Text>
              <Space className="mb-2">
                <Rate disabled defaultValue={course.rating} style={{ fontSize: '14px' }} />
                <Text type="secondary">({course.rating})</Text>
              </Space>
              <div className="mb-2 flex flex-wrap gap-4">
                <Space>
                  <ClockCircleOutlined />
                  <Text type="secondary">{course.duration}</Text>
                </Space>
                <Space>
                  <UserOutlined />
                  <Text type="secondary">{course.students.toLocaleString()} học viên</Text>
                </Space>
              </div>
              <Divider className="my-3" />
              <div className="flex justify-between items-center">
                <div>
                  <Text strong className="text-lg text-blue-600">
                    {formatPrice(course.price)}
                  </Text>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <Text delete className="ml-2 text-gray-400">
                      {formatPrice(course.originalPrice)}
                    </Text>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 