import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, List, Avatar } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { fetchProducts } from '../api/products';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  shortDesc: string;
  longDesc?: string;
  rating?: number;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  suggestions?: Product[];
}

const ChatbotAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Xin chào! Tôi có thể giúp bạn tìm khoá học hoặc sản phẩm giáo dục nào?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/openai-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: `
                Bạn là trợ lý AI tư vấn sản phẩm cho một sàn giáo dục thương mại điện tử. 
                Chỉ trả lời các câu hỏi liên quan đến sản phẩm, khoá học, tài liệu, hoặc các chức năng, hướng dẫn sử dụng của trang web này.
                Nếu người dùng hỏi về chủ đề không liên quan đến sản phẩm, khoá học, tài liệu, hoặc chức năng của trang web, hãy lịch sự từ chối và trả lời: 
                "Xin lỗi, tôi chỉ có thể hỗ trợ các vấn đề liên quan đến sản phẩm, khoá học, tài liệu hoặc chức năng của trang web này."
                Danh sách sản phẩm hiện có: ${products.map(p => p.name).join(', ')}
              `
            },
            { role: 'user', content: input }
          ],
          model: 'gpt-3.5-turbo'
        }),
      });
      const data = await res.json();
      const botMsg: ChatMessage = {
        sender: 'bot',
        text: data.choices?.[0]?.message?.content || 'Xin lỗi, tôi chưa có câu trả lời.',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Có lỗi khi kết nối OpenAI API.' }]);
    }
    setLoading(false);
  };

  return (
    <Card
      style={{ position: 'fixed', bottom: 32, right: 32, width: 370, maxHeight: 540, zIndex: 1000, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12)', borderRadius: 18, display: 'flex', flexDirection: 'column' }}
      title={<span><RobotOutlined /> Chatbot AI tư vấn sản phẩm</span>}
      styles={{
        body: { padding: 0, display: 'flex', flexDirection: 'column', height: 500 },
        header: { borderTopLeftRadius: 18, borderTopRightRadius: 18 }
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#fafbfc' }}>
        <List
          dataSource={messages}
          renderItem={(msg, idx) => (
            <List.Item key={idx} style={{ border: 'none', padding: 0, marginBottom: 8, justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: 260, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.sender === 'bot' && <Avatar icon={<RobotOutlined />} style={{ marginRight: 8, background: '#1677ff' }} />}
                  <span style={{
                    background: msg.sender === 'user' ? '#e6f4ff' : '#f5f5f5',
                    color: '#222',
                    borderRadius: 12,
                    padding: '8px 14px',
                    display: 'inline-block',
                    fontSize: 15,
                  }}>{msg.text}</span>
                  {msg.sender === 'user' && <Avatar icon={<UserOutlined />} style={{ marginLeft: 8, background: '#f5222d' }} />}
                </div>
                {/* Nếu có suggestions thì show */}
                {msg.suggestions && (
                  <div style={{ marginTop: 8 }}>
                    {msg.suggestions.map((p) => (
                      <Card key={p.id} size="small" style={{ marginBottom: 8, borderRadius: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={p.image} shape="square" size={48} style={{ marginRight: 12 }} />
                          <div>
                            <div style={{ fontWeight: 600 }}>{p.name}</div>
                            <div style={{ color: '#1677ff', fontWeight: 500 }}>{p.price.toLocaleString()} đ</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </List.Item>
          )}
        />
        <div ref={chatEndRef} />
      </div>
      <div style={{ padding: 12, borderTop: '1px solid #eee', background: '#fff', display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="Nhập câu hỏi, ví dụ: Tôi muốn học tiếng anh với người mỹ"
          value={input}
          onChange={e => setInput(e.target.value)}
          onPressEnter={handleSend}
          disabled={loading}
          style={{ borderRadius: 18, fontSize: 15, marginRight: 8 }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
          disabled={!input.trim()}
          style={{ borderRadius: 18 }}
        />
      </div>
    </Card>
  );
};

export default ChatbotAI; 