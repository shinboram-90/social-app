import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import { Spinner } from '../../components/Spinner';
import { PostAuthor } from './PostAuthor';
// import {TimeAgo} from './TimeAgo'
// import {ReactionButtons} from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice';

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        <h3>{post.title}</h3>
      </Link>
      <div>
        {/* <PostAuthor userId={post.userId} /> */}
        {/* <TimeAgo timestamp = {post.date}/> */}
        <div>Author : {post.username}</div>
        <div>{post.created_at}</div>
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      {/* <ReactionButtons post={post}/> */}
      <Outlet />
    </article>
  );
};

export const PostsList = () => {
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
    content = posts.map((post) => <PostExcerpt key={post.id} post={post} />);
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-List">
      <h2>Posts</h2>
      <div>{content}</div>
      <div>Yo: {console.log(postStatus)}</div>
    </section>
  );
};
