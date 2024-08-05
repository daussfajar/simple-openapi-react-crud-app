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

const addBrands = async (data) => {
    try {
        const response = await axiosInstance.post(`brands`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding brand:", error);
        return {
            success: false,
            message: "Error adding brand"
        };
    }
}

export { fetchBrands, addBrands };