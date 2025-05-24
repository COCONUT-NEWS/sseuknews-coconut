import { mockKeywords } from "../mock/keywordsByCategory";
import { mockNewsList } from "../mock/newsListByCategory";
import { mockNewsListByKeyword } from "../mock/newsListByKeyword";
import { mockNewsDetail } from "../mock/newsDetail";
import { mockSummary } from "../mock/summary";


// 카테고리별 키워드
export const getKeywords = async (categoryName) => {
    console.log(`(Mock) 키워드 조회: ${categoryName}`);
    const data = mockKeywords.data[categoryName] || [];
    return Promise.resolve(data);
};

// 카테고리별 뉴스 리스트
export const getNewsList = async (categoryName) => {
    console.log(`(Mock) 뉴스 리스트 조회: ${categoryName}`);
    const categoryData = mockNewsList[categoryName];
    if (!categoryData) {
        throw new Error(`No data for category: ${categoryName}`);
    }
    return Promise.resolve(categoryData.data);
}

// 키워드 선택 시 뉴스 리스트
export const getNewsListByKeyword = async (categoryName, keyword) => {
    console.log(`(Mock) 키워드 뉴스 조회: ${categoryName}, ${keyword}`);

    const match = mockNewsListByKeyword.find(
        (item) => item.category === categoryName && item.keyword === keyword
    );

    return Promise.resolve(match?.data || []);
};

// 뉴스 상세 조회
export const getNewsDetail = async (newsId) => {
    console.log(`(Mock) 뉴스 상세 조회: ${newsId}`);
    const match = mockNewsDetail.find(item => item.data.id === newsId);
    return Promise.resolve(match?.data || null);
};

// 뉴스 요약 조회
export const getSummary = async (newsId) => {
    console.log("(Mock) 요약 요청:", newsId);
    const summaryData = mockSummary[newsId];
    return Promise.resolve(summaryData?.summary || "요약 데이터를 찾을 수 없습니다.");
};