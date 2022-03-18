import { Link, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const { token, loading } = useSelector((state) => state.auth);
  if (loading) {
    return console.log('loding...');
  }
  <Route
    {...rest}
    render={({ location }) =>
      token ? (
        children
      ) : (
        <Link to={{ pathname: '/login', state: { from: location } }} />
      )
    }
  />;
};
