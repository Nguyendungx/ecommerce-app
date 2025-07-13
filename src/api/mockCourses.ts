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
    title: "React.js Cơ bản đến Nâng cao",
    instructor: "Nguyễn Văn A",
    price: 1200000,
    originalPrice: 1500000,
    rating: 4.8,
    students: 1250,
    duration: "12 giờ",
    level: "beginner",
    category: "Frontend",
    image: "https://via.placeholder.com/300x200/1677ff/ffffff?text=React",
    description: "Khóa học React.js từ cơ bản đến nâng cao, bao gồm hooks, context, và state management."
  },
  {
    id: 2,
    title: "Node.js Backend Development",
    instructor: "Trần Thị B",
    price: 1800000,
    originalPrice: 2200000,
    rating: 4.9,
    students: 890,
    duration: "18 giờ",
    level: "intermediate",
    category: "Backend",
    image: "https://via.placeholder.com/300x200/52c41a/ffffff?text=Node.js",
    description: "Xây dựng API và backend services với Node.js, Express, và MongoDB."
  },
  {
    id: 3,
    title: "Python cho Data Science",
    instructor: "Lê Văn C",
    price: 2500000,
    originalPrice: 3000000,
    rating: 4.7,
    students: 2100,
    duration: "24 giờ",
    level: "advanced",
    category: "Data Science",
    image: "https://via.placeholder.com/300x200/fa8c16/ffffff?text=Python",
    description: "Phân tích dữ liệu và machine learning với Python, pandas, và scikit-learn."
  },
  {
    id: 4,
    title: "Vue.js Framework",
    instructor: "Phạm Thị D",
    price: 1400000,
    originalPrice: 1700000,
    rating: 4.6,
    students: 750,
    duration: "15 giờ",
    level: "intermediate",
    category: "Frontend",
    image: "https://via.placeholder.com/300x200/722ed1/ffffff?text=Vue.js",
    description: "Phát triển ứng dụng web với Vue.js 3 và Composition API."
  },
  {
    id: 5,
    title: "Docker và Kubernetes",
    instructor: "Hoàng Văn E",
    price: 2000000,
    originalPrice: 2500000,
    rating: 4.9,
    students: 650,
    duration: "20 giờ",
    level: "advanced",
    category: "DevOps",
    image: "https://via.placeholder.com/300x200/eb2f96/ffffff?text=Docker",
    description: "Containerization và orchestration với Docker và Kubernetes."
  },
  {
    id: 6,
    title: "Flutter Mobile Development",
    instructor: "Ngô Thị F",
    price: 1600000,
    originalPrice: 1900000,
    rating: 4.5,
    students: 980,
    duration: "16 giờ",
    level: "intermediate",
    category: "Mobile",
    image: "https://via.placeholder.com/300x200/13c2c2/ffffff?text=Flutter",
    description: "Phát triển ứng dụng mobile cross-platform với Flutter."
  }
];

export default mockCourses; 