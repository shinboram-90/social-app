import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import { Spinner } from '../../components/Spinner';
import { selectAllPosts, fetchPosts, deletePost } from './postsSlice';

const PostExcerpt = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <article
      style={{ paddingBottom: 10 }}
      className="post-excerpt"
      key={post.id}
    >
      <Link to={`/posts/${post.id}`} className="button">
        <h3>{post.title}</h3>
      </Link>
      <div>
        {/* <PostAuthor userId={post.userId} /> */}
        {/* <TimeAgo timestamp = {post.date}/> */}

        <img src={post.image} alt="" crossOrigin="true" />

        <p>{post.content}</p>
        <div>Author : {post.username}</div>
        <p>Number of comments {post.comments}</p>
        <div>{post.created_at}</div>
      </div>
      {/* <select className="post-content">{post.content.substring(0, 100)}</select> */}

      {/* <ReactionButtons post={post}/> */}

      <button onClick={() => dispatch(deletePost(post.id))}>delete</button>
    </article>
  );
};

export const PostsList = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  // posts.map((post) => <PostExcerpt key={post.id} post={post} />)

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === 'succeeded') {
    content = posts.map((post, i) => <PostExcerpt key={post.id} post={post} />);
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <article style={{ padding: 100 }} className="posts-List">
      <h1 style={{ padding: 10 }}>Posts</h1>
      <div>{content}</div>
    </article>
  );
};
