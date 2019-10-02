import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const LOGGED_USER_Q = gql`
  {
    user {
      name
    }
  }
`;

export default function LoggedUser() {
  const { loading, error, data } = useQuery(LOGGED_USER_Q);

  return loading ? (
    <p>loading...</p>
  ) : (
    <pre>{JSON.stringify(error || data, null, 2)}</pre>
  );
}
