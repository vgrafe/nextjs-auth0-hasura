# NextJS - Auth0 - Hasura

This repo sits on the shoulders of the following giants:

- https://github.com/auth0/nextjs-auth0
- https://github.com/sandrinodimattia/nextjs-auth0-example
- https://github.com/zeit/next.js/tree/canary/examples/auth0

## Features

- ⚡️ compatible with Next.js 9's Automatic Static Optimization
- 🚫 no custom server code

## Demo

Try it [here](https://nextjs-auth0-hasura.vgrafe.now.sh/)

Please note: the heroku instance might be inactive when you try logging in, resulting in a failed attempt. Try again and it will work. Damn cold starts!

One way I found to avoid this is to make a dummy http call to the heroku instance in an `_app.js` file:

```js
import App from 'next/app';
import fetch from 'isomorphic-unfetch';

fetch(process.env.HASURA_GRAPHQL_URL); // wake up that darn instance!

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
```

## Shortcomings - Help needed!

- The profile page won't display user data initially. I am shrugging this one off as my goal here is to demonstrate consuming Hasura's gql endpoint and only rely on auth0's idToken to do so.
- I can't find out how to seamlessly pass the token via cookies as suggested from [Apollo's](https://github.com/apollographql/apollo-client/issues/4455) [documentation](https://github.com/apollographql/apollo-client/issues/4190) and [issues](https://github.com/apollographql/apollo-client/issues/41900). The current workaround is to set cookie manually after auth, but it's ugly and feels unnecessary when if should be provided out of the box by Apollo.
- the idToken is set/get in a cookie with `js-cookie` in order to add to the headers for calls to hasura (look for all the "TODO remove when cookie solution found" comments). It should be handled out of the box by `nextjs-auth0`, so this might be a mistake/overlook of mine.
- login is janky when using a social button. I don't have much time to troubleshoot this either.
- a proxi api route should be used to avoid exposing the id token in the client, as explained [here](https://github.com/auth0/nextjs-auth0/issues/67#issuecomment-581599845)

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

## Deploy with zeit's now

- Update `REDIRECT_URI` and `POST_LOGOUT_REDIRECT_URI` in the `now.json` file
- add all the secrets (start with @ in the file) [with the cli](https://zeit.co/docs/v2/build-step/#using-environment-variables-and-secrets)

## Notes

- [How to](https://dev.to/mikewheaton/public-graphql-queries-with-hasura-2n06) set up public access on hasura.
