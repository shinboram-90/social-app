import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

// import { PostAuthor } from './PostAuthor';
// import {TimeAgo} from './TimeAgo';
// import {ReactionButtons} from './ReactionButtons'
import { selectPostById } from './postsSlice';

import { getComments } from '../comments/commentsSlice';

export const SinglePostPage = () => {
  // const { postId } = match.params;
  const params = useParams();
  const postId = params.postId;
  console.log(postId);

  const { comments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.comments
  );

  console.log(getComments);

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
        {console.log(post)}
        <h2>{post.title}</h2>
        <div>
          {/* <PostAuthor userId={post.username} /> */}
          <div>Author: {post.username}</div>
          <div>Published at: {post.created_at}</div>
          <div>
            {post.updated_at !== post.created_at
              ? `Last edited: ${post.updated_at}`
              : ''}
          </div>
          <img src={`${post.image}`} alt="" />
          <p>
            {comments.map((comment) => (
              <li key={comment.id}>comment</li>
            ))}
          </p>
          <p>{post.comments !== 0 ? post.comments + ' comments' : ''}</p>

          <Link to={`/editPost/${post.id}`} className="button">
            Edit post
          </Link>
        </div>
      </article>
    </section>
  );
};
