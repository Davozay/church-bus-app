import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/admin/login" />;
  }
  
  return children;
};

export default PrivateRoute;