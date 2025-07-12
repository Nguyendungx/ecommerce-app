import React from 'react';
import { Modal, Image, Typography, Rate } from 'antd';

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  product?: {
    name: string;
    price: number;
    image: string;
    longDesc?: string;
    rating?: number;
  };
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, onClose, product }) => {
  if (!product) return null;
  return (
    <Modal open={open} onCancel={onClose} footer={null} title={product.name} centered>
      <Image src={product.image} alt={product.name} width={400} style={{ marginBottom: 16 }} />
      <Typography.Title level={4} style={{ color: '#1677ff' }}>
        {product.price.toLocaleString()} đ
      </Typography.Title>
      <Rate allowHalf disabled value={product.rating} style={{ marginBottom: 12 }} />
      <Typography.Paragraph style={{ marginTop: 16 }}>{product.longDesc}</Typography.Paragraph>
    </Modal>
  );
};

export default ProductDetailModal; 