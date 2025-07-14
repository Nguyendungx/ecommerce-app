/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, Tag, Button, Badge, Typography, Space, Rate, Divider } from 'antd';
import { FileTextOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Material } from '../api/mockMaterials';

const { Title, Text, Paragraph } = Typography;

type MaterialCardProps = {
  material: Material;
  onDownload: (material: Material) => void;
  formatPrice: (price: number) => string;
  getFormatColor: (format: string) => string;
  getFormatText: (format: string) => string;
};

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onDownload, formatPrice, getFormatColor, getFormatText }) => {
  return (
    <Card
      hoverable
      cover={
        <div className="relative">
          <img
            alt={material.title}
            src={material.image}
            className="h-52 w-full object-cover rounded-t-xl"
          />
          {material.isFree && (
            <Badge
              count="MIỄN PHÍ"
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                backgroundColor: '#52c41a'
              }}
            />
          )}
          {material.originalPrice && material.originalPrice > material.price && !material.isFree && (
            <Tag
              color="red"
              className="absolute top-2 right-2 text-xs"
            >
              -{Math.round(((material.originalPrice - material.price) / material.originalPrice) * 100)}%
            </Tag>
          )}
        </div>
      }
      actions={[
        <Button 
          key="download"
          type="primary" 
          icon={<DownloadOutlined />}
          size="large" 
          block
          onClick={() => onDownload(material)}
        >
          {material.isFree ? 'Tải xuống' : 'Mua ngay'}
        </Button>
      ]}
      className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer rounded-xl"
      styles={{ body: { padding: 20 } }}
    >
      <div className="flex flex-wrap gap-2 mb-2">
        <Tag color={getFormatColor(material.format)}>{getFormatText(material.format)}</Tag>
        <Tag color="blue">{material.category}</Tag>
      </div>
      <Title level={4} className="!my-2 !text-lg !font-semibold line-clamp-2">{material.title}</Title>
      <Text type="secondary" className="block mb-2">Tác giả: {material.author}</Text>
      <Space className="mb-2">
        <Rate disabled defaultValue={material.rating} style={{ fontSize: '14px' }} />
        <Text type="secondary">({material.rating})</Text>
      </Space>
      <div className="mb-2 flex flex-wrap gap-4">
        <Space>
          <FileTextOutlined />
          <Text type="secondary">{material.pages} trang</Text>
        </Space>
        <Space>
          <DownloadOutlined />
          <Text type="secondary">{material.downloads.toLocaleString()} lượt tải</Text>
        </Space>
        <Space>
          <EyeOutlined />
          <Text type="secondary">{material.views.toLocaleString()} lượt xem</Text>
        </Space>
      </div>
      <Paragraph 
        ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
        className="!mb-2 text-gray-700"
      >
        {material.description}
      </Paragraph>
      <Divider className="my-3" />
      <div className="flex justify-between items-center">
        <div>
          <Text strong className={material.isFree ? 'text-green-600 text-lg' : 'text-blue-600 text-lg'}>
            {formatPrice(material.price)}
          </Text>
          {material.originalPrice && material.originalPrice > material.price && !material.isFree && (
            <Text delete className="ml-2 text-gray-400">
              {formatPrice(material.originalPrice)}
            </Text>
          )}
        </div>
        <Text type="secondary" className="text-xs">
          {material.fileSize}
        </Text>
      </div>
    </Card>
  );
};

export default MaterialCard; 