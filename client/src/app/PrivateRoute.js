import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
};
