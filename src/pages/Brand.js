import React, { useState, useEffect, useRef } from "react";

import Sidebar from '../components/Navigation/Sidebar';
import Topbar from '../components/Navigation/Topbar';

import PageHeading from '../components/PageHeading';
import Footer from '../components/Footer/Footer';

import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";

// services
import fetchBrands from "../services/BrandService";

const Brand = () => {
    const [brands, setBrands] = useState([]);
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);

     useEffect(() => {
        fetchBrands().then((data) => {
            setBrands(data);
        });
    }, []);
    
    useEffect(() => {
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
        }

        if (tableRef.current && brands.length > 0) {
            dataTableRef.current = $(tableRef.current).DataTable({
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                responsive: true
            });
        }
    }, [brands]);

    return (
        <div>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <div className="container-fluid">
                            <PageHeading title="Brand" />
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Brand List</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table ref={tableRef} className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th width="50" className="text-center">No</th>
                                                            <th className="text-left">Brand</th>
                                                            <th className="text-left">Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {brands.map((brand, index) => (
                                                            <tr key={brand.brand_id}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td className="text-left">{brand.brand_name}</td>
                                                                <td className="text-left">{brand.brand_description}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
        </div>
    );
}

export default Brand;