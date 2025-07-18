"use client";
import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Drawer, Grid } from 'antd';
import { 
  BookOutlined, 
  FileTextOutlined, 
  CalendarOutlined,
  ShoppingCartOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();

  const menuItems = [
    {
      key: '/',
      label: 'Trang chủ',
      icon: <BookOutlined />, 
    },
    {
      key: '/courses',
      label: 'Các khóa học',
      icon: <BookOutlined />, 
    },
    {
      key: '/materials',
      label: 'Tài liệu học',
      icon: <FileTextOutlined />, 
    },
    {
      key: '/events',
      label: 'Sự kiện',
      icon: <CalendarOutlined />, 
    },
    {
      key: '/posts',
      label: 'Bài viết',
      icon: <FileTextOutlined />, 
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Hồ sơ cá nhân',
      icon: <Avatar size={20} style={{ background: '#1677ff', marginRight: 4 }}>U</Avatar>,
    },
    {
      key: 'cart',
      label: 'Giỏ hàng',
      icon: <ShoppingCartOutlined />,
    },
    {
      key: 'favorites',
      label: 'Yêu thích',
      icon: <HeartOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    setCurrent(e.key);
    setDrawerOpen(false);
    router.push(e.key);
  };

  const handleUserMenuClick = (e: { key: string }) => {
    switch (e.key) {
      case 'profile':
        router.push('/profile');
        break;
      case 'cart':
        router.push('/cart');
        break;
      case 'favorites':
        router.push('/favorites');
        break;
      case 'logout':
        // Xử lý đăng xuất
        break;
    }
  };

  return (
    <AntHeader 
      style={{ 
        background: '#f5f6fa', // màu xám nhẹ
        padding: screens.xs ? '0 12px' : '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64
      }}
    >
      <div className="flex items-center flex-1">
        <Link href="/" className="no-underline">
          <div className="font-bold text-primary mr-4 md:mr-12 text-[20px] md:text-[24px]">EduStore</div>
        </Link>
        {/* Desktop menu */}
        <div className="hidden xs:hidden sm:block flex-1">
          <Menu
            mode="horizontal"
            selectedKeys={[current]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ background: 'transparent', border: 'none', flex: 1 }}
          />
        </div>
      </div>
      {/* Mobile hamburger */}
      <div className="block xs:block sm:hidden ml-2">
        <Button
          type="text"
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1677ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          }
          onClick={() => setDrawerOpen(true)}
          aria-label="Mở menu"
          className="!ml-2"
        />
      </div>
      {/* User menu */}
      <Dropdown
        menu={{
          items: userMenuItems,
          onClick: handleUserMenuClick,
        }}
        placement="bottomRight"
      >
        <Avatar 
          size={screens.xs ? 32 : 40} 
          className="cursor-pointer ml-4"
        >U</Avatar>
      </Dropdown>
      {/* Drawer cho mobile menu */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{ body: { padding: 0 } }}
        width={220}
      >
        <Menu
          mode="vertical"
          selectedKeys={[current]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none', fontSize: 16 }}
        />
      </Drawer>
    </AntHeader>
  );
};

export default Header; 