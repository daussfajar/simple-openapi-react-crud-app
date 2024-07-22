import React from 'react';

// Navigation
import Sidebar from '../components/Navigation/Sidebar';
import Topbar from '../components/Navigation/Topbar';

import PageHeading from '../components/PageHeading';

const Dashboard = () => {
  return (
    <div>
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar />
                <div className="container-fluid">
                <PageHeading title="Dashboard" />            
                </div>
            </div>
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Your Website 2019</span>
                </div>
                </div>
            </footer>
            </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>
    </div>
  );
};

export default Dashboard;
