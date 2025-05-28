import React, { useEffect, useState } from "react";
import { fetchNewsDetail, fetchSummary } from "../api/api";
import HeaderBar from "../components/HeaderBar";
import SummaryButton from '../components/SummaryButton';
import SummaryCard from '../components/SummaryCard';

export default function NewsDetailPage({ newsId, onBack }) {
    const [news, setNews] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [summaryText, setSummaryText] = useState('');

    useEffect(() => {
        const fetchDetail = async () => {
            console.log("요청받은 newsId:", newsId);
            const data = await fetchNewsDetail(newsId);
            console.log("news detail data: ", data);
            setNews(data);
        };
        fetchDetail();
    }, [newsId]);

    useEffect(() => {
        if (showSummary) {
            const fetchNewsSummary = async () => {
                const text = await fetchSummary(newsId);
                console.log("요약 내용:", text);
                setSummaryText(text);
            };
            fetchNewsSummary();
        }
    }, [showSummary, newsId]);

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
                margin: '0 8px 8px',
                }}
            >
                {news.title}
            </h1>
            <div>
                <p
                    style={{
                    margin: '0 8px 20px',
                    color: '#535456',
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '140%',
                    }}
                >
                    {news.published_at} {news.source}
                </p>
            </div>
            
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
                fontWeight: 400,
                lineHeight: '180%',
                letterSpacing: '0.3px',
                whiteSpace: 'pre-line',
                }}
            >
                {news.content}
                <p> </p>
                {news.reporter}
            </p>

            {/* 요약 카드 */}
            {showSummary && (
                <SummaryCard 
                    summary={summaryText}
                    onClose={() => setShowSummary(false)} 
                />
            )}
        </div>
    );
}