import React from 'react';

export default function NewsCard({ title, content, keyword, onClick }) {
  const highlightKeyword = (text, keyword) => {
    if (!keyword || !text.includes(keyword)) return text;

    const parts = text.split(new RegExp(`(${keyword})`,'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={i} style={{ color: '#10B981'}}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      {/* 제목 */}
      <h3
        style={{
          alignSelf: 'stretch',
          color: '#000000',
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '140%', // 22.4px
          margin: 0,
        }}
      >
        {highlightKeyword(title, keyword)}
      </h3>

      {/* 본문 요약 */}
      <p
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          alignSelf: 'stretch',
          color: '#535456',
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '140%', // 19.6px
          margin: 0,
        }}
      >
        {content}
      </p>
    </div>
  );
}