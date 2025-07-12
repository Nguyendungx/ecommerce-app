import React from 'react';
import { List, Avatar, Typography } from 'antd';

interface Product {
  id: number;
  name: string;
  image: string;
}

interface ViewedHistoryProps {
  products: Product[];
  onViewDetail: (id: number) => void;
}

const ViewedHistory: React.FC<ViewedHistoryProps> = ({ products, onViewDetail }) => {
  if (!products.length) return null;
  return (
    <div style={{ marginTop: 32 }}>
      <Typography.Title level={5}>Lịch sử xem gần đây</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={products}
        renderItem={item => (
          <List.Item onClick={() => onViewDetail(item.id)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={item.name}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ViewedHistory; 