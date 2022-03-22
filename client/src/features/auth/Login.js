import { useState, useEffect } from 'react';
// import { getToken } from '../../utils/HelperFunctions';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const { userData, token, loading } = useSelector((state) => state.auth);
  console.log(userData);

  // const location = useLocation();

  useEffect(() => {
    if (token || localStorage.getItem('token')) {
      console.log('you are logged in');
      console.log(localStorage);
      // navigate('/profile');
    }
  }, []);

  // const from = location.state?.from?.pathname || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <section style={{ padding: 100 }}>
      <h1>WELCOME TO GROUPOMANIA</h1>

      <form onSubmit={handleLogin} method="POST">
        <label htmlFor="username">
          Username
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {loading ? (
          <div className="loading">
            <span>Loading...</span>
          </div>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </section>
  );
};

export default Login;
