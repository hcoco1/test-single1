import { Link } from 'react-router-dom';
import {FaSignInAlt, FaChild } from 'react-icons/fa';

import { Outlet } from 'react-router-dom';
import '../index.css';

function Dashboard() {
    return (
        <div>

            <nav className="navbar navbar-dark bg-dark">
                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
                        <li className="nav-item" style={{ marginRight: '10px' }}>
                            <Link to="." className="nav-link">
                                <FaSignInAlt /> Log in
                            </Link>
                        </li>

                        <li className="nav-item" style={{ marginRight: '10px' }}>
                            <Link to="/dashboard/signup" className="nav-link">
                                <FaSignInAlt /> Register a new Account
                            </Link>
                        </li>

                        
                        <li className="nav-item" style={{ marginRight: '10px' }}>
                            <Link to="/dashboard/users" className="nav-link">
                                <FaChild /> USERS
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default Dashboard;
