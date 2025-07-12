import { Card, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDesc: string;
  isFavorite: boolean;
  onViewDetail: () => void;
  onToggleFavorite: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  shortDesc,
  isFavorite,
  onViewDetail,
  onToggleFavorite,
}) => {
  return (
    <Card
      hoverable
      style={{
        width: 280,
        margin: 'auto',
        borderRadius: 18,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      styles={{ body: { padding: 18, minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}
      cover={
        <Image
          alt={name}
          src={image || "https://via.placeholder.com/280x180?text=No+Image"}
          width={280}
          height={180}
          style={{
            objectFit: 'cover',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            transition: 'transform 0.2s',
          }}
        />
      }
      actions={[
        <Button type="link" onClick={onViewDetail} key="detail" style={{ fontWeight: 600, color: '#1677ff' }}>Xem chi tiết</Button>,
        isFavorite ? (
          <HeartFilled style={{ color: '#f5222d', fontSize: 22, transition: 'color 0.2s' }} onClick={onToggleFavorite} key="favorite" />
        ) : (
          <HeartOutlined style={{ fontSize: 22, transition: 'color 0.2s' }} onClick={onToggleFavorite} key="favorite" />
        ),
      ]}
    >
      <Card.Meta
        title={<span style={{ fontWeight: 700, fontSize: 18 }}>{name}</span>}
        description={
          <>
            <div style={{ color: '#1677ff', fontWeight: 600, fontSize: 16, margin: '8px 0' }}>{price.toLocaleString()} đ</div>
            <div style={{ marginTop: 4, color: '#555', fontSize: 14 }}>{shortDesc}</div>
          </>
        }
      />
    </Card>
  );
};

export default ProductCard; 