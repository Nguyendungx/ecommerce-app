/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Typography, Tag, Space, Card, Button } from 'antd';
import mockPosts from '../../../api/mockPosts';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 32, textAlign: 'center' }}>
        <Title level={3} type="danger">Không tìm thấy bài viết</Title>
        <Button type="primary" onClick={() => router.push('/posts')}>Quay lại danh sách bài viết</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32, background: '#f5f5f5', minHeight: '100vh' }}>
      <Card
        cover={<img alt={post.title} src={post.image} style={{ maxHeight: 350, objectFit: 'cover' }} />}
        style={{ borderRadius: 12, marginBottom: 24 }}
      >
        <Space style={{ marginBottom: 12 }}>
          <Tag color="blue">{post.author}</Tag>
          <Tag color="default">{new Date(post.date).toLocaleDateString('vi-VN')}</Tag>
        </Space>
        <Title level={2} style={{ margin: '12px 0', color: '#1677ff' }}>{post.title}</Title>
        <Space wrap style={{ marginBottom: 16 }}>
          {post.tags.map(tag => (
            <Tag key={tag} color="geekblue">{tag}</Tag>
          ))}
        </Space>
        <Paragraph style={{ fontSize: 18, marginBottom: 0 }}>{post.content}</Paragraph>
      </Card>
      <Button onClick={() => router.push('/posts')}>← Quay lại danh sách bài viết</Button>
    </div>
  );
} 