import axiosInstance from '../utils/axiosInstance'; 

const fetchProducts = async (page = 1, perPage = 10, search = '') => {
    try {
        const response = await axiosInstance.get(`products`, {
            params: {
                page,
                perPage,
                keyword: search,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        return null;
    }
}

const addProduct = async (data) => {
    try {
        const response = await axiosInstance.post(`products`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
}

export { fetchProducts, deleteProduct, addProduct };