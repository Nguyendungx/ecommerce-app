export interface Post {
  id: string;
  title: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Bí quyết tự học tiếng Anh giao tiếp hiệu quả',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    author: 'Nguyễn Thị Lan',
    date: '2024-06-01',
    excerpt: 'Chia sẻ phương pháp tự học tiếng Anh giao tiếp, luyện phản xạ và mở rộng vốn từ vựng.',
    content: 'Để tự học tiếng Anh giao tiếp hiệu quả, bạn nên luyện nghe nói hàng ngày, tham gia các câu lạc bộ tiếng Anh, sử dụng app học từ vựng và thực hành với người bản xứ...',
    tags: ['tiếng Anh', 'giao tiếp', 'tự học'],
  },
  {
    id: '2',
    title: 'Kinh nghiệm luyện thi IELTS đạt 7.0+',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    author: 'Trần Văn Bảo',
    date: '2024-05-20',
    excerpt: 'Các tips luyện thi IELTS, phân bổ thời gian, chiến lược làm bài và tài liệu nên học.',
    content: 'Để đạt điểm cao IELTS, bạn cần luyện đề thường xuyên, chú trọng kỹ năng nghe-nói, học từ vựng theo chủ đề và tham khảo các tài liệu uy tín...',
    tags: ['IELTS', 'luyện thi', 'kinh nghiệm'],
  },
  {
    id: '3',
    title: 'Học tiếng Nhật N5 từ con số 0',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    author: 'Lê Thị Mai',
    date: '2024-04-15',
    excerpt: 'Lộ trình học tiếng Nhật N5 cho người mới bắt đầu, tài liệu và mẹo ghi nhớ chữ cái.',
    content: 'Bắt đầu học tiếng Nhật N5, bạn nên học bảng chữ cái, luyện viết, nghe hội thoại cơ bản và sử dụng flashcard để ghi nhớ từ vựng...',
    tags: ['tiếng Nhật', 'N5', 'tự học'],
  },
];

export default mockPosts; 