import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { PostAuthor } from './PostAuthor';
// import {TimeAgo} from './TimeAgo';
// import {ReactionButtons} from './ReactionButtons'
import { selectPostById } from './postsSlice';

export const SinglePostPage = () => {
  // const { postId } = match.params;
  const params = useParams();
  const postId = params.id;
  console.log(postId);

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found !</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.username} />
          <span>Published at: {post.created_at}</span>
          <Link to={`/editPost/${post.id}`} className="button">
            Edit post
          </Link>
        </div>
      </article>
    </section>
  );
};