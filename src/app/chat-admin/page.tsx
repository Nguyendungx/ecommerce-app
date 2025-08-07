'use client';

import React, { useEffect, useState } from 'react';
import CustomerAdminChat from '../../components/CustomerAdminChat';

interface User {
  id: string;
  name: string;
}

const ChatAdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/chat/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.data);
        if (data.data.length > 0) setSelectedUser(data.data[0].id);
      });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: 260, borderRight: '1px solid #eee', background: '#fafafa' }}>
        <h3 style={{ padding: 16 }}>Người dùng đã nhắn</h3>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              padding: 16,
              cursor: 'pointer',
              background: selectedUser === user.id ? '#e6f4ff' : undefined,
            }}
            onClick={() => setSelectedUser(user.id)}
          >
            {user.name}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        {selectedUser && <CustomerAdminChat targetUserId={selectedUser} isAdmin />}
      </div>
    </div>
  );
};

export default ChatAdminPage;
