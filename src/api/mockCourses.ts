export type Course = {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  image: string;
  description: string;
};

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Tiếng Anh giao tiếp cho người mới bắt đầu",
    instructor: "Nguyễn Thị Lan",
    price: 900000,
    originalPrice: 1200000,
    rating: 4.8,
    students: 1500,
    duration: "30 giờ",
    level: "beginner",
    category: "Tiếng Anh",
    image: "https://via.placeholder.com/300x200/1677ff/ffffff?text=English+Beginner",
    description: "Khoá học giúp bạn tự tin giao tiếp tiếng Anh trong cuộc sống hàng ngày với giáo viên bản ngữ và giáo trình hiện đại."
  },
  {
    id: 2,
    title: "Luyện thi IELTS 6.5+",
    instructor: "Trần Văn Bảo",
    price: 1800000,
    originalPrice: 2200000,
    rating: 4.9,
    students: 980,
    duration: "40 giờ",
    level: "intermediate",
    category: "IELTS",
    image: "https://via.placeholder.com/300x200/52c41a/ffffff?text=IELTS+6.5+",
    description: "Chiến lược làm bài, luyện kỹ năng nghe, nói, đọc, viết và giải đề thi IELTS thực tế."
  },
  {
    id: 3,
    title: "Tiếng Nhật sơ cấp N5",
    instructor: "Lê Thị Mai",
    price: 1200000,
    originalPrice: 1500000,
    rating: 4.7,
    students: 800,
    duration: "35 giờ",
    level: "beginner",
    category: "Tiếng Nhật",
    image: "https://via.placeholder.com/300x200/fa8c16/ffffff?text=Japanese+N5",
    description: "Học bảng chữ cái, ngữ pháp, từ vựng và giao tiếp cơ bản tiếng Nhật cho người mới bắt đầu."
  },
  {
    id: 4,
    title: "Luyện thi TOEIC 700+",
    instructor: "Phạm Quốc Hùng",
    price: 1500000,
    originalPrice: 1800000,
    rating: 4.6,
    students: 1100,
    duration: "28 giờ",
    level: "intermediate",
    category: "TOEIC",
    image: "https://via.placeholder.com/300x200/722ed1/ffffff?text=TOEIC+700+",
    description: "Khoá luyện thi TOEIC với giáo viên giàu kinh nghiệm, luyện đề và mẹo đạt điểm cao."
  },
  {
    id: 5,
    title: "Tiếng Hàn giao tiếp",
    instructor: "Kim Ji Soo",
    price: 1300000,
    originalPrice: 1600000,
    rating: 4.9,
    students: 600,
    duration: "32 giờ",
    level: "beginner",
    category: "Tiếng Hàn",
    image: "https://via.placeholder.com/300x200/eb2f96/ffffff?text=Korean+Beginner",
    description: "Khoá học tiếng Hàn giao tiếp cơ bản, luyện phát âm, hội thoại thực tế với giáo viên bản xứ."
  },
  {
    id: 6,
    title: "Tiếng Trung thương mại",
    instructor: "Trương Minh Châu",
    price: 1700000,
    originalPrice: 2000000,
    rating: 4.5,
    students: 720,
    duration: "36 giờ",
    level: "advanced",
    category: "Tiếng Trung",
    image: "https://via.placeholder.com/300x200/13c2c2/ffffff?text=Chinese+Business",
    description: "Tiếng Trung ứng dụng trong kinh doanh, thương mại, đàm phán và giao tiếp công sở."
  }
];

export default mockCourses; 