import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

// import { PostAuthor } from './PostAuthor';
// import {TimeAgo} from './TimeAgo';
// import {ReactionButtons} from './ReactionButtons'
import { selectPostById } from './postsSlice';

export const SinglePostPage = () => {
  // const { postId } = match.params;
  const params = useParams();
  const postId = params.postId;
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
    <section style={{ padding: 100 }}>
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

          <Link to={`/editPost/${post.id}`} className="button">
            Edit post
          </Link>
        </div>
      </article>
    </section>
  );
};
