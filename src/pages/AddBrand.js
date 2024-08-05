import React, {useState} from "react";

import Sidebar from '../components/Navigation/Sidebar';
import Topbar from '../components/Navigation/Topbar';

import Footer from '../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';

// SweetAlert
import Swal from 'sweetalert2';

// services
import {addBrands} from '../services/BrandService';

const AddBrand = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newBrandName = e.target.brandName.value;
        const newBrandDescription = e.target.brandDescription.value;
        
        if(newBrandName === '' || newBrandDescription === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Brand name and description are required!',
            });
            setLoading(false);
        }

        // Add brand
        const addNewBrand = await addBrands({
            name: newBrandName,
            description: newBrandDescription
        });

        if(addNewBrand.success === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: addNewBrand.message,
            });
            setLoading(false);
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Brand added successfully!',
            });
            setLoading(false);
            navigate('/brand');
        }
    }

    return (
        <div>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Add Brand</h6>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="brandName">Brand Name</label>
                                                    <input type="text" className="form-control" id="brandName" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="brandDescription">Brand Description</label>
                                                    <textarea className="form-control" id="brandDescription" rows="3"></textarea>
                                                </div>
                                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                                    {loading ? 'Loading...' : 'Submit'}
                                                </button>
                                                <Link to="/brand" className="btn btn-secondary ml-2">Cancel</Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AddBrand;