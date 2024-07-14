import React from "react";
import { Link } from "react-router-dom";
import { addProduct } from "../services/ProductService";

const AddProduct = () => {
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const brand = event.target.brand.value;
        const product_name = event.target.product_name.value;
        const category = event.target.category.value;
        const stock = event.target.stock.value;
        const price = event.target.price.value;

        addProduct({ brand, product_name, category, stock, price })
            .then((res) => {
                alert("Product added successfully!");
                event.target.reset();
                console.log(res);
            })
            .catch((error) => {
                alert("Failed to add product: " + error.message);
            });
    };

    return (
        <div className="container mt-5">
            <Link to="/product" className="btn btn-secondary mb-3">Back to Products</Link>
            <h2>Add Product</h2>
            <p>Welcome to the Add Product page!</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input type="text" className="form-control" id="brand" name="brand" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="product_name" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="product_name" name="product_name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" name="category" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input type="number" className="form-control" id="stock" name="stock" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" step="0.01" required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddProduct;