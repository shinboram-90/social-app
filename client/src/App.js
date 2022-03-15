import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './app/Navbar';
import Missing from './components/Missing';
import Profile from './components/Profile';
import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { EditPostForm } from './features/posts/EditPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { UsersList } from './features/users/UsersList';
import { UserPage } from './features/users/UserPage';
import React from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <AddPostForm />
              <PostsList />
            </React.Fragment>
          }
        >
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="editPost/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="users" element={<UsersList />}>
          <Route path=":userId" element={<UserPage />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </Router>
  );
}

export default App;
