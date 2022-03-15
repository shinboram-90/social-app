import { Link } from 'react-router-dom';
import { selectAllUsers } from '../features/users/usersSlice';
import { useSelector } from 'react-redux';
import Searchbar from './Searchbar';

export const Navbar = () => {
  const users = useSelector(selectAllUsers);

  return (
    <nav>
      <section>
        <h1>Groupomania</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Feed</Link>
            <Link to="/users">Users</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          <Searchbar placeholder="Find a user..." data={users} />
        </div>
      </section>
    </nav>
  );
};
