 
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Typography, Input, Select, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import mockMaterials, { Material } from '../../api/mockMaterials';
import MaterialCard from '@/components/MaterialCard';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function MaterialsPage() {
  const [materials] = useState<Material[]>(mockMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(mockMaterials);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const categories = ['all', 'Frontend', 'Backend', 'Data Science', 'DevOps', 'Mobile'];
  const formats = ['all', 'pdf', 'doc', 'ppt', 'video'];
  const priceFilters = ['all', 'free', 'paid'];

  const filterMaterials = useCallback(() => {
    let filtered = materials;
    if (searchTerm) {
      filtered = filtered.filter((material) =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((material) => material.category === selectedCategory);
    }
    if (selectedFormat !== 'all') {
      filtered = filtered.filter((material) => material.format === selectedFormat);
    }
    if (priceFilter !== 'all') {
      if (priceFilter === 'free') {
        filtered = filtered.filter((material) => material.isFree);
      } else if (priceFilter === 'paid') {
        filtered = filtered.filter((material) => !material.isFree);
      }
    }
    setFilteredMaterials(filtered);
  }, [materials, searchTerm, selectedCategory, selectedFormat, priceFilter]);

  useEffect(() => {
    filterMaterials();
  }, [filterMaterials]);

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'pdf': return 'red';
      case 'doc': return 'blue';
      case 'ppt': return 'orange';
      case 'video': return 'purple';
      default: return 'green';
    }
  };

  const getFormatText = (format: string) => {
    switch (format) {
      case 'pdf': return 'PDF';
      case 'doc': return 'DOC';
      case 'ppt': return 'PPT';
      case 'video': return 'VIDEO';
      default: return format.toUpperCase();
    }
  };

  const handleDownload = (material: Material) => {
    if (material.isFree) {
      message.success('Đang tải xuống tài liệu...');
    } else {
      message.info('Vui lòng mua tài liệu để tải xuống');
    }
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px', color: '#1677ff' }}>
        Tài Liệu Học Tập
      </Title>
      {/* Filters */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Search
              placeholder="Tìm kiếm tài liệu..."
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
              placeholder="Định dạng"
              value={selectedFormat}
              onChange={setSelectedFormat}
              style={{ width: '100%' }}
              size="large"
            >
              {formats.map(format => (
                <Option key={format} value={format}>
                  {format === 'all' ? 'Tất cả' : getFormatText(format)}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Giá"
              value={priceFilter}
              onChange={setPriceFilter}
              style={{ width: '100%' }}
              size="large"
            >
              {priceFilters.map(filter => (
                <Option key={filter} value={filter}>
                  {filter === 'all' ? 'Tất cả' : filter === 'free' ? 'Miễn phí' : 'Trả phí'}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong>
              Tìm thấy {filteredMaterials.length} tài liệu
            </Text>
          </Col>
        </Row>
      </div>
      {/* Materials Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {filteredMaterials.map(material => (
            <Col xs={24} sm={12} lg={8} key={material.id}>
              <MaterialCard
                material={material}
                onDownload={handleDownload}
                formatPrice={formatPrice}
                getFormatColor={getFormatColor}
                getFormatText={getFormatText}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
} 