import Layout from '../components/Layout';
import { withApollo } from '../lib/apollo';
import UserList from '../components/UserList';

const Static = () => {
  return (
    <Layout>
      <h1>Static</h1>
      <UserList />
    </Layout>
  );
};

export default withApollo(Static, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false
});
