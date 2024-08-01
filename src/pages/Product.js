import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {fetchProducts, deleteProduct} from '../services/ProductService';
import Sidebar from '../components/Navigation/Sidebar';
import Topbar from '../components/Navigation/Topbar';
import PageHeading from '../components/PageHeading';
import Footer from '../components/Footer/Footer';
import '../assets/css/Products.css';

import Swal from 'sweetalert2';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');  // State for search term
    const perPage = 10; // Number of items per page

    const loadProducts = async (page, search = '') => {
        setLoading(true);
        const data = await fetchProducts(page, perPage, search);
        if (data) {
            setProducts(data.products);
            setTotalPages(Math.ceil(data.totalProducts / perPage));
        }
        setLoading(false);
    };

    useEffect(() => {
        loadProducts(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const getPageButtons = () => {
        const buttons = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        if (currentPage > 3) {
            buttons.push(1);
            if (currentPage > 4) buttons.push('...');
        }

        for (let i = start; i <= end; i++) {
            buttons.push(i);
        }

        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) buttons.push('...');
            buttons.push(totalPages);
        }

        return buttons;
    };

    const handleDelete = (productId, productTitle) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${productTitle}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(productId)
                    .then((res) => {
                        Swal.fire('Deleted!', 'The product has been deleted.', 'success');
                        loadProducts(currentPage, searchTerm);
                    })
                    .catch((error) => {
                        console.error('Error deleting product:', error);
                        Swal.fire('Error', 'An error occurred while deleting the product.', 'error');
                    });
            }
        });
    };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        <PageHeading title="Product" />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Product List</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search product..."
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                />
                                            </div>
                                            <div>
                                                <Link className="btn btn-sm btn-success" to="/product/add">
                                                    <i className="fas fa-fw fa-plus"></i>
                                                    <span>Add Product</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" width="100%" cellSpacing="0">
                                                <thead className='bg-primary text-white'>
                                                    <tr>
                                                        <th className='text-center v-middle'>No</th>
                                                        <th className='v-middle'>Product Name</th>
                                                        <th className='v-middle'>Description</th>
                                                        <th className='v-middle'>Brand</th>
                                                        <th className='v-middle'>Category</th>
                                                        <th className='v-middle'>Price</th>
                                                        <th className='v-middle'>SKU</th>
                                                        <th className='text-center v-middle'>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? (
                                                        <tr>
                                                            <td colSpan="8" className="text-center">Loading...</td>
                                                        </tr>
                                                    ) : products.length > 0 ? (
                                                        products.map((product, index) => (
                                                            <tr key={product.id}>
                                                                <td className='text-center v-middle'>{(currentPage - 1) * perPage + index + 1}</td>
                                                                <td className='v-middle'>{product.title}</td>
                                                                <td className='v-middle'>{product.description}</td>
                                                                <td className='v-middle'>{product.brand_name}</td>
                                                                <td className='v-middle'>{product.category_name}</td>
                                                                <td className='v-middle'>{product.price}</td>
                                                                <td className='v-middle'>{product.sku}</td>
                                                                <td className='text-center v-middle' width={100}>
                                                                    <Link to={`/product/edit/${product.id}`} className='btn btn-sm btn-warning'>
                                                                        <i className='fas fa-edit'></i>
                                                                    </Link>
                                                                    &nbsp;
                                                                    <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(product.id, product.title)}>
                                                                        <i className='fas fa-trash'></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="8" className="text-center">No products found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            <nav>
                                                <ul className="pagination justify-content-center">
                                                    <li className={`page-item ${currentPage === 1 || totalPages === 0 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(1)} disabled={currentPage === 1 || totalPages === 0}>
                                                            First
                                                        </button>
                                                    </li>
                                                    <li className={`page-item ${currentPage === 1 || totalPages === 0 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || totalPages === 0}>
                                                            Previous
                                                        </button>
                                                    </li>
                                                    {getPageButtons().map((page, index) => (
                                                        <li
                                                            key={index}
                                                            className={`page-item ${currentPage === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                                                        >
                                                            <button
                                                                className="page-link"
                                                                onClick={() => {
                                                                    if (page !== '...') handlePageChange(page);
                                                                }}
                                                                disabled={page === '...'}
                                                            >
                                                                {page}
                                                            </button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                                                            Next
                                                        </button>
                                                    </li>
                                                    <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0}>
                                                            Last
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Product;