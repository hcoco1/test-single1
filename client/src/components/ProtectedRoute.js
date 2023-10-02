import { useData } from '../dataContext/DataContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useData();

  if (isAuthenticated) {
    return (
      <div>
        {children}
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

export default ProtectedRoute;



