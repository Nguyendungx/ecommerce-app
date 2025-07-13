"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../api/products";
import { fetchSuggestions } from "../api/suggestions";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import PriceFilter, { PriceRange } from "../components/PriceFilter";
import SuggestionButton from "../components/SuggestionButton";
import ProductDetailModal from "../components/ProductDetailModal";
import ViewedHistory from "../components/ViewedHistory";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Spin, Typography, message, Row, Col, Divider, Button } from "antd";
import { HeartFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import '@ant-design/v5-patch-for-react-19';
import ChatbotAI from '../components/ChatbotAI';
import { MessageOutlined } from '@ant-design/icons';
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

function filterByPrice(products: Product[], priceRange: PriceRange): Product[] {
  switch (priceRange) {
    case '<500k':
      return products.filter((p) => p.price < 500000);
    case '500k-1m':
      return products.filter((p) => p.price >= 500000 && p.price <= 1000000);
    case '>1m':
      return products.filter((p) => p.price > 1000000);
    default:
      return products;
  }
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewed, setViewed] = useState<number[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const router = useRouter();
  const [showChatbot, setShowChatbot] = useState(false);

  // Lấy sản phẩm
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data: Product[]) => setProducts(data))
      .catch(() => message.error("Không thể tải sản phẩm"))
      .finally(() => setLoading(false));
  }, []);

  // Đọc danh sách yêu thích từ localStorage khi load trang
  useEffect(() => {
    const fav = localStorage.getItem("favorites");
    if (fav) setFavorites(JSON.parse(fav));
  }, []);
  // Lưu lại favorites vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Lưu lịch sử xem vào localStorage
  useEffect(() => {
    if (viewed.length) localStorage.setItem("viewed", JSON.stringify(viewed));
  }, [viewed]);
  useEffect(() => {
    const v = localStorage.getItem("viewed");
    if (v) setViewed(JSON.parse(v));
  }, []);

  // Lọc sản phẩm
  const filteredProducts: Product[] = filterByPrice(
    products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    priceRange
  );

  // Xem chi tiết
  const handleViewDetail = useCallback((id: number) => {
    const prod = products.find((p) => p.id === id) || null;
    setSelectedProduct(prod);
    setModalOpen(true);
    setViewed((prev) => prev.includes(id) ? prev : [id, ...prev].slice(0, 5));
  }, [products]);

  // Đóng modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  // Yêu thích
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

  // Gợi ý AI
  const handleSuggest = () => {
    setSuggestLoading(true);
    setShowSuggestion(true);
    fetchSuggestions("user1", viewed, favorites)
      .then((data: Product[]) => setSuggested(data))
      .catch(() => message.error("Không thể lấy gợi ý lúc này"))
      .finally(() => setSuggestLoading(false));
  };

  // Sản phẩm đã xem
  const viewedProducts: Product[] = viewed
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: 32, background: '#f5f5f5', minHeight: '100vh', fontFamily: 'Inter, Roboto, Arial, sans-serif', position: 'relative' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 18, boxShadow: '0 2px 24px 0 rgba(0,0,0,0.06)', marginBottom: 24 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 32, fontWeight: 800, letterSpacing: 1, color: '#1677ff' }}>
          Sàn giáo dục thương mại điện tử
        </Title>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={16} md={12}>
          <SearchBar value={search} onChange={setSearch} />
          <PriceFilter value={priceRange} onChange={setPriceRange} />
        </Col>
        <Col xs={24} sm={8} md={12} style={{ textAlign: 'right', marginTop: 12 }}>
          <SuggestionButton loading={suggestLoading} onClick={handleSuggest} />
          <Button
            type="default"
            icon={<HeartFilled style={{ color: '#f5222d' }} />}
            size="large"
            style={{ marginLeft: 16 }}
            onClick={() => router.push(`/favorites?favs=${encodeURIComponent(JSON.stringify(favorites))}`)}
          >
            Sản phẩm yêu thích
          </Button>
        </Col>
      </Row>
      <Divider />
      {showSuggestion ? (
        suggestLoading ? (
          <LoadingSkeleton />
        ) : (
          <ProductList
            products={suggested}
            favorites={favorites}
            onViewDetail={handleViewDetail}
            onToggleFavorite={handleToggleFavorite}
          />
        )
      ) : loading ? (
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <Spin size="large" />
        </div>
      ) : (
        <ProductList
          products={filteredProducts}
          favorites={favorites}
          onViewDetail={handleViewDetail}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      <ProductDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        product={selectedProduct ?? undefined}
      />
      <ViewedHistory products={viewedProducts} onViewDetail={handleViewDetail} />
      {/* Nút mở/đóng chatbot */}
      <button
        onClick={() => setShowChatbot((v) => !v)}
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          zIndex: 1100,
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: '#1677ff',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 16px 0 rgba(22,119,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          cursor: 'pointer',
        }}
        aria-label={showChatbot ? 'Đóng chatbot' : 'Mở chatbot'}
      >
        <MessageOutlined />
      </button>
      {showChatbot && <ChatbotAI />}
      </div>
    </div>
  );
}
