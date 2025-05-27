import axios from 'axios';

export const fetchKeywords = async (categoryName) => {
    try {
        const response = await axios.get(
            `http://k8s-default-yykmaini-96398706a8-1571562170.ap-northeast-1.elb.amazonaws.com/api/v1/news/keywords`,
            {
                params: { category: categoryName },
            }
        );
        return response.data.categoryName || [];
    } catch (error) {
        console.error('fail to check keywords: ', error);
        return [];
    }
};