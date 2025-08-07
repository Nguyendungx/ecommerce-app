import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Avatar, Typography, Space } from 'antd';
import { SendOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../utils/api';

const { Text } = Typography;

interface ChatMessage {
  receiver: string;
  content: string;
  sender?: string;
  createdAt?: string;
}

interface ApiChatMessage {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

interface CustomerAdminChatProps {
  targetUserId?: string; // user to chat with (for admin)
  isAdmin?: boolean;
}

const ADMIN_ID = '6891714e73bcfb37ef2adc86';

const CustomerAdminChat: React.FC<CustomerAdminChatProps> = ({ targetUserId, isAdmin }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Determine chat target
  const chatTargetId = isAdmin ? targetUserId : ADMIN_ID;
  const selfId = user?.id;

  useEffect(() => {
    if (!user || !chatTargetId) return;
    fetchChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, chatTargetId]);

  const fetchChatHistory = async () => {
    if (!user || !chatTargetId) return;
    try {

      const res = await apiClient.get<ApiChatMessage[]>(`/api/chat/conversations`);
      console.log(res);
      if (res.success && Array.isArray(res.data)) {
        // Map backend format to ChatMessage
        const messages = res.data.map((msg: ApiChatMessage) => ({
          receiver: msg.receiverId,
          sender: msg.senderId,
          content: msg.text,
          createdAt: new Date(msg.timestamp).toISOString(),
        }));
        setMessages(messages);
      }
    } catch (error) {
      console.error('Failed to fetch chat history', error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user || !chatTargetId) return;
    const now = Date.now();
    const newMessage: ChatMessage = {
      receiver: chatTargetId,
      content: input.trim(),
      sender: selfId,
      createdAt: new Date(now).toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      // Use backend format for sending
      const payload: ApiChatMessage = {
        senderId: selfId || '',
        receiverId: chatTargetId,
        text: input.trim(),
        timestamp: now,
      };
      const res = await apiClient.post<{ success: boolean; message?: string }>('/api/chat/send', payload);
      if (!res.success) {
        console.error('Failed to send message:', res.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setLoading(false);
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e8e8e8',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Space align="center">
          <Avatar icon={<TeamOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <Text strong style={{ fontSize: '18px' }}>{isAdmin ? `Chat với người dùng` : 'Chat với Admin'}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>Trực tuyến</Text>
          </div>
        </Space>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 24px',
        backgroundColor: '#f5f5f5'
      }}>
        {messages.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#999'
          }}>
            <TeamOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
            <Text type="secondary">Bắt đầu cuộc trò chuyện</Text>
          </div>
        ) : (
          <List
            dataSource={messages}
            renderItem={(msg, idx) => {
              const isOwnMessage = msg.sender === selfId;
              return (
                <List.Item key={idx} style={{ 
                  border: 'none', 
                  padding: '8px 0',
                  justifyContent: isOwnMessage ? 'flex-end' : 'flex-start'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    maxWidth: '70%',
                    gap: '8px'
                  }}>
                    {!isOwnMessage && (
                      <Avatar icon={<UserOutlined />} size="small" />
                    )}
                    <div style={{
                      background: isOwnMessage ? '#1890ff' : '#fff',
                      color: isOwnMessage ? '#fff' : '#000',
                      borderRadius: '18px',
                      padding: '12px 16px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      maxWidth: '100%',
                      wordBreak: 'break-word'
                    }}>
                      <div>{msg.content}</div>
                      {msg.createdAt && (
                        <div style={{
                          fontSize: '11px',
                          opacity: 0.7,
                          marginTop: '4px',
                          textAlign: isOwnMessage ? 'right' : 'left'
                        }}>
                          {formatTime(msg.createdAt)}
                        </div>
                      )}
                    </div>
                    {isOwnMessage && (
                      <Avatar icon={<UserOutlined />} size="small" />
                    )}
                  </div>
                </List.Item>
              );
            }}
          />
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#fff',
        borderTop: '1px solid #e8e8e8'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <Input
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            disabled={loading}
            style={{
              borderRadius: '24px',
              flex: 1,
              padding: '12px 16px'
            }}
            size="large"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={loading}
            disabled={!input.trim()}
            style={{
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerAdminChat;
