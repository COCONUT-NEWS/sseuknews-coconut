import React, { useState } from 'react';
import CategorySelectPage from './pages/CategorySelectPage';
import NewsListPage from './pages/NewsListPage';
import './App.css';

function App() {
  const PAGE = {
    CATEGORY: 'category',
    NEWS_LIST: 'newsList',
  };
  const [page, setPage] = useState(PAGE.CATEGORY); // 'category' | 'newsList'
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        />
      )}
    </div>
  );
}

export default App;