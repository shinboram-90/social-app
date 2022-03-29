import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postsSlice';

export const AddPostForm = () => {
  const title = useRef(null);
  const content = useRef(null);
  const image = useRef(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user.user[0].id;

  const canSave = [title, content, userId].every(Boolean);

  const onSavePostClicked = async () => {
    const data = {
      title: title.current.value,
      content: content.current.value,
      image: image.current.files[0],
      user: userId,
    };
    try {
      await dispatch(addNewPost(data)).unwrap();
      title.current.value = null;
      content.current.value = null;
    } catch (err) {
      console.error('Failed to save the post: ', err);
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
          ref={title}
          required
        />

        <label htmlFor="postImage">Upload an image:</label>

        <input
          type="file"
          id="postImage"
          name="postImage"
          accept=".jpg, .jpeg, .png"
          ref={image}
        />

        <div>Author: {user.user[0].username}</div>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          placeholder="Posts's Content"
          ref={content}
          required
        />

        <button type="submit" onClick={onSavePostClicked} disabled={!canSave}>
          Publish Post
        </button>
      </form>
    </section>
  );
};
