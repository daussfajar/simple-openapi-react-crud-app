import axios from "axios";

const API_URL = "https://dummyjson.com";

const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};

const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products/add`, product);
        return response;
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
}

const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, product);
        return response;
    } catch (error) {
        console.error("Error updating product:", error);
        return null;
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/products/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting product:", error);
        return null;
    }
}

export { fetchProducts, fetchProductById, addProduct, updateProduct, deleteProduct };
