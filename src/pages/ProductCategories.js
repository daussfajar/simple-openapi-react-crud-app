import React, { useState, useEffect, useRef } from "react";

import Sidebar from '../components/Navigation/Sidebar';
import Topbar from '../components/Navigation/Topbar';

import PageHeading from '../components/PageHeading';
import Footer from '../components/Footer/Footer';

import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";

// services
import fetchProductCategories from "../services/ProductCategoriesService";

const ProductCategories = () => {
    const [productCategories, setProductCategories] = useState([]);
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);

    useEffect(() => {
        fetchProductCategories().then((data) => {
            setProductCategories(data);
        });
    }, []);
    
    useEffect(() => {
        if (dataTableRef.current) {
            dataTableRef.current.destroy();
        }

        if (tableRef.current && productCategories.length > 0) {
            dataTableRef.current = $(tableRef.current).DataTable({
                paging: true,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    }, [productCategories]);

    return (
        <div>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <div className="container-fluid">
                            <PageHeading title="Product Categories" />
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Product Categories List</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table ref={tableRef} className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Name</th>
                                                            <th>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {productCategories.map((category) => (
                                                            <tr key={category.category_id}>
                                                                <td>{category.category_id}</td>
                                                                <td>{category.category_name}</td>
                                                                <td>{category.category_description}</td>
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
        </div>
    );
}

export default ProductCategories;