import React from 'react';
import { Input } from 'antd';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Input.Search
      placeholder="Tìm kiếm khoá học, giáo trình..."
      allowClear
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ maxWidth: 420, borderRadius: 24, fontSize: 18, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', marginBottom: 12 }}
      size="large"
    />
  );
};

export default SearchBar; 