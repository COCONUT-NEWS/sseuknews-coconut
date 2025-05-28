import React from 'react';
import CategoryButton from '../components/CategoryButton';
import logo from '../assets/logo.svg';
import GuideBox from '../components/GuideBox';
import politicsIcon from '../assets/politics.png';
import economyIcon from '../assets/economy.png';
import societyIcon from '../assets/society.png';
import lifeIcon from '../assets/life.png';
import technologyIcon from '../assets/technology.png';
import worldIcon from '../assets/world.png';

export default function CategorySelectPage( { onSelectCategory }) {
    const categories = [
        { label: '정치', icon: politicsIcon }, 
        { label: '경제', icon: economyIcon }, 
        { label: '사회', icon: societyIcon }, 
        { label: '생활/문화', icon: lifeIcon }, 
        { label: 'IT/과학', icon: technologyIcon }, 
        { label: '세계', icon: worldIcon }, 
    ];

    return (
        <div style={{ paddingTop: '10px' }}>
            <header 
                style={{
                    display: 'flex',
                    alignItems: 'center', // 중앙 수직 정렬
                    padding: '12px 0 0 10px', //위쪽 12px, 왼쪽 10px margin
                    height: '60px',
                }}
            >
                <img
                    src={logo}
                    alt="쓱news 로고"
                    style={{width: '84px', height: '36px', marginBottom: '10px'}}
                />
            </header>
            <main style={{ 
                // padding: '1rem', 
                disply: 'flex', 
                flexDirection: 'column', 
                gap: '1.5rem' 
                }}
            >
                <GuideBox />
                {categories.map((category) => (
                    <CategoryButton
                        key={category.label}
                        icon={category.icon}
                        label={category.label}
                        onClick={() => onSelectCategory(category.label)}
                    />
                ))}
            </main>
        </div>
    )
}