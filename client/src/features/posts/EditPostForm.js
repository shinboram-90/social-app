import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { postUpdated, selectPostById } from './postsSlice';
// import { selectUserById } from '../users/usersSlice';

export const EditPostForm = () => {
  const params = useParams();
  const postId = params.postId;

  const post = useSelector((state) => selectPostById(state, postId));
  // const users = useSelector((state) => selectUserById(state, userId));

  const [title, setTitle] = useState(post.tile);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = async () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit my post</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="Posts's title"
          onChange={onTitleChanged}
        />
      </form>
      <label htmlFor="postContent">Content:</label>
      <textarea
        id="postContent"
        name="postContent"
        placeholder="Posts's Content"
        onChange={onContentChanged}
      />

      <button type="submit" onClick={onSavePostClicked}>
        Modify post
      </button>
    </section>
  );
};
