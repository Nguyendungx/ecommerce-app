import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduStore - Sàn giáo dục thương mại điện tử",
  description: "Nền tảng học tập trực tuyến với các khóa học, tài liệu và sự kiện chất lượng cao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f6fa]`}>
        <AuthProvider>
          <Header />
          <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
