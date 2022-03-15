import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Navbar } from './app/Navbar';

import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { EditPostForm } from './features/posts/EditPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import React from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          render={() => (
            <React.Fragment>
              <AddPostForm />
              <PostsList />
            </React.Fragment>
          )}
        />
        <Route path="/posts/:postId" element={SinglePostPage} />
        <Route path="/editPost/:postId" element={EditPostForm} />
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
