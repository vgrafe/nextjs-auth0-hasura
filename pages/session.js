import React from 'react';

// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'
import { useFetchUser } from '../lib/user';
import Layout from '../components/layout';

function SessionCard({ user }) {
  return (
    <>
      <h1>Session</h1>

      <div>
        <h3>Session (client rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  );
}

function Session() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <SessionCard user={user} />}
    </Layout>
  );
}

export default Session;
