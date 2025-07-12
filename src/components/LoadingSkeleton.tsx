import React from 'react';
import { Skeleton, Row, Col } from 'antd';

const LoadingSkeleton: React.FC = () => (
  <Row gutter={[24, 24]}>
    {[1, 2, 3].map((i) => (
      <Col xs={24} sm={12} md={8} lg={6} key={i}>
        <Skeleton.Image style={{ width: 280, height: 180, marginBottom: 16 }} />
        <Skeleton active paragraph={{ rows: 2 }} />
      </Col>
    ))}
  </Row>
);

export default LoadingSkeleton; 