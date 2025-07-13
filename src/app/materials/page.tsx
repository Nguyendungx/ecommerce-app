"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Input, Select, Spin, message } from 'antd';
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

  // Đổi danh mục cho phù hợp chủ đề ngôn ngữ
  const categories = ['all', 'Tiếng Anh', 'IELTS', 'TOEIC', 'Tiếng Nhật', 'Tiếng Hàn', 'Tiếng Trung'];
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
    <div>
      <Title level={2} className="text-center mb-8 font-extrabold tracking-wide text-blue-600 text-2xl md:text-4xl">
        Tài liệu học ngôn ngữ & luyện thi
      </Title>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div>
            <Search
              placeholder="Tìm kiếm tài liệu..."
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
              placeholder="Định dạng"
              value={selectedFormat}
              onChange={setSelectedFormat}
              className="w-full"
              size="large"
            >
              {formats.map(format => (
                <Option key={format} value={format}>
                  {format === 'all' ? 'Tất cả' : getFormatText(format)}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              placeholder="Giá"
              value={priceFilter}
              onChange={setPriceFilter}
              className="w-full"
              size="large"
            >
              {priceFilters.map(filter => (
                <Option key={filter} value={filter}>
                  {filter === 'all' ? 'Tất cả' : filter === 'free' ? 'Miễn phí' : 'Trả phí'}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Text strong className="block text-right md:text-left">
              Tìm thấy {filteredMaterials.length} tài liệu
            </Text>
          </div>
        </div>
      </div>
      {/* Materials Grid */}
      {loading ? (
        <div className="text-center py-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <MaterialCard
              key={material.id}
              material={material}
              onDownload={handleDownload}
              formatPrice={formatPrice}
              getFormatColor={getFormatColor}
              getFormatText={getFormatText}
            />
          ))}
        </div>
      )}
    </div>
  );
} 