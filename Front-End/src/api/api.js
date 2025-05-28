import axios from 'axios';

const instance = axios.create({
    baseURL: `http://k8s-default-yykmaini-96398706a8-1571562170.ap-northeast-1.elb.amazonaws.com`,
});

// 키워드 조회
export const fetchKeywords = async (categoryKey) => {
    try {
        const response = await instance.get('/api/v1/news/keywords', {
                params: { category: categoryKey },
        });
        return response.data.data[categoryKey] || [];
    } catch (error) {
        console.error('fail to fetch keywords: ', error);
        return [];
    }
};

// 키워드 선택 전 뉴스 10개 조회
export const fetchNewsList = async (categoryKey) => {
    try {
        const response = await instance.get('/api/v1/news', {
            params: { category: categoryKey },
        });
        return response.data.data || [];
    } catch (error) {
        console.error('fail to fetch news list: ', error);
        return [];
    }
};

// 키워드 선택 후 뉴스 리스트 조회
export const fetchNewsListByKeyword = async (categoryKey, keyword) => {
    try {
        const response = await instance.get('/api/v1/news/keyword', {
            params: {
                category: categoryKey,
                keyword: encodeURIComponent(keyword), // 한글 인코딩 처리
            },
        });
        return response.data.data || [];
    } catch (error) {
        console.error('fail to fetch news list by keyword: ', error);
        return [];
    }
};

// 뉴스 상세 조회
export const fetchNewsDetail = async (newsId) => {
    try {
        const response = await instance.get(`/api/v1/news/${newsId}`);
        return response.data?.data || null;
    } catch (error) {
        console.error('fail to fetch news detail: ', error);
        return null;
    };
}

// AI 요약 조회
export const fetchSummary = async (newsId) => {
    try {
        const response = await instance.get(`/api/v1/summarize/${newsId}`);
        return response.data?.summary || null;
    } catch (error) {
        console.error('fail to fetch news summary: ', error);
        return null;
    };
}