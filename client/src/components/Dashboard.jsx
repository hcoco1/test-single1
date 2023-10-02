import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

function YourComponent() {
    return (
        <div>

            <nav className="navbar navbar-dark bg-dark">
                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
                        <li className="nav-item" style={{ marginRight: '10px' }}>
                            <Link to="/dashboard/signin" className="nav-link">
                                <FaSignInAlt /> Log in
                            </Link>
                        </li>

                        <li className="nav-item" style={{ marginRight: '10px' }}>
                            <Link to="/dashboard/signup" className="nav-link">
                                <FaSignInAlt /> Register a new Account
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default YourComponent;
