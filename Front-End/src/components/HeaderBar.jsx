// src/components/HeaderBar.jsx
import React from 'react';
import BackButton from './BackButton';

export default function HeaderBar({ category, onBack }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '48px',
        margin: '12px 0 16px',
      }}
    >
      {/* 뒤로가기 버튼 (좌측 고정) */}
      <div style={{ position: 'absolute', left: 0 }}>
        <BackButton onClick={onBack} />
      </div>

      {/* 카테고리리 텍스트 (가운데 정렬) */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 500,
          fontFamily: 'Pretendard, sans-serif',
          color: '#000',
        }}
      >
        {category}
      </div>
    </div>
  );
}