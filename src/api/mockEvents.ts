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
    title: "Workshop tiếng Anh giao tiếp thực tế",
    organizer: "English Speaking Club",
    price: 0,
    originalPrice: 200000,
    rating: 4.8,
    participants: 80,
    maxParticipants: 100,
    startDate: "2024-07-10",
    endDate: "2024-07-10",
    startTime: "18:00",
    endTime: "20:00",
    location: "Hà Nội",
    type: "offline",
    category: "Tiếng Anh",
    image: "https://via.placeholder.com/300x200/1677ff/ffffff?text=English+Workshop",
    description: "Thực hành giao tiếp tiếng Anh với người bản xứ, nâng cao phản xạ và kỹ năng nghe nói.",
    isFree: true,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Webinar: Bí quyết đạt IELTS 7.0+",
    organizer: "IELTS Master Vietnam",
    price: 150000,
    originalPrice: 250000,
    rating: 4.9,
    participants: 120,
    maxParticipants: 200,
    startDate: "2024-07-15",
    endDate: "2024-07-15",
    startTime: "20:00",
    endTime: "21:30",
    location: "Online",
    type: "online",
    category: "IELTS",
    image: "https://via.placeholder.com/300x200/52c41a/ffffff?text=IELTS+Webinar",
    description: "Chia sẻ kinh nghiệm luyện thi IELTS, chiến lược làm bài và giải đáp thắc mắc cùng chuyên gia.",
    isFree: false,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Thi thử JLPT N5 miễn phí",
    organizer: "Japanese Language Center",
    price: 0,
    originalPrice: 0,
    rating: 4.7,
    participants: 60,
    maxParticipants: 100,
    startDate: "2024-07-20",
    endDate: "2024-07-20",
    startTime: "08:00",
    endTime: "11:00",
    location: "TP.HCM",
    type: "offline",
    category: "Tiếng Nhật",
    image: "https://via.placeholder.com/300x200/fa8c16/ffffff?text=JLPT+Test",
    description: "Cơ hội kiểm tra trình độ tiếng Nhật, làm quen với đề thi JLPT thực tế.",
    isFree: true,
    status: "upcoming"
  },
  {
    id: 4,
    title: "Hội thảo tiếng Hàn giao tiếp công sở",
    organizer: "Korean Language Institute",
    price: 100000,
    originalPrice: 200000,
    rating: 4.6,
    participants: 40,
    maxParticipants: 60,
    startDate: "2024-07-25",
    endDate: "2024-07-25",
    startTime: "18:30",
    endTime: "20:30",
    location: "Đà Nẵng",
    type: "offline",
    category: "Tiếng Hàn",
    image: "https://via.placeholder.com/300x200/eb2f96/ffffff?text=Korean+Seminar",
    description: "Hội thảo chia sẻ kỹ năng giao tiếp tiếng Hàn trong môi trường công sở, thực hành hội thoại.",
    isFree: false,
    status: "upcoming"
  },
  {
    id: 5,
    title: "Online Meetup: Tiếng Trung cho người đi làm",
    organizer: "Chinese Language Club",
    price: 0,
    originalPrice: 0,
    rating: 4.5,
    participants: 90,
    maxParticipants: 120,
    startDate: "2024-07-30",
    endDate: "2024-07-30",
    startTime: "19:00",
    endTime: "21:00",
    location: "Online",
    type: "online",
    category: "Tiếng Trung",
    image: "https://via.placeholder.com/300x200/13c2c2/ffffff?text=Chinese+Meetup",
    description: "Giao lưu, luyện nói tiếng Trung với chủ đề công việc, kinh doanh, thực hành hội thoại nhóm.",
    isFree: true,
    status: "upcoming"
  }
];

export default mockEvents; 