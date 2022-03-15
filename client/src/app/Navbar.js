import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Groupomania</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Feed</Link>
            <Link to="/users">Users</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
