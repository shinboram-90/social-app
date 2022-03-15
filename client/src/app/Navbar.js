import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Groupomania</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Feed</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
