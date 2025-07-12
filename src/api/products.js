// Mock data sản phẩm giáo dục
export const products = [
  {
    id: 1,
    name: "Lớp tiếng Anh giao tiếp",
    price: 450000,
    image: "/ielts.png",
    shortDesc: "Khoá học tiếng Anh giao tiếp với giáo viên bản xứ.",
    longDesc: "Khoá học giúp bạn nâng cao kỹ năng giao tiếp tiếng Anh với giáo viên bản xứ, lộ trình bài bản, tài liệu chuẩn quốc tế.",
    rating: 4.8
  },
  {
    id: 2,
    name: "Giáo trình luyện thi IELTS",
    price: 900000,
    image: "/ielts.png",
    shortDesc: "Giáo trình luyện thi IELTS từ cơ bản đến nâng cao.",
    longDesc: "Bộ giáo trình luyện thi IELTS đầy đủ kỹ năng, phù hợp cho mọi trình độ, cập nhật đề thi mới nhất.",
    rating: 4.6
  },
  {
    id: 3,
    name: "Khoá học lập trình Python",
    price: 1200000,
    image: "/ielts.png",
    shortDesc: "Khoá học Python cho người mới bắt đầu.",
    longDesc: "Học lập trình Python từ cơ bản đến ứng dụng thực tế, dự án cuối khoá hấp dẫn.",
    rating: 4.9
  },
  {
    id: 4,
    name: "Tài liệu tự học TOEIC",
    price: 300000,
    image: "/ielts.png",
    shortDesc: "Tài liệu luyện thi TOEIC tự học tại nhà.",
    longDesc: "Tổng hợp tài liệu TOEIC chất lượng, phù hợp cho người bận rộn, dễ dàng tự học và kiểm tra tiến độ.",
    rating: 4.3
  },
  {
    id: 5,
    name: "Lớp học tiếng Nhật N5",
    price: 800000,
    image: "/ielts.png",
    shortDesc: "Khoá học tiếng Nhật sơ cấp N5.",
    longDesc: "Khoá học tiếng Nhật N5 với giáo viên kinh nghiệm, giáo trình chuẩn JLPT, hỗ trợ luyện thi.",
    rating: 4.7
  }
];

// API giả lập lấy danh sách sản phẩm
export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
} 