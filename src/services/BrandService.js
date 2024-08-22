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

const fetchBrandsById = async (id) => {
    try {
        const response = await axiosInstance.get(`brands/${id}`);
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

const editBrands = async (id, data) => {
    try {
        const response = await axiosInstance.put(`brands/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error editing brand:", error);
        return {
            success: false,
            message: "Error editing brand"
        };
    }
}

export { fetchBrands, fetchBrandsById, addBrands, editBrands };