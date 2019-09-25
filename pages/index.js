import React from 'react';

import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <h1>Next.js + Auth0 + Hasura</h1>
      {/* 
      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in{' '}
            <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )} */}
    </Layout>
  );
}
