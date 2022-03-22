import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { useContext } from 'react';
// import useAuth from '../hooks/useAuth';
// import AuthContext from '../context/AuthProvider';

const Profile = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // const navigate = useNavigate();

  return (
    <section style={{ padding: 100 }}>
      <h1>My Profile</h1>
      <br />
      <div>
        <header>
          <div>You are logged in as {user.user[0].username}</div>
        </header>
        {user.user[0].avatar ? (
          <img alt="avatar" src={user.user[0].avatar} />
        ) : (
          ''
        )}
      </div>

      <div className="flexGrow">
        <button>Sign Out</button>
      </div>
    </section>
  );
};

export default Profile;
