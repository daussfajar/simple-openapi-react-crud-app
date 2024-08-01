import React, {useState, useEffect} from 'react';

// Navigation
import Sidebar from '../components/Navigation/Sidebar';
import Topbar from '../components/Navigation/Topbar';

import Footer from '../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';

import {addProduct, fetchProductCategories, fetchProductBrands} from '../services/ProductService';

// SweetAlert
import Swal from 'sweetalert2';

const AddProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [sku, setSku] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangeCategory = (event) => {
        const { value } = event.target;
        setSelectedCategory(value);
    };

    const handleChangeBrand = (event) => {
        const { value } = event.target;
        setSelectedBrand(value);
    };

    const handleChangePrice = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/[^0-9.]/g, '');
        const validValue = numericValue.replace(/(\..*)\./g, '$1');
        setPrice(validValue);
    };

    const handleChangeQuantity = (event) => {
        const { value } = event.target;
        const numericValue = value.replace(/[^0-9]/g, '');
        setQuantity(numericValue);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await fetchProductCategories();
            if (data) {
                setCategories(data);
            }
        }

        const fetchBrands = async () => {
            const data = await fetchProductBrands();
            if (data) {
                setBrands(data);
            }
        }

        fetchCategories();
        fetchBrands();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (!title || !description || !price || !quantity || !selectedCategory || !selectedBrand) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields',
            });
        }

        const data = {
            title,
            description,
            price,
            stock: quantity,
            category_id: selectedCategory,
            brand_id: selectedBrand,
            sku
        };

        const response = await addProduct(data);
        if (response) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product added successfully',
            }).then(() => {
                navigate('/product');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }

        setLoading(false);
    };

    return (
        <div>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        <Link to="/product" className="btn btn-secondary btn-sm mb-2">
                            <i className="fas fa-arrow-left"></i> Back                    
                        </Link>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <form onSubmit={handleSubmit}>
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">
                                                Add Product
                                            </h6>
                                        </div>
                                        <div className="card-body">                                    
                                            <div className="form-group">
                                                <label htmlFor="title">Product Title</label>
                                                <input type="text" className="form-control" id="title" placeholder='Enter product title' onChange={(e) => {
                                                    setTitle(e.target.value);                                                    
                                                }} />
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="category">Category</label>
                                                    <select id="category" className="form-control" onChange={handleChangeCategory}>
                                                        <option value={''}>Choose...</option>
                                                        {categories.map((category) => (
                                                            <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="brand">Brand</label>
                                                    <select id="brand" className="form-control" onChange={handleChangeBrand}>
                                                        <option value={''}>Choose...</option>
                                                        {brands.map((brand) => (
                                                            <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="price">Price</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="price"
                                                        value={price}
                                                        onChange={handleChangePrice}
                                                        placeholder="Enter price"
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="quantity">Quantity</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="quantity"
                                                        placeholder='Enter quantity'
                                                        value={quantity}
                                                        onChange={handleChangeQuantity}
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label htmlFor="sku">SKU</label>
                                                    <input type="text" className="form-control" id="sku" placeholder='Enter SKU' onChange={(e) => {
                                                        setSku(e.target.value);
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description">Description</label>
                                                <textarea className="form-control" id="description" rows="3" placeholder='Enter product description...' onChange={(e) => {
                                                    setDescription(e.target.value);
                                                }}></textarea>
                                            </div>                                        
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                                {loading ? 'Loading...' : 'Submit'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>                
                </div>
                <Footer />
                </div>
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
        </div>
    );
};

export default AddProduct;