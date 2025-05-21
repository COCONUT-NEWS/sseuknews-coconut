import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SummaryButton from '../components/SummaryButton';
import SummaryCard from '../components/SummaryCard';

export default function NewsDetailPage({ news, onBack }) {
    const [showSummary, setShowSummary] = useState(false);
    if (!news) return null;

    return (
        <div style={{ paddingTop: '20px' }}>
            {/* 상단 바 */}
            <HeaderBar
                category={news.category}
                onBack={onBack}
            />

            {/* 뉴스 제목 */}
            <h1
                style={{
                alignSelf: 'stretch',
                color: '#000',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: '140%',
                margin: '0 8px 20px',
                }}
            >
                {news.title}
            </h1>

            {/* 요약 버튼 */}
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center'}}>
                <SummaryButton onClick={() => setShowSummary(true)} />
            </div>

            {/* 뉴스 본문 */}
            <p
                style={{
                margin: '0 8px',
                color: '#29292A',
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '140%',
                }}
            >
                {news.content}
            </p>

            {/* 요약 카드 */}
            {showSummary && <SummaryCard onClose={() => setShowSummary(false)} />}
        </div>
    );
}