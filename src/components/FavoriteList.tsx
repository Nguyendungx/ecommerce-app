import React from 'react';
import ProductList from './ProductList';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDesc: string;
}

interface FavoriteListProps {
  products: Product[];
  favorites: number[];
  onViewDetail: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = (props) => {
  return (
    <ProductList {...props} />
  );
};

export default FavoriteList; 