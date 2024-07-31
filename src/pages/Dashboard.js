import React from 'react';

// Navigation
import Sidebar from '../components/Navigation/Sidebar';
import Topbar from '../components/Navigation/Topbar';

import PageHeading from '../components/PageHeading';
import Footer from '../components/Footer/Footer';

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
                <Footer />
            </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>
    </div>
  );
};

export default Dashboard;
