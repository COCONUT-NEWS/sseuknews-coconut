import React, { useEffect, useInsertionEffect, useState } from "react";
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
import NewsCard from "../components/NewsCard";

import { getKeywords, getNewsList, getNewsListByKeyword } from "../api/mockApi";

export default function NewsListPage({ category, onBack, onSelectNews }) {
    const categoryIcons = {
        정치: politicsIcon,
        경제: economyIcon,
        사회: societyIcon,
        '생활/문화': lifeIcon,
        'IT/과학': itIcon,
        세계: worldIcon,
    };

    const [selectedKeyword, setSelectedKeyword] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [newsList, setNewsList] = useState([]);

    // 카테고리명 한글 -> API용 키로 변경
    const convertCategoryToKey = (korean) => {
      const map = {
        정치: "politics",
        경제: "economy",
        사회: "society",
        "생활/문화": "culture",
        "IT/과학": "it",
        세계: "world",
      };
      return map[korean];
    };

    // keyword API 호출
    useEffect(() => {
      const fetchKeywords = async () => {
        const data = await getKeywords(convertCategoryToKey(category));
        const keywordList = data.map((item) => item.keyword); // 키워드만 뽑기
        setKeywords(keywordList);
      };
      fetchKeywords();
    }, [category]);

    // 뉴스 리스트 가져오기(keyword 선택 전, keyword 선택 후)
    useEffect(() => {
      const fetchNewsList = async () => {
        const categoryKey = convertCategoryToKey(category);
        let data;

        if (selectedKeyword) {
          // keyword 선택 후
          data = await getNewsListByKeyword(categoryKey, selectedKeyword);
        } else {
          // keyword 선택 전
          data = await getNewsList(categoryKey);
        }

        setNewsList(data);
      };

      fetchNewsList();
    }, [category, selectedKeyword]);

    // useEffect(() => {
    //   const fetchNewsList = async () => {
    //     const key = convertCategoryToKey(category);
    //     const data = selectedKeyword
    //       ? await getNewsListByKeyword(key, selectedKeyword)
    //       : await getNewsList(key);
    //     setNewsList(data);
    //   };
    //   fetchNewsList();
    // }, [category, selectedKeyword]);
    

  return (
    <div style={{ paddingTop: '20px' }}>
        <HeaderBar
            category={`${category}`}
            onBack={onBack}
        />
        <CategoryHeader icon={categoryIcons[category]} label={category} />
        
        <TrendNowTitle />

        <KeywordSelector
          keywords={keywords}
          selectedKeyword={selectedKeyword}
          onSelect={(keyword) => {
            setSelectedKeyword((prev) =>
              prev === keyword ? null : keyword
            );
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', paddingBottom: '24px' }}>
          {newsList.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              content={news.preview}
              keyword={selectedKeyword}
              onClick={() => onSelectNews(news.id)}
            />
          ))}
        </div>
    </div>
  );
}