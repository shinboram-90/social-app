import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AdminRoute = ({ children }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const role = user.user[0].role;
  if (role !== 'admin') {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
};
