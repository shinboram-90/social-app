import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, reset } from '../auth/authSlice';
import Spinner from '../../components/Spinner';

const Login = () => {
  const [userData, setData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = userData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log('Error verify toaster alerts');
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <section style={{ padding: 100 }}>
      <h1>WELCOME TO GROUPOMANIA</h1>

      <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            value={username}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </label>
        {isLoading ? (
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
