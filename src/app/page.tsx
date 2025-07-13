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
import { Spin, Typography, Divider, Button, message } from "antd";
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
    <div className="max-w-7xl mx-auto px-4  bg--50 min-h-screen font-sans relative">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg mb-8">
        <Title level={2} className="text-center mb-8 font-extrabold tracking-wide text-green-600 text-2xl md:text-4xl">
          Sàn thương mại các khoá học & tài liệu ngôn ngữ
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
          <div className="md:col-span-2">
            <SearchBar value={search} onChange={setSearch} />
            <PriceFilter value={priceRange} onChange={setPriceRange} />
          </div>
          <div className="flex flex-col md:flex-row md:justify-end gap-2 md:gap-0 md:items-center mt-2 md:mt-0">
            <SuggestionButton loading={suggestLoading} onClick={handleSuggest} />
            <Button
              type="default"
              icon={<HeartFilled style={{ color: '#f5222d' }} />}
              size="large"
              className="md:ml-4"
              onClick={() => router.push(`/favorites?favs=${encodeURIComponent(JSON.stringify(favorites))}`)}
            >
              Sản phẩm yêu thích
            </Button>
          </div>
        </div>
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
          <div className="text-center py-20">
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
          className="fixed bottom-3 right-3 z-[1100] w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center text-2xl cursor-pointer"
          aria-label={showChatbot ? 'Đóng chatbot' : 'Mở chatbot'}
        >
          <MessageOutlined />
        </button>
        {showChatbot && <ChatbotAI />}
      </div>
    </div>
  );
}
