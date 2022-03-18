import { useState, useEffect } from 'react';
import { getToken } from '../../utils/HelperFunctions';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../auth/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  // const location = useLocation();

  if (token || getToken()) {
    navigate('/profile');
  }
  // const from = location.state?.from?.pathname || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <section>
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
