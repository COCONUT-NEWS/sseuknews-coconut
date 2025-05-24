import React, { useEffect, useState } from "react";
import magicIcon from '../assets/magic.png';

export default function SummaryCard({ onClose, summary }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    const handleClose = () => {
        setVisible(false); // 슬라이드 다운 트리거
        setTimeout(() => {
            onClose(); // 완전히 내려간 다음 부모에서 unmount
        }, 300); // transition 시간과 맞춰야 함
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.40)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                zIndex: 999,
            }}
        >
            <div
                style={{
                    position: 'relative',
                    bottom: visible ? '0px' : '-500px',
                    width: '390px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px 20px 0px 0px',
                    transition: 'bottom 0.3s ease-in-out',
                    padding: '24px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '24px',
                }}
            >  
                {/* 제목 영역 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <img
                        src={magicIcon}
                        alt="요약 아이콘"
                        style={{
                            width: '24px',
                            height: '24px',
                            objectFit: 'cover',
                        }}
                    />
                    <span
                        style={{
                            color: '#000',
                            fontFamily: 'Pretendard, sans-serif',
                            fontSize: '18px',
                            fontWeight: 600,
                            lineHeight: '140%',
                        }}
                    >
                        뉴스 요약
                    </span>
                </div>

                {/* 요약 본문 박스 */}
                <div
                    style={{
                        display: 'flex',
                        width: '358px',
                        padding: '12px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        borderRadius: '16px',
                        backgroundColor: '#F2F4F6',
                        margin: '12px 0',
                    }}
                >
                    <p
                        style={{
                            flex: '1 0 0',
                            color: '#29292A',
                            fontFamily: 'Pretendard, sans-serif',
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '140%',
                            margin: 0,
                        }}
                    >
                        {summary}
                    </p>
                </div>
                {/* 확인 버튼 */}
                <button
                    onClick={handleClose}
                    style={{
                        display: 'flex',
                        width: '358px',
                        height: '56px',
                        padding: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        flexShrink: 0,
                        borderRadius: '16px',
                        backgroundColor: '#2EB67D',
                        color: '#FFFFFF',
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '140%',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    확인
                </button>
            </div>
        </div>
    );
}