import { Outlet } from 'react-router-dom';

const Logout = () => {
  return (
    <main style={{ padding: 100 }}>
      <h2>Successfully logged out</h2>
      {console.log(localStorage)}
      <Outlet />
    </main>
  );
};

export default Logout;
