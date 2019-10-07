import React from 'react';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';

function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>
      <h1>Next.js + Auth0 + Hasura</h1>
      <p>
        To test the login click in <i>Login</i>
      </p>
      <p>
        Once you have logged in you should be able to see the logout link and
        the graphql/profile demo pages
      </p>
    </Layout>
  );
}

export default Home;
