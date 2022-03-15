import { useSelector } from 'react-redux';

import { Outlet, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { selectUserById } from '../users/usersSlice';
import { selectPostsByUser } from '../posts/postsSlice';

export const UserPage = () => {
  const params = useParams();
  const userId = params.id;

  const user = useSelector((state) => selectUserById(state, userId));

  // const showUser = user.

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId));

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      {console.log(user)}
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      {/* <h2>{user}</h2> */}
      <div>{console.log(user)}</div>

      <ul>{postTitles}</ul>
      <Outlet />
    </section>
  );
};
