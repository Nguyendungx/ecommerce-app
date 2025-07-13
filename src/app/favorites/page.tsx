"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../api/products";
import ProductList from "../../components/ProductList";
import { Typography, message } from "antd";
import { useSearchParams } from "next/navigation";
import ProductDetailModal from "../../components/ProductDetailModal";

const { Title } = Typography;

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDesc: string;
  longDesc?: string;
  rating?: number;
};

export default function FavoritesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProducts()
      .then((data: Product[]) => setProducts(data))
      .catch(() => message.error("Không thể tải sản phẩm"));
    // Lấy danh sách yêu thích từ query string nếu có, ưu tiên hơn localStorage
    const favsQuery = searchParams.get("favs");
    if (favsQuery) {
      try {
        setFavorites(JSON.parse(favsQuery));
        return;
      } catch {}
    }
    // Nếu không có query, lấy từ localStorage
    const fav = localStorage.getItem("favorites");
    if (fav) setFavorites(JSON.parse(fav));
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleViewDetail = (id: number) => {
    const prod = products.find((p) => p.id === id) || null;
    setSelectedProduct(prod);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
    message.success(
      favorites.includes(id)
        ? "Đã bỏ khỏi yêu thích"
        : "Đã thêm vào yêu thích"
    );
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 32, fontWeight: 800 }}>
        Sản phẩm yêu thích
      </Title>
      <ProductList
        products={favoriteProducts}
        favorites={favorites}
        onViewDetail={handleViewDetail}
        onToggleFavorite={handleToggleFavorite}
      />
      <ProductDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        product={selectedProduct ?? undefined}
      />
      {favoriteProducts.length === 0 && (
        <div style={{ textAlign: "center", color: '#888', marginTop: 40 }}>
          Bạn chưa có sản phẩm yêu thích nào.
        </div>
      )}
    </div>
  );
} 