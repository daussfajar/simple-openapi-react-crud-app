import axiosInstance from '../utils/axiosInstance'; 

const fetchBrands = async () => {
    try {
        const response = await axiosInstance.get(`brands`);
        return response.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        return null;
    }
}

export default fetchBrands;