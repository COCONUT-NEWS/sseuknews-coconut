import React from "react";
import fireIcon from '../assets/fire.png';

export default function TrendNowTitle() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px', // 아이콘 - 텍스트 사이 간격
                margin: '20px 0 10px',
            }}
        >
            {/* fire icon */}
            <img
                src={fireIcon}
                alt={"fireIcon"}
                style={{
                width: '20px',
                height: '20px',
                objectFit: 'cover',
                display: 'block',
                marginLeft: '8px',
                }}
            />
            {/* trend now */}
            <span
                style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                    color: '#000',
                }}
            >
                Trend
            </span>
            
            <span
                style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                    color: '#FF3E11',
                }}    
            >
                Now
            </span>
        </div>
    );
}