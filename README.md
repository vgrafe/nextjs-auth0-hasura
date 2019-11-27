# NextJS - Auth0 - Hasura

This repo sits on the shoulders of the following giants:

- https://github.com/auth0/nextjs-auth0
- https://github.com/sandrinodimattia/nextjs-auth0-example
- https://github.com/zeit/next.js/tree/canary/examples/auth0

## Features

- ⚡️ uses Next.js 9 with Automatic Static Optimization
- 🚫 no custom server code

## Demo

Try it [here](https://nextjs-auth0-hasura.vgrafe.now.sh/)!

## Shortcomings - Help needed!

- The profile page won't display user data initially. I am shrugging this one off as my goal here is to demonstrate consuming Hasura's gql endpoint and only rely on auth0's idToken to do so.
- I can't find out how to seamlessly pass the token via cookies as suggested from [Apollo's](https://github.com/apollographql/apollo-client/issues/4455) [documentation](https://github.com/apollographql/apollo-client/issues/4190) and [issues](https://github.com/apollographql/apollo-client/issues/41900). The current workaround is to set cookie manually after auth, but it's ugly and feels unnecessary when if should be provided out of the box by Apollo.

## Setup

- git clone this repository
- spin up an Hasura instance
  - generate JWT secret, add it to env vars (HASURA_GRAPHQL_JWT_SECRET)
  - optionally add the HASURA_GRAPHQL_UNAUTHORIZED_ROLE var
  - set an HASURA_GRAPHQL_ADMIN_SECRET
- setup an Auth0 account
  - copy domain, client ID, secret into `.env` file
  - add rules found in `auth0` folder (looks like `upsert-user.js` should be above the claim one)
  - add env vars so the rules work
    - ADMIN_SECRET (same than HASURA_GRAPHQL_ADMIN_SECRET)
    - HASURA_GRAPHQL_URL
  - set callback/redirect URL in your app
- fill in `hasura/config.yaml` file
- ```bash
  cd hasura
  hasura migrate apply
  ```
- ```bash
  yarn
  yarn dev
  ```

## Notes

- [How to](https://dev.to/mikewheaton/public-graphql-queries-with-hasura-2n06) set up public access on hasura.
