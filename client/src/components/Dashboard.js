// import { Outlet, useParams, Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from '../api/axios';

const Dashboard = () => {
  // const params = useParams();
  // const id = params.id;
  // const [post, setPost] = useState([]);

  // useEffect(() => {
  //   const fetchPost = () => {
  //     axios
  //       .get(`/posts/${id}`)
  //       .then((response) => {
  //         console.log(response.data.post[0]);
  //         setPost(response.data.post[0]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   fetchPost();
  // }, [id]);

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Only accessible by admins</p>
    </section>
  );
};

export default Dashboard;
