import Layout from '../components/Layout';
import { withApollo } from '../lib/apollo';
import UserList from '../components/UserList';
import { useFetchUser } from '../lib/user';

const SSR = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <h1>SSR</h1>
      <UserList />
    </Layout>
  );
};

export default withApollo(SSR);
