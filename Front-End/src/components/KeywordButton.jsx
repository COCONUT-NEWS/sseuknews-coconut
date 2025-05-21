import React from "react";

export default function KeywordButton({ keyword, isSelected, onClick }) {
    return (
        <button
            onClick={() => onClick(keyword)}
            style={{
                display: 'flex',
                height: '32px',
                padding: '4px 12px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '32px',
                background: isSelected ? '#2EB67D' : '#FFF',
                color: isSelected ? '#FFF' : '#000',
                border: isSelected ? '#FFF' : '#FFF',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                whiteSpace: 'nowrap', // 줄바꿈 방지
                cursor: 'pointer',
            }}
        >
            {keyword}
        </button>
    );
}