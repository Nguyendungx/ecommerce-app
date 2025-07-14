# EduStore - Sàn thương mại các khoá học & tài liệu ngôn ngữ

[![Vercel Deploy](https://vercel.com/button)](https://ecommerce-app-git-master-nguyen-hung-dungs-projects.vercel.app/)

**EduStore** là nền tảng thương mại điện tử cho các khoá học, tài liệu, sự kiện và bài viết về giáo dục/ngôn ngữ. Ứng dụng được xây dựng với Next.js 15, TypeScript, Ant Design, Tailwind CSS và triển khai trên Vercel.

## 🚀 Demo

Truy cập bản demo online tại:  
👉 [https://ecommerce-app-git-master-nguyen-hung-dungs-projects.vercel.app/](https://ecommerce-app-git-master-nguyen-hung-dungs-projects.vercel.app/)

---

## 🛠️ Công nghệ sử dụng

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design v5](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- [Vercel](https://vercel.com/) (deploy & hosting)
- [Jest, React Testing Library] 

---

## ⚡️ Tính năng nổi bật

- Danh sách khoá học, tài liệu, sự kiện, bài viết
- Lọc, tìm kiếm, gợi ý sản phẩm theo AI
- Quản lý sản phẩm yêu thích, lịch sử xem
- Xem chi tiết sản phẩm, modal popup
- Chatbot AI tư vấn sản phẩm
- Responsive, tối ưu cho mobile & desktop
- Hỗ trợ SSR/SSG, tối ưu SEO

---

## ⚡️ Tính năng chi tiết

1.Trang chủ 
- Hiển thị danh sách sản phẩm mới nhất, nổi bật
- Tìm kiếm sản phẩm theo tên, từ khóa
- Lọc sản phẩm theo giá
- Hiển thị lịch sử đã xem
- Xem chi tiết sản phẩm
- Gợi ý sản phẩm theo AI
- Xem danh sách bài giảng yêu thích
- ChatBot AI đã tích hợp chatGPT (Đã viết promt cho chat chỉ có thể hỏi các vấn đề liên quan đến sản phẩm, nếu có thể hỏi các vấn đề khác thì sẽ trả thông báo không được ==> Nhằm để tránh bị khác hàng khai thác sử dụng GPT free từ nền tảng)

2.Các khóa học
- Danh sách các khóa học
- Lọc chi tiết khóa học
- Chi tiết khóa học
    2.1.Bài giảng
    - Danh sách bài được sắp xếp theo menu
    - Xem bài giảng được lấy từ link Youtube nhằm giảm thiểu chi phí lưu trữ
    - Tạo Note tại ngay bài giảng (Hiện tại chưa sử lí được vấn đề thời gian ghi chú giống với thời gian xem video vì chưa thể sử dụng video trên Youtube)
    - Sử dụng MD Edittor để tạo Note
    - Tạo câu hỏi tại bài giảng (Tạo comment)
    2.2.Menu Lesson
    - Danh sách các bài giảng được chia theo từng Chương
    - Khi xem xong sẽ đánh dấu đã xem

3.Tài liệu học
- Danh sách tài liệu
- Lọc chi tiết tài liệu
- Thêm chức năng tải xuống
- Tạo MeterialCard riêng để tái sử dụng cho các khóa học

4. Sự kiện
- Danh sách sự kiện
- Lọc chi tiết sự kiện
- Xem chi tiết sự kiện
- Tạo EventCard riêng để tái sử dụng cho các khóa học

5. Bài viết
- Danh sách bài viết
- Lọc chi tiết bài viết
- Xem chi tiết bài viết
- Đã tạo giao diện cơ bản cho chi tiết bài viết (Cần bổ sung Comment,...)

6. Tạo header 
- Tạo header riêng để tái sử dụng cho các trang khác
- Reponsive theo Layout sẽ hiển thị ra Hamberger Menu khi ở giao diện mobile

7. Tạo chức năng cá nhân 
- Hồ sơ cá nhân
- Giỏ hàng
- Yêu thích
* Note : Chưa có chức năng đăng nhập, đăng ký, quản lý tài khoản, nạp tiền,...
---

## 🏁 Hướng dẫn chạy dự án

### 1. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 2. Chạy development server

```bash
npm run dev
# hoặc
yarn dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

### 3. Build production

```bash
npm run build
npm start
```

---

## 🌐 Deploy trên Vercel

Ứng dụng đã được deploy tại:  
👉 [https://ecommerce-app-git-master-nguyen-hung-dungs-projects.vercel.app/](https://ecommerce-app-git-master-nguyen-hung-dungs-projects.vercel.app/)

Bạn có thể fork repo và deploy lại trên Vercel chỉ với 1 click:  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app)

---

## 📂 Cấu trúc thư mục

```
src/
  app/                # Next.js app directory (pages, layout, routing)
  components/         # React components (ProductCard, ProductList, ...)
  api/                # Mock API, data fetch
  styles/             # Global styles, Tailwind config
  ...
```

---

## 📄 License

MIT

---

> **EduStore** - Sàn thương mại các khoá học & tài liệu ngôn ngữ  
> Made with by Nguyen Hung Dung
