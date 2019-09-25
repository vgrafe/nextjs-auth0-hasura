import React from 'react';

import auth0 from '../lib/auth0';
import { fetchUser } from '../lib/user';
import Layout from '../components/Layout';

const Profile = session => (
  <Layout>
    <h1>JWT Profile</h1>
    <pre>{JSON.stringify(session, null, 2)}</pre>
  </Layout>
);

Profile.getInitialProps = async ({ req, res }) => {
  if (typeof window === 'undefined') {
    const session = await auth0.getSession(req);
    if (!session) {
      res.writeHead(302, {
        Location: '/api/login'
      });
      res.end();
      return;
    }

    return session;
  }

  const session = await fetchUser();
  return session;
};

export default Profile;
