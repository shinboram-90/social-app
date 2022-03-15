import { Outlet, useNavigate, Link } from 'react-router-dom';
// import { useContext } from 'react';
// import useAuth from '../hooks/useAuth';
// import AuthContext from '../context/AuthProvider';

const Home = () => {
  // const { auth } = useAuth();
  // const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  //   function displayAvatar{
  // const avatar = auth.user.avatar;

  // if   (avatar === null) {
  // return ""
  // }
  //   }

  // const logout = async () => {
  //   // if used in more components, this should be in context
  //   // axios to /logout endpoint

  //   navigate('/');
  // };

  return (
    <section>
      <Outlet />

      <h1>My Profile</h1>
      <br />
      {/* <div>
        <header as="h2" icon textAlign="center">
          <div>You are logged in as {user.username}</div>
        </header>
        <img alt="avatar" centered size="large" src={user.avatar} />
      </div> */}

      <div className="flexGrow">
        <button>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
