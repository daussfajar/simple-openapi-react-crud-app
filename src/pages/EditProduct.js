import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductById, updateProduct } from "../services/ProductService";

const EditProduct = () => {
    const [product, setProduct] = useState({
        brand: "",
        title: "",
        category: "",
        stock: 0,
        price: 0
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const productId = window.location.pathname.split("/").pop();
        updateProduct(productId, product)
            .then((res) => {
                alert("Product updated successfully!");
                console.log(res);
            })
            .catch((error) => {
                alert("Failed to update product: " + error.message);
            });
    };

    useEffect(() => {
        const productId = window.location.pathname.split("/").pop();
        fetchProductById(productId).then((data) => {
            setProduct(data);
        });
    }, []);    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    if(!product) {
        // redirect to 404 page
        return <div>Product not found</div>;
    }

    return (
        <div className="container mt-5">
            <Link to="/product" className="btn btn-secondary mb-3">Back to Products</Link>
            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={product.title} // Perbaikan: gunakan product.title
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        step="0.01"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EditProduct;