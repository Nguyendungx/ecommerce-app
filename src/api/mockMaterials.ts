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
    image: "https://benative.vn/wp-content/uploads/2019/02/giao-trinh-hoc-tieng-anh-giao-tiep-co-ban-2.png",
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
    image: "https://onthiielts.com.vn/wp-content/uploads/2019/09/bo-de-ielts-768x432.jpg",
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
    image: "https://product.hstatic.net/1000075554/product/-n4-ngu-phap-va-doc-hieu-so-cap-in0qs_81c46e3d672d4f3d85a85d2422184a67_aa69d0040b414cfab9d61ab45a76ece3_master.gif",
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
    image: "https://edulife.com.vn/wp-content/uploads/2021/12/New-TOEIC-700.jpg",
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
    image: "https://i.ytimg.com/vi/Bj6FA6wEKO4/maxresdefault.jpg",
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
    image: "https://tiengtrungthuonghai.vn/wp-content/uploads/2023/01/sach-tieng-trung-thuong-mai.jpg",
    description: "Giáo trình tiếng Trung ứng dụng trong kinh doanh, hội thoại thương mại thực tế.",
    isFree: true
  }
];

export default mockMaterials; 