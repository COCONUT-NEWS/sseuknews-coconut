import React from "react";
import magicIcon from '../assets/magic.png';

export default function SummaryButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                width: '366px',
                padding: '16px 20px',
                alignItems: 'center',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.05)',
            }}
        >
            {/* 아이콘 이미지 */}
            <img
                src={magicIcon}
                alt="요약 아이콘"
                style={{
                width: '24px',
                height: '24px',
                objectFit: 'cover',
                marginRight: '6px',
                }}
            />
            {/* 텍스트 */}
            <span
                style={{
                color: '#10B981',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '140%',
            }}
            >
                뉴스 내용 한 번에 요약하기
            </span>
        </button>
    );
}