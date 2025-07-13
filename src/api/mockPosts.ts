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
    title: 'Làm thế nào để học lập trình hiệu quả?',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    author: 'Nguyễn Văn A',
    date: '2024-06-01',
    excerpt: 'Bí quyết và phương pháp giúp bạn học lập trình nhanh và hiệu quả hơn.',
    content: 'Nội dung chi tiết về cách học lập trình hiệu quả, bao gồm việc đặt mục tiêu, luyện tập thực tế, tham gia cộng đồng, và sử dụng các tài nguyên học tập hiện đại...',
    tags: ['lập trình', 'học tập', 'kỹ năng'],
  },
  {
    id: '2',
    title: 'Top 5 ngôn ngữ lập trình nên học năm 2024',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    author: 'Trần Thị B',
    date: '2024-05-20',
    excerpt: 'Danh sách các ngôn ngữ lập trình phổ biến và tiềm năng cho năm 2024.',
    content: 'Bài viết phân tích xu hướng công nghệ và đề xuất các ngôn ngữ lập trình như Python, JavaScript, Go, Rust, TypeScript...',
    tags: ['ngôn ngữ lập trình', 'công nghệ', '2024'],
  },
  {
    id: '3',
    title: 'Hướng dẫn xây dựng dự án cá nhân với React',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    author: 'Lê Văn C',
    date: '2024-04-15',
    excerpt: 'Các bước cơ bản để bắt đầu và hoàn thiện một dự án cá nhân sử dụng React.',
    content: 'Từ việc lên ý tưởng, thiết kế UI, tổ chức code, đến deploy sản phẩm thực tế với React và các công cụ hiện đại...',
    tags: ['React', 'dự án', 'frontend'],
  },
];

export default mockPosts; 