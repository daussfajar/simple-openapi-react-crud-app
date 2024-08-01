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

const fetchProductById = async (productId) => {
    try {
        const response = await axiosInstance.get(`products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

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

const updateProduct = async (productId, data) => {
    try {
        const response = await axiosInstance.put(`products/${productId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        return null;
    }
}

const fetchProductCategories = async () => {
    try {
        const response = await axiosInstance.get(`product-categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return null;
    }
}

const fetchProductBrands = async () => {
    try {
        const response = await axiosInstance.get(`brands`);
        return response.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        return null;
    }
}

export { fetchProducts, fetchProductById, deleteProduct, addProduct, updateProduct, fetchProductCategories, fetchProductBrands };