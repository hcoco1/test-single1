import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

function NavigationBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
          <li className="nav-item" style={{ marginRight: '10px' }}>
            <Link to="/" className="nav-link">
              <FaHome /> Home
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '10px' }}>
            <Link to="/dashboard" className="nav-link">
              <FaSignInAlt /> Sign In / Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              <FaSignOutAlt /> Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;