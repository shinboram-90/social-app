import { Link, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Link to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />;
};
