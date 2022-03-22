// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export const PrivateRoute = ({ children, ...rest }) => {
//   // const location = useLocation();
//   // const navigate = useNavigate();
//   const { token, loading } = useSelector((state) => state.auth);
//   if (loading) {
//     return console.log('loading...');
//   }
//   console.log(token);
//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };
