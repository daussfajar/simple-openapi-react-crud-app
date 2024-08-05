/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clickMenuOpen } from '../../../redux/actions';
import circle from '../../../assets/img/circle.png';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const Topbar = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const toggled = useSelector(state => state.menuState.menuOpen);

    useEffect(() => {
        let fullname = Cookies.get('fullname');
        let email = Cookies.get('email');

        if (fullname && email) {
            setFullname(fullname);
            setEmail(email);
        }
    }, []);

    const handleMenuOpen = () => {
        dispatch(clickMenuOpen());
    };

    const logoutModal = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been logged out',
                    icon: 'success',
                    showConfirmButton: false,
                }).then(() => {
                    Cookies.remove('token');
                    Cookies.remove('fullname');
                    Cookies.remove('email');
                    window.location.href = '/';
                })
            }
        });
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow justify-content-between">
            {/* Sidebar Toggle (Topbar) */}
            <button onClick={handleMenuOpen} id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            {fullname}
                        </span>
                        <img className="img-profile rounded-circle" src={circle} />
                    </a>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a className="dropdown-item" onClick={logoutModal}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Topbar;