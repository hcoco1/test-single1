import React from 'react';
import { useLogout } from './useLogout'; // Import the custom hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const SignOut = () => {
  const handleLogout = useLogout(); // Use the custom hook to get the logout function
  const navigate = useNavigate(); // Use useNavigate to navigate to a different route

  const handleLogoutClick = () => {
    // Call the logout function when the button is clicked
    handleLogout();

    // Redirect the user to the home page ("/") after logout
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default SignOut;

