import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/My/ProtectedRoute';

import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Brand from './pages/Brand';
import AddBrand from './pages/AddBrand';
import EditBrand from './pages/EditBrand';
import ProductCategories from './pages/ProductCategories';

const MainRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product"
                    element={
                        <ProtectedRoute>
                            <Product />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product/add"
                    element={
                        <ProtectedRoute>
                            <AddProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/brand"
                    element={
                        <ProtectedRoute>
                            <Brand />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/brand/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditBrand />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/brand/add"
                    element={
                        <ProtectedRoute>
                            <AddBrand />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product-categories"
                    element={
                        <ProtectedRoute>
                            <ProductCategories />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default MainRoutes;