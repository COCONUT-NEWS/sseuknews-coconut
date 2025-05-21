import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar";

export default function NewsDetailPage({ news, onBack }) {
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

            {/* 뉴스 본문 */}
            <p
                style={{
                // width: '350px',
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
        </div>
    );
}