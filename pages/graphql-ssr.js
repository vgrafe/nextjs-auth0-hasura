import Layout from '../components/Layout';
import { withApollo } from '../lib/apollo';
import UserList from '../components/UserList';

const SSR = () => {
  return (
    <Layout>
      <h1>SSR</h1>
      <UserList />
    </Layout>
  );
};

export default withApollo(SSR);
