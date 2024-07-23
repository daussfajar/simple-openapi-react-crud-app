import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import '../assets/css/Products.css';
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../services/ProductService"; // Import ProductService

const Product = () => {
    const [products, setProducts] = useState([]);
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);

    useEffect(() => {
        fetchProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    useEffect(() => {
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
        }

        if (tableRef.current && products.length > 0) {
            dataTableRef.current = $(tableRef.current).DataTable({
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                responsive: true
            });
        }
    }, [products]);

    const [imageLoading, setImageLoading] = useState(true);

    const handleImageLoaded = () => {
        setImageLoading(false);
    };

    const handleDelete = (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            deleteProduct(productId)
                .then((res) => {
                    alert("Product deleted successfully!");
                    setProducts(products.filter((product) => product.id !== productId));
                })
                .catch((error) => {
                    console.error("Error deleting product:", error);
                });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Products Page</h2>
            <p>Welcome to the Products page!</p>
            <Link to="/product/add" className="btn btn-primary mb-3">Add Product</Link>
            <table ref={tableRef} className="table table-bordered">
                <thead>
                    <tr>
                        <th width="150" className="text-center">Product ID</th>
                        <th className="text-start">Image</th>
                        <th className="text-start">Brand</th>
                        <th className="text-start">Product Name</th>
                        <th className="text-center">Category</th>
                        <th className="text-center">Stock</th>
                        <th className="text-center" width="100">Price</th>
                        <th className="text-center" width="200">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="text-center v-middle">{product.id}</td>
                            <td className="text-start v-middle">
                                {imageLoading && (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                )}
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    width="50"
                                    onLoad={handleImageLoaded}
                                    style={{ display: imageLoading ? "none" : "block" }}
                                />
                            </td>
                            <td className="text-start v-middle">{product.brand}</td>
                            <td className="text-start v-middle">{product.title}</td>
                            <td className="text-center v-middle">{product.category}</td>
                            <td className="text-center v-middle">{product.stock}</td>
                            <td className="text-center v-middle">${product.price}</td>
                            <td className="text-center v-middle">
                                <Link to={`/product/edit/${product.id}`} className="btn btn-warning me-2">Edit</Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;