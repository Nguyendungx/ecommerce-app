/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { Card, Typography, Tag, Space } from 'antd';
import mockPosts, { Post } from '../../api/mockPosts';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

export default function PostsPage() {
  const [posts] = useState<Post[]>(mockPosts);
  const router = useRouter();

  return (
    <div >
      <Title level={2} className="text-center mb-8 text-blue-600 font-bold text-3xl md:text-4xl">
        Bài Viết
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Card
            key={post.id}
            hoverable
            onClick={() => router.push(`/posts/${post.id}`)}
            cover={
              <img
                alt={post.title}
                src={post.image}
                className="h-52 w-full object-cover rounded-t-xl"
              />
            }
            className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer rounded-xl"
            styles={{ body: { padding: 20 } }}
          >
            <div className="flex flex-wrap gap-2 mb-2">
              <Tag color="blue">{post.author}</Tag>
              <Tag color="default">{new Date(post.date).toLocaleDateString('vi-VN')}</Tag>
            </div>
            <Title level={4} className="!my-2 !text-lg !font-semibold line-clamp-2">{post.title}</Title>
            <Paragraph ellipsis={{ rows: 2 }} className="!mb-2 text-gray-700">{post.excerpt}</Paragraph>
            <Space wrap>
              {post.tags.map(tag => (
                <Tag key={tag} color="geekblue">{tag}</Tag>
              ))}
            </Space>
          </Card>
        ))}
      </div>
    </div>
  );
} 