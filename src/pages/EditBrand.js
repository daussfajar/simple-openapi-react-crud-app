import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Navigation/Sidebar';
import Topbar from '../components/Navigation/Topbar';
import Footer from '../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchBrandsById, editBrands } from '../services/BrandService';
import Swal from 'sweetalert2';

const EditBrand = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [brandName, setBrandName] = useState('');
    const [brandDescription, setBrandDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBrandData = async (brandId) => {
            const response = await fetchBrandsById(brandId);

            if (response && response.data) {
                const brandData = response.data[0];
                setBrandName(brandData.brand_name);
                setBrandDescription(brandData.brand_description);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Brand not found',
                }).then(() => {
                    navigate('/brand');
                });
            }
        };

        fetchBrandData(id);
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!brandName || !brandDescription) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields',
            });
            setLoading(false);
            return;
        }

        const data = {
            name: brandName,
            description: brandDescription,
        };

        const response = await editBrands(id, data);
        
        if (response) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Brand updated successfully',
            }).then(() => {
                navigate('/brand');
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
                            <Link to="/brand" className="btn btn-secondary btn-sm mb-2">
                                <i className="fas fa-arrow-left"></i> Back                    
                            </Link>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">Edit Brand</h6>
                                            </div>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="brandName">Brand Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="brandName" 
                                                        placeholder='Enter brand name' 
                                                        value={brandName} 
                                                        onChange={(e) => setBrandName(e.target.value)} 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="brandDescription">Brand Description</label>
                                                    <textarea 
                                                        className="form-control" 
                                                        id="brandDescription" 
                                                        rows="3" 
                                                        placeholder='Enter brand description...' 
                                                        value={brandDescription}
                                                        onChange={(e) => setBrandDescription(e.target.value)}
                                                    ></textarea>
                                                </div>                                        
                                            </div>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                                    {loading ? 'Loading...' : 'Submit'}
                                                </button>
                                                <Link to="/brand" className="btn btn-secondary ml-2">Cancel</Link>
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

export default EditBrand;