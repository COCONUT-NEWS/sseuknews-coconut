import React from 'react';
import caretLeft from '../assets/caretLeft.png';

export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        width: '40px',
        height: '40px',
        padding: '6px',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
      }}
    >
      <img
        src={caretLeft}
        alt="뒤로가기"
        style={{
          width: '20px',
          height: '20px',
          flexShrink: 0,
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </button>
  );
}