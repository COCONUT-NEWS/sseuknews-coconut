import React, { useEffect, useState } from "react";
import { getNewsDetail, getSummary } from "../api/mockApi";
import HeaderBar from "../components/HeaderBar";
import SummaryButton from '../components/SummaryButton';
import SummaryCard from '../components/SummaryCard';

export default function NewsDetailPage({ newsId, onBack }) {
    const [news, setNews] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [summaryText, setSummaryText] = useState('');

    useEffect(() => {
        const fetchNewsDetail = async () => {
            console.log("요청받은 newsId:", newsId);
            const data = await getNewsDetail(newsId);
            console.log("news detail data: ", data);
            setNews(data);
        };
        fetchNewsDetail();
    }, [newsId]);

    useEffect(() => {
        if (showSummary) {
            const fetchSummary = async () => {
                const text = await getSummary(newsId);
                console.log("요약 내용:", text);
                setSummaryText(text);
            };
            fetchSummary();
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
                fontWeight: 500,
                lineHeight: '140%',
                }}
            >
                {news.content}
                <p> </p>
                {news.reporter}
            </p>

            {/* 요약 카드 */}
            {showSummary && <SummaryCard onClose={() => setShowSummary(false)} summary={summaryText}/>}
        </div>
    );
}