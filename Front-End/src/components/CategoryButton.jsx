import React from 'react';
import caretRight from '../assets/caretRight.png';

export default function CategorySelector({ icon, label, onClick }) {
    return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // 자식 두 개 사이에 공간을 줌
        padding: '0 24px',
        height: '68px',
        backgroundColor: '#FFFFFF',
        border: 'none',
        borderRadius: '16px',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '366px',
        marginBottom: '12px',
        fontFamily: 'Pretendard, sans-serif',
      }}
    >
        {/* 왼쪽: 이모지 + 텍스트 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img
                src={icon}
                alt=""
                style={{ width: '22px', height: '22px' }}
            />
            <span
                style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#000000',
                }}
            >
                {label}
            </span>
        </div>

        {/* 오른쪽: 화살표 */}
        <img
            src={caretRight}
            alt="화살표"
            style={{ width: '16px', height: '16px'}}
        />
    </button>
    );
}