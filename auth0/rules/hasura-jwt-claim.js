function hasuraJwtClaim(user, context, callback) {
  const QUERY_BODY = {
    // could get roles here
    query: `{
              user(where: {auth0_user_id: {_eq: "${user.user_id}"}}) {
                  id
                }
            }`
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
      else {
        console.log('body', body);
        context.idToken['https://hasura.io/jwt/claims'] = {
          'x-hasura-default-role': 'user',
          'x-hasura-allowed-roles': ['user'], // can add custom logic to decide allowed roles
          'x-hasura-user-id': JSON.parse(body).data.user[0].id
        };
        callback(null, user, context);
      }
    }
  );
}
