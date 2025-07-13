export type Material = {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  downloads: number;
  views: number;
  pages: number;
  fileSize: string;
  format: 'pdf' | 'doc' | 'ppt' | 'video';
  category: string;
  image: string;
  description: string;
  isFree: boolean;
};

const mockMaterials: Material[] = [
  {
    id: 1,
    title: "Giáo trình tiếng Anh giao tiếp",
    author: "Nguyễn Thị Lan",
    price: 0,
    originalPrice: 300000,
    rating: 4.8,
    downloads: 3200,
    views: 15000,
    pages: 180,
    fileSize: "20MB",
    format: "pdf",
    category: "Tiếng Anh",
    image: "https://via.placeholder.com/300x200/1677ff/ffffff?text=English+Book",
    description: "Giáo trình tiếng Anh giao tiếp cơ bản đến nâng cao, phù hợp cho mọi đối tượng.",
    isFree: true
  },
  {
    id: 2,
    title: "Đề luyện thi IELTS 2024",
    author: "Trần Văn Bảo",
    price: 250000,
    originalPrice: 350000,
    rating: 4.9,
    downloads: 2100,
    views: 9000,
    pages: 220,
    fileSize: "28MB",
    format: "pdf",
    category: "IELTS",
    image: "https://via.placeholder.com/300x200/52c41a/ffffff?text=IELTS+Test",
    description: "Tổng hợp đề thi IELTS mới nhất, có đáp án và giải thích chi tiết.",
    isFree: false
  },
  {
    id: 3,
    title: "Sách ngữ pháp tiếng Nhật N5-N4",
    author: "Lê Thị Mai",
    price: 180000,
    originalPrice: 250000,
    rating: 4.7,
    downloads: 1700,
    views: 8000,
    pages: 160,
    fileSize: "18MB",
    format: "pdf",
    category: "Tiếng Nhật",
    image: "https://via.placeholder.com/300x200/fa8c16/ffffff?text=Japanese+Grammar",
    description: "Sách tổng hợp ngữ pháp, bài tập và ví dụ minh hoạ cho kỳ thi JLPT N5-N4.",
    isFree: false
  },
  {
    id: 4,
    title: "Tài liệu luyện thi TOEIC 700+",
    author: "Phạm Quốc Hùng",
    price: 0,
    originalPrice: 200000,
    rating: 4.6,
    downloads: 2500,
    views: 11000,
    pages: 140,
    fileSize: "15MB",
    format: "pdf",
    category: "TOEIC",
    image: "https://via.placeholder.com/300x200/722ed1/ffffff?text=TOEIC+Practice",
    description: "Tài liệu luyện thi TOEIC, mẹo làm bài và đề thi thử cập nhật mới nhất.",
    isFree: true
  },
  {
    id: 5,
    title: "Sách luyện nghe tiếng Hàn sơ cấp",
    author: "Kim Ji Soo",
    price: 120000,
    originalPrice: 180000,
    rating: 4.9,
    downloads: 900,
    views: 4000,
    pages: 100,
    fileSize: "12MB",
    format: "pdf",
    category: "Tiếng Hàn",
    image: "https://via.placeholder.com/300x200/eb2f96/ffffff?text=Korean+Listening",
    description: "Sách luyện nghe tiếng Hàn sơ cấp, bài tập thực hành và file audio kèm theo.",
    isFree: false
  },
  {
    id: 6,
    title: "Giáo trình tiếng Trung thương mại",
    author: "Trương Minh Châu",
    price: 0,
    originalPrice: 250000,
    rating: 4.5,
    downloads: 1200,
    views: 5200,
    pages: 130,
    fileSize: "16MB",
    format: "pdf",
    category: "Tiếng Trung",
    image: "https://via.placeholder.com/300x200/13c2c2/ffffff?text=Chinese+Book",
    description: "Giáo trình tiếng Trung ứng dụng trong kinh doanh, hội thoại thương mại thực tế.",
    isFree: true
  }
];

export default mockMaterials; 