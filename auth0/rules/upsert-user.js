function upsertUser(user, context, callback) {
  const userId = user.user_id;

  const QUERY_BODY = {
    query:
      'mutation ($userId: bpchar!) {  insert_user(objects: { auth0_user_id: $userId}, on_conflict: {constraint: user_auth0_user_id_key, update_columns: []}) {    affected_rows  }}',
    variables: { userId: userId }
  };

  request.post(
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': configuration.ADMIN_SECRET
      },
      url: configuration.HASURA_GRAPHQL_URL,
      body: JSON.stringify(QUERY_BODY)
    },
    function(error, response, body) {
      if (error) console.log('error', error);
      else console.log(body);
      callback(null, user, context);
    }
  );
}
