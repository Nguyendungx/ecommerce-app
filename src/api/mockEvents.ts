export type Event = {
  id: number;
  title: string;
  organizer: string;
  price: number;
  originalPrice?: number;
  rating: number;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'online' | 'offline' | 'hybrid';
  category: string;
  image: string;
  description: string;
  isFree: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
};

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Workshop React.js 2024",
    organizer: "Tech Community Vietnam",
    price: 0,
    originalPrice: 500000,
    rating: 4.8,
    participants: 120,
    maxParticipants: 150,
    startDate: "2024-03-15",
    endDate: "2024-03-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "Hà Nội",
    type: "offline",
    category: "Frontend",
    image: "https://via.placeholder.com/300x200/1677ff/ffffff?text=React+Workshop",
    description: "Workshop thực hành React.js với các chuyên gia trong ngành.",
    isFree: true,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Webinar: AI trong giáo dục",
    organizer: "AI Education Hub",
    price: 200000,
    originalPrice: 300000,
    rating: 4.9,
    participants: 85,
    maxParticipants: 100,
    startDate: "2024-03-20",
    endDate: "2024-03-20",
    startTime: "19:00",
    endTime: "21:00",
    location: "Online",
    type: "online",
    category: "AI/ML",
    image: "https://via.placeholder.com/300x200/52c41a/ffffff?text=AI+Education",
    description: "Tìm hiểu về ứng dụng AI trong lĩnh vực giáo dục hiện đại.",
    isFree: false,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Hackathon Mobile App 2024",
    organizer: "Mobile Developers Club",
    price: 0,
    originalPrice: 0,
    rating: 4.7,
    participants: 200,
    maxParticipants: 300,
    startDate: "2024-03-25",
    endDate: "2024-03-27",
    startTime: "08:00",
    endTime: "18:00",
    location: "TP.HCM",
    type: "offline",
    category: "Mobile",
    image: "https://via.placeholder.com/300x200/fa8c16/ffffff?text=Hackathon",
    description: "Cuộc thi phát triển ứng dụng mobile trong 48 giờ.",
    isFree: true,
    status: "upcoming"
  },
  {
    id: 4,
    title: "Conference: Future of Web Development",
    organizer: "Web Dev Summit",
    price: 1500000,
    originalPrice: 2000000,
    rating: 4.6,
    participants: 45,
    maxParticipants: 80,
    startDate: "2024-04-05",
    endDate: "2024-04-06",
    startTime: "09:00",
    endTime: "18:00",
    location: "Đà Nẵng",
    type: "hybrid",
    category: "Web Development",
    image: "https://via.placeholder.com/300x200/722ed1/ffffff?text=Web+Dev+Conf",
    description: "Hội nghị về tương lai của phát triển web với các công nghệ mới nhất.",
    isFree: false,
    status: "upcoming"
  },
  {
    id: 5,
    title: "Training: DevOps với Docker",
    organizer: "DevOps Vietnam",
    price: 800000,
    originalPrice: 1000000,
    rating: 4.9,
    participants: 30,
    maxParticipants: 40,
    startDate: "2024-03-10",
    endDate: "2024-03-12",
    startTime: "09:00",
    endTime: "17:00",
    location: "Hà Nội",
    type: "offline",
    category: "DevOps",
    image: "https://via.placeholder.com/300x200/eb2f96/ffffff?text=Docker+Training",
    description: "Khóa đào tạo thực hành DevOps với Docker và Kubernetes.",
    isFree: false,
    status: "ongoing"
  },
  {
    id: 6,
    title: "Meetup: Vue.js Community",
    organizer: "Vue.js Vietnam",
    price: 0,
    originalPrice: 0,
    rating: 4.5,
    participants: 60,
    maxParticipants: 80,
    startDate: "2024-03-08",
    endDate: "2024-03-08",
    startTime: "18:30",
    endTime: "21:00",
    location: "TP.HCM",
    type: "offline",
    category: "Frontend",
    image: "https://via.placeholder.com/300x200/13c2c2/ffffff?text=Vue+Meetup",
    description: "Gặp gỡ cộng đồng Vue.js và chia sẻ kinh nghiệm.",
    isFree: true,
    status: "completed"
  }
];

export default mockEvents; 