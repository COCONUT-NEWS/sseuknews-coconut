import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import politicsIcon from '../assets/politics.png';
import economyIcon from '../assets/economy.png';
import societyIcon from '../assets/society.png';
import lifeIcon from '../assets/life.png';
import itIcon from '../assets/it.png';
import worldIcon from '../assets/world.png';
import CategoryHeader from "../components/CategoryHeader";
import TrendNowTitle from "../components/TrendNowTitle";
import KeywordSelector from "../components/KeywordSelector";
import { categoryNewsData } from "../data/newsData";
import NewsCard from "../components/NewsCard";


export default function NewsListPage({ category, onBack }) {
    const categoryIcons = {
        정치: politicsIcon,
        경제: economyIcon,
        사회: societyIcon,
        '생활/문화': lifeIcon,
        'IT/과학': itIcon,
        세계: worldIcon,
    };

    const [selectedKeyword, setSelectedKeyword] = useState(null);

    const currentKeyword = categoryNewsData[category].keywords;
    const currentNews = categoryNewsData[category].news;

    const filteredNews = selectedKeyword
      ? currentNews.filter((news) => news.title.includes(selectedKeyword))
      : currentNews;
      
  return (
    <div style={{ paddingTop: '20px' }}>
        <HeaderBar
            category={`${category}`}
            onBack={onBack}
        />
        <CategoryHeader icon={categoryIcons[category]} label={category} />
        
        <TrendNowTitle />

        <KeywordSelector
          keywords={currentKeyword}
          selectedKeyword={selectedKeyword}
          onSelect={(keyword) => {
            setSelectedKeyword((prev) =>
              prev === keyword ? null : keyword
            );
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', paddingBottom: '24px' }}>
          {filteredNews.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              content={news.content}
              onClick={() => {
                console.log('뉴스 클릭됨:', news);
                // 추후 상세 페이지 연결 가능
              }}
            />
          ))}
        </div>
    </div>
  );
}