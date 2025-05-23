import React, { useState } from 'react';
import CategorySelectPage from './pages/CategorySelectPage';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage';
import './App.css';


function App() {
  const PAGE = {
    CATEGORY: 'category',
    NEWS_LIST: 'newsList',
    NEWS_DETAIL: 'newsDetail',
  };
  const [page, setPage] = useState(PAGE.CATEGORY); // 'category', 'newsList', 'newsDetail'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setPage(PAGE.NEWS_LIST);
  };

  const handleSelectedNews = (newsId) => {
    setSelectedNewsId(newsId);
    setPage(PAGE.NEWS_DETAIL);
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
          onSelectNews={handleSelectedNews}
        />
      )}

      {page === PAGE.NEWS_DETAIL && selectedNewsId && (
        <NewsDetailPage
          newsId={selectedNewsId}
          onBack={() => setPage(PAGE.NEWS_LIST)}
        />
      )}
    </div>
  );
}

export default App;