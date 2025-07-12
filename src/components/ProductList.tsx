import React from 'react';
import { Row, Col } from 'antd';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDesc: string;
}

interface ProductListProps {
  products: Product[];
  favorites: number[];
  onViewDetail: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, favorites, onViewDetail, onToggleFavorite }) => {
  return (
    <Row gutter={[32, 32]} justify="center" style={{ paddingBottom: 32 }}>
      {products.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} key={product.id} style={{ display: 'flex', justifyContent: 'center' }}>
          <ProductCard
            {...product}
            isFavorite={favorites.includes(product.id)}
            onViewDetail={() => onViewDetail(product.id)}
            onToggleFavorite={() => onToggleFavorite(product.id)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList; 