import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postsSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user.user[0].id;

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewPost({ title, content, user: userId })).unwrap();
        setTitle('');
        setContent('');
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <section>
      <h2>Add a new post</h2>
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

      <span>Author: {user.user[0].username}</span>

      <label htmlFor="postContent">Content:</label>
      <textarea
        id="postContent"
        name="postContent"
        placeholder="Posts's Content"
        onChange={onContentChanged}
      />

      <button type="submit" onClick={onSavePostClicked} disabled={!canSave}>
        Publish Post
      </button>
    </section>
  );
};
