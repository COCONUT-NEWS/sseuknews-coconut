import React, { useState } from 'react';
import CategorySelectPage from './pages/CategorySelectPage';
import NewsListPage from './pages/NewsListPage';
import './App.css';
import NewsDetailPage from './pages/NewsDetailPage';

function App() {
  const PAGE = {
    CATEGORY: 'category',
    NEWS_LIST: 'newsList',
    NEWS_DETAIL: 'newsDetail',
  };
  const [page, setPage] = useState(PAGE.CATEGORY); // 'category', 'newsList', 'newsDetail'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setPage(PAGE.NEWS_LIST);
  };


  return (
    <div className='App'>
      {page === PAGE.CATEGORY && (
        <CategorySelectPage onSelectCategory={handleSelectCategory} />
      )}

      {page === PAGE.NEWS_LIST && selectedCategory && (
        <NewsListPage 
          category={selectedCategory}
          onBack={() => setPage(PAGE.CATEGORY)}
          onSelectNews={(news) => {
            setSelectedNews(news);
            setPage(PAGE.NEWS_DETAIL);
          }}
        />
      )}

      {page === PAGE.NEWS_DETAIL && selectedNews && (
        <NewsDetailPage
          news={{ ...selectedNews, category: selectedCategory }}
          onBack={() => setPage(PAGE.NEWS_LIST)}
        />
      )}
    </div>
  );
}

export default App;