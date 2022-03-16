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

// import {
//   EuiHeader,
//   EuiHeaderLogo,
//   EuiHeaderLinks,
//   EuiHeaderLink,
//   EuiHeaderSectionItemButton,
//   EuiBadge,
//   EuiIcon,
//   EuiAvatar,
//   useEuiTheme,
// } from '@elastic/eui';
// import { Link } from 'react-router-dom';
// import { selectAllUsers } from '../features/users/usersSlice';
// import { useSelector } from 'react-redux';
// import Searchbar from './Searchbar';

// import React from 'react';

// export const Navbar = () => {
//   const { euiTheme } = useEuiTheme();
//   const users = useSelector(selectAllUsers);

//   return (
//     <nav>
//       <EuiHeader
//         theme="dark"
//         sections={[
//           {
//             items: [
//               <EuiHeaderLogo>GROUPOMANIA</EuiHeaderLogo>,
//               <EuiHeaderLinks aria-label="App navigation dark theme example">
//                 <EuiHeaderLink isActive>
//                   <Link to="/users">Users</Link>
//                 </EuiHeaderLink>
//                 <EuiHeaderLink>
//                   <Searchbar placeholder="Find a user..." data={users} />
//                 </EuiHeaderLink>

//                 <EuiHeaderLink iconType="help">
//                   <Link to="/">Feed</Link>
//                 </EuiHeaderLink>
//               </EuiHeaderLinks>,
//             ],
//             borders: 'right',
//           },
//           {
//             items: [
//               <EuiBadge
//                 color={euiTheme.colors.darkestShade}
//                 iconType="arrowDown"
//                 iconSide="right"
//               >
//                 <Link to="/profile">Profile</Link>
//               </EuiBadge>,
//               <EuiHeaderSectionItemButton
//                 aria-label="2 Notifications"
//                 notification={'2'}
//               >
//                 <EuiIcon type="cheer" size="m" />
//               </EuiHeaderSectionItemButton>,
//               <EuiHeaderSectionItemButton aria-label="Account menu">
//                 <EuiAvatar name="John Username" size="s" />
//               </EuiHeaderSectionItemButton>,
//             ],
//             borders: 'none',
//           },
//         ]}
//       />
//       <section>
//         <div className="navContent">
//           <div className="navLinks">
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </div>
//         </div>
//       </section>
//     </nav>
//   );
// };
