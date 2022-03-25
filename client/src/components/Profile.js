import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { EditProfile } from './EditProfile';
import axios from '../api/axios';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const myId = user.user[0].id;

  // const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/profile-edit');
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = () => {
    axios
      .get(`/api/profile/${myId}`)
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data.myPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section style={{ padding: 100 }}>
      <h1>My Profile</h1>
      <br />
      <div>
        <header>
          <div>You are logged in as {user.user[0].username}</div>
        </header>
        {user.user[0].avatar ? (
          <img alt="avatar" src={user.user[0].avatar} />
        ) : (
          ''
        )}
      </div>
      <div>
        <h2>My posts:</h2>
        <ul>
          {posts.map(
            ({
              title,
              id,
              content,
              created_at,
              updated_at,
              status,
              comments,
            }) => (
              <li key={id}>
                <h2>{title}</h2>
                <p>{content}</p>
                <span>{created_at}</span>
                <br />
                <span>{updated_at}</span>
                <br />
                <span>
                  <small>{status}</small>
                </span>
                <p>Number of comments {comments}</p>
                <p>likes:</p>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="flexGrow">
        <button onChange={() => onSubmit()}>Edit profile</button>
      </div>
    </section>
  );
};

export default Profile;
