# NextJS - Auth0 - Hasura

You might want to get familiar with [nextjs-auth0-example](https://github.com/sandrinodimattia/nextjs-auth0-example) first. This template leans heavily on it, and just adds Hasura on top of it.

## Setup

- clone
- spin up an Hasura instance
  - generate JWT secret, add it to env vars (HASURA_GRAPHQL_JWT_SECRET)
  - optionally add the HASURA_GRAPHQL_UNAUTHORIZED_ROLE var
  - set an HASURA_GRAPHQL_ADMIN_SECRET
- setup an Auth0 account
  - copy domain, client ID, secret into `.env` file
  - add rules found in `auth0` folder
  - add env vars so the rules work
    - ADMIN_SECRET (same than HASURA_GRAPHQL_ADMIN_SECRET)
    - HASURA_GRAPHQL_URL
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
