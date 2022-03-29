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

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => {
    const upload = e.target.files[0];
    setImage(URL.createObjectURL(upload));
    console.log(image);
  };

  const onSavePostClicked = async () => {
    if (title && content && image) {
      dispatch(postUpdated({ id: postId, title, content, image: image }));
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
          placeholder={post.title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postImage">Upload an image:</label>
        <input
          type="file"
          id="postImage"
          name="postImage"
          accept=".jpg, .jpeg, .png"
          onChange={onImageChanged}
          placeholder={post.image}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          placeholder={post.content}
          onChange={onContentChanged}
        />

        <button type="submit" onClick={onSavePostClicked}>
          Modify post
        </button>
      </form>
    </section>
  );
};
