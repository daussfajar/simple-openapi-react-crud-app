import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clickMenuOpen } from '../../../redux/actions';
// import mainlogo from '../../../assets/img/mainlogo.png';

const Sidebar = () => {
  const dispatch = useDispatch();
  const toggled = useSelector(state => state.menuState.menuOpen);

  const handleToggleClick = () => {
    dispatch(clickMenuOpen());
  };

  return (
    <ul className={toggled ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled' : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'} id="accordionSidebar">
      {/* <!-- Sidebar - Brand --> */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
        <div className="sidebar-brand-icon">
          <i className="fas fa-store"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          MY STORE
        </div>
      </a>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading">
        Interface
      </div>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}
      <li className="nav-item">
        <a className='nav-link collapsed' href="#" data-toggle="collapse" data-target="#collapseTwo" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-store"></i>
          <span>
            Store
          </span>
        </a>
        <div id="collapseTwo" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/product">
              Product
            </Link>
            <Link className="collapse-item" to="/product-categories">
              Product Categories
            </Link>
          </div>
        </div>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* <!-- Sidebar Toggler (Sidebar) --> */}
      <div className="text-center d-none d-md-inline">
        <button onClick={handleToggleClick} className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

export default Sidebar;