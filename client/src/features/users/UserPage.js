import { useSelector } from 'react-redux';

import { Outlet, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { selectUserById } from '../users/usersSlice';
import { selectPostsByUser } from '../posts/postsSlice';

export const UserPage = () => {
  const params = useParams();
  const userId = params.userId;

  const user = useSelector((state) => selectUserById(state, userId));

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId));

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section style={{ padding: 100 }}>
      {/* <h2>{user}</h2> */}
      <div>{console.log(user)}</div>
      <ul>
        <li>{user.username}</li>
        <li>{user.first_name}</li>
        <li>{user.last_name}</li>
        <li>{user.email}</li>
        <img src={`${user.avatar}`} alt="avatar" />
      </ul>

      <ul>{postTitles}</ul>
      <Outlet />
    </section>
  );
};
