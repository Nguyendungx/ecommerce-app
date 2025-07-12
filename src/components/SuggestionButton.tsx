import React from 'react';
import { Button } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

interface SuggestionButtonProps {
  loading: boolean;
  onClick: () => void;
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ loading, onClick }) => {
  return (
    <Button
      type="primary"
      icon={<BulbOutlined />}
      loading={loading}
      onClick={onClick}
      size="large"
      style={{
        marginLeft: 16,
        borderRadius: 24,
        fontWeight: 600,
        fontSize: 17,
        padding: '0 28px',
        boxShadow: '0 2px 8px 0 rgba(22,119,255,0.08)'
      }}
      disabled={loading}
    >
      Gợi ý sản phẩm phù hợp
    </Button>
  );
};

export default SuggestionButton; 