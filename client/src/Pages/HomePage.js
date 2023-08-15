import React from 'react'
import Layout from '../Components/Layout/Layout';
import { useAuth } from '../context/auth';

const HomPage = () => {
  const [auth, setAuth]= useAuth()
  return (
    <Layout>
        <h1>Home Page</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomPage