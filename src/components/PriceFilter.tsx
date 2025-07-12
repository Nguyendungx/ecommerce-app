import React from 'react';
import { Radio } from 'antd';

export type PriceRange = 'all' | '<500k' | '500k-1m' | '>1m';

interface PriceFilterProps {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ value, onChange }) => {
  return (
    <Radio.Group
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ marginLeft: 16 }}
      size="large"
    >
      <Radio.Button value="all">Tất cả</Radio.Button>
      <Radio.Button value="<500k">Dưới 500K</Radio.Button>
      <Radio.Button value="500k-1m">500K – 1 triệu</Radio.Button>
      <Radio.Button value=">1m">Trên 1 triệu</Radio.Button>
    </Radio.Group>
  );
};

export default PriceFilter; 