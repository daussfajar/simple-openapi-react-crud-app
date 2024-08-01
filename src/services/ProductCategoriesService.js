import axiosInstance from '../utils/axiosInstance';

const fetchProductCategories = async () => {
    try {
        const response = await axiosInstance.get(`product-categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product categories:", error);
        return null;
    }
}

export default fetchProductCategories;