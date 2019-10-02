import Layout from '../components/layout';
import { withApollo } from '../lib/apollo';
import UserList from '../components/users';
import { useFetchUser } from '../lib/user';

const Static = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading}>
      <h1>Static</h1>
      <UserList />
    </Layout>
  );
};

export default withApollo(Static, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false
});
