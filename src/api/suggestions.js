import { products } from "./products";

// API giả lập lấy gợi ý sản phẩm dựa trên userId và hành vi
export function fetchSuggestions(userId, viewed = [], favorites = []) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Giả lập lỗi ngẫu nhiên 20%
      if (Math.random() < 0.2) {
        reject(new Error("Không thể lấy gợi ý lúc này"));
        return;
      }
      // Gợi ý ưu tiên sản phẩm chưa xem/chưa thích
      const suggested = products.filter(
        (p) => !viewed.includes(p.id) && !favorites.includes(p.id)
      );
      // Nếu hết, trả về ngẫu nhiên
      if (suggested.length === 0) {
        resolve(products.slice(0, 3));
      } else {
        resolve(suggested.slice(0, 3));
      }
    }, 1000);
  });
} 