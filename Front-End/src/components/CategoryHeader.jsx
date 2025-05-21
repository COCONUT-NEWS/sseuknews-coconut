import React from 'react';

export default function CategoryHeader({ icon, label }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <img
        src={icon}
        alt={`${label} 아이콘`}
        style={{
          width: '24px',
          height: '24px',
          objectFit: 'cover',
          marginLeft: '8px',
        }}
      />

      <span
        style={{
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal',
        }}
      >
        {label}
      </span>
    </div>
  );
}
