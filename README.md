# NextJS - Auth0 - Hasura

## short term todo

- need the actual user ID once logged in
  - add the user id to the claims in the auth0 rule?
  - revert to using auth0id as pk on the user table? (would need user merging, paid plan)
  - load user from DB instead of just oauth (so we get all info + row id)?

## Install

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

- I can't figure out how to make the access token (id token?) properly accessible. Right now it is stored in the cookie. Also waiting after [support for refresh token](https://github.com/sandrinodimattia/nextjs-auth0-example/issues/2) gets implemented.
- Forked from the superb example at [nextjs-auth0-example](https://github.com/sandrinodimattia/nextjs-auth0-example)
- [How to](https://dev.to/mikewheaton/public-graphql-queries-with-hasura-2n06) set up public access on hasura.

# nextjs-auth0-example README

This example shows how you can use `@auth0/nextjs-auth` to easily add authentication support to your Next.js application.

## Configuring Auth0

Go to the [Auth0 dashboard](https://manage.auth0.com/) and create a new application of type _Web Application_ and make sure to configure the following:

- _Allowed Callback URLs_: Should be set to `http://localhost:3000/api/callback` when testing locally or typically to `https://myapp.com/api/callback` when deploying your application.
- _Allowed Logout URLs_: Should be set to `http://localhost:3000/` when testing locally or typically to `https://myapp.com/` when deploying your application.

### Configuring Next.js

In the Next.js configuration file (`next.config.js`) you'll see that different environment variables are being loaded in the server runtime configuration.

### Local Development

For local development you'll just want to create a `.env` file with the necessary settings:

```

AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET
REDIRECT_URI=http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
SESSION_COOKIE_SECRET=viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWuq4Jd0P7ymgG5GJGMpvMneXZzhK3sL (at least 32 characters, used to encrypt the cookie)

```

### Hosting in Now.sh

When deploying this example to Now.sh you'll want to update the `now.json` configuration file:

```json
{
  "build": {
    "env": {
      "AUTH0_DOMAIN": "YOUR_AUTH0_DOMAIN",
      "AUTH0_CLIENT_ID": "YOUR_AUTH0_CLIENT_ID",
      "AUTH0_CLIENT_SECRET": "@auth0_client_secret",
      "REDIRECT_URI": "https://my-website.now.sh/api/callback",
      "POST_LOGOUT_REDIRECT_URI": "https://my-website.now.sh/",
      "SESSION_COOKIE_SECRET": "@session_cookie_secret",
      "SESSION_COOKIE_LIFETIME": 7200
    }
  }
}
```

Some of these values are settings and can just be added to your repository if you want. Others are actual secrets and need to be created as such using the `now` CLI:

```bash
now secrets add auth0_client_secret YOUR_AUTH0_CLIENT_SECRET
now secrets add session_cookie_secret viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWuq4Jd0P7ymgG5GJGMpvMneXZzhK3sL
```

## About this sample

This sample tries to cover a few topics:

- Signing in
- Signing out
- Loading the user on the server side and adding it as part of SSR (`/pages/profile.js`)
- Loading the user on the client side and using fast/cached SSR pages (`/pages/index.js`)
- API Routes which can load the current user (`/pages/api/me.js`)
- Using hooks to make the user available throughout the application (`/lib//user.js`)
