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
    title: "Hướng dẫn React.js từ A-Z",
    author: "Nguyễn Văn A",
    price: 0,
    originalPrice: 500000,
    rating: 4.8,
    downloads: 2500,
    views: 12000,
    pages: 150,
    fileSize: "15MB",
    format: "pdf",
    category: "Frontend",
    image: "https://via.placeholder.com/300x200/1677ff/ffffff?text=React+Guide",
    description: "Tài liệu hướng dẫn chi tiết về React.js từ cơ bản đến nâng cao.",
    isFree: true
  },
  {
    id: 2,
    title: "Node.js API Development",
    author: "Trần Thị B",
    price: 300000,
    originalPrice: 400000,
    rating: 4.9,
    downloads: 1800,
    views: 8500,
    pages: 200,
    fileSize: "25MB",
    format: "pdf",
    category: "Backend",
    image: "https://via.placeholder.com/300x200/52c41a/ffffff?text=Node.js+API",
    description: "Hướng dẫn xây dựng RESTful API với Node.js và Express.",
    isFree: false
  },
  {
    id: 3,
    title: "Python Data Analysis",
    author: "Lê Văn C",
    price: 450000,
    originalPrice: 600000,
    rating: 4.7,
    downloads: 3200,
    views: 15000,
    pages: 180,
    fileSize: "30MB",
    format: "pdf",
    category: "Data Science",
    image: "https://via.placeholder.com/300x200/fa8c16/ffffff?text=Python+Data",
    description: "Tài liệu phân tích dữ liệu với Python, pandas và matplotlib.",
    isFree: false
  },
  {
    id: 4,
    title: "Vue.js 3 Tutorial",
    author: "Phạm Thị D",
    price: 0,
    originalPrice: 350000,
    rating: 4.6,
    downloads: 1200,
    views: 6800,
    pages: 120,
    fileSize: "18MB",
    format: "pdf",
    category: "Frontend",
    image: "https://via.placeholder.com/300x200/722ed1/ffffff?text=Vue.js+3",
    description: "Hướng dẫn Vue.js 3 với Composition API và TypeScript.",
    isFree: true
  },
  {
    id: 5,
    title: "Docker Best Practices",
    author: "Hoàng Văn E",
    price: 550000,
    originalPrice: 700000,
    rating: 4.9,
    downloads: 950,
    views: 4200,
    pages: 160,
    fileSize: "22MB",
    format: "pdf",
    category: "DevOps",
    image: "https://via.placeholder.com/300x200/eb2f96/ffffff?text=Docker",
    description: "Best practices và tips cho Docker containerization.",
    isFree: false
  },
  {
    id: 6,
    title: "Flutter UI Design",
    author: "Ngô Thị F",
    price: 0,
    originalPrice: 400000,
    rating: 4.5,
    downloads: 2100,
    views: 9800,
    pages: 140,
    fileSize: "20MB",
    format: "pdf",
    category: "Mobile",
    image: "https://via.placeholder.com/300x200/13c2c2/ffffff?text=Flutter+UI",
    description: "Thiết kế UI/UX cho ứng dụng Flutter.",
    isFree: true
  },
  {
    id: 7,
    title: "JavaScript ES6+ Features",
    author: "Vũ Văn G",
    price: 250000,
    originalPrice: 300000,
    rating: 4.8,
    downloads: 3800,
    views: 16500,
    pages: 100,
    fileSize: "12MB",
    format: "pdf",
    category: "Frontend",
    image: "https://via.placeholder.com/300x200/faad14/ffffff?text=ES6+",
    description: "Tìm hiểu các tính năng mới của JavaScript ES6+.",
    isFree: false
  },
  {
    id: 8,
    title: "Machine Learning Basics",
    author: "Đỗ Thị H",
    price: 600000,
    originalPrice: 800000,
    rating: 4.9,
    downloads: 1500,
    views: 7200,
    pages: 250,
    fileSize: "35MB",
    format: "pdf",
    category: "Data Science",
    image: "https://via.placeholder.com/300x200/eb2f96/ffffff?text=ML+Basics",
    description: "Cơ bản về Machine Learning và các thuật toán phổ biến.",
    isFree: false
  }
];

export default mockMaterials; 