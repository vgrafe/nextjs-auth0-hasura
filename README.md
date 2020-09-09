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

## Developer Setup

- git clone this repository, then `cd` into it.
- ```bash
  npm install
  ```
- Auth0
  1. Create an account.
  1. Create an application as "Regular Web Application". Note the domain (e.g. `hello.us.auth0.com`), client ID (noisy string of letters and numbers), and client secret (even longer noisy string).
  1. Set allowed callback URLs:
  ```
  http://localhost:3000/api/callback,
  https://*.YOUR-VECEL-ORG.vercel.app/api/callback,
  https://www.YOUR-PRODUCTION-DOMAIN.com/api/callback
  ```
  These are used in development, preview, and production callbacks, respectively.
  1. Set logout URLs:
  ```
  http://localhost:3000/,
  https://*.YOUR-VECEL-ORG.vercel.app/,
  https://www.YOUR-PRODUCTION-DOMAIN.com/
  These are used in development, preview, and production redirects after the user logs out from Auth0.
  ```
- Hasura
  1. Create a Hasura instance. If you're using Hasura Cloud, you'll need a Postgres database URL that looks like `postgresql://user:password@host:5342/dbname`. Once online, set the environment variables:
  1. `HASURA_GRAPHQL_DATABASE_URL`: should be set when you create it.
  1. `HASURA_GRAPHQL_JWT_SECRET`: get this from [https://hasura.io/jwt-config](https://hasura.io/jwt-config). You'll need your login domain from Auth0.
  1. `HASURA_GRAPHQL_ADMIN_SECRET`: make this up with a decent amount of entropy.
  1. `HASURA_GRAPHQL_UNAUTHORIZED_ROLE`: set this to `anonymous`, or something.
  1. [Install Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html). On macOS, you can also just do `brew install hasura-cli`.
  1. `cd hasura`. Your current working directory needs to have the `config.yaml` file at its root.
  1. Update `config.yaml` variables
  1. `admin_secret: ...` where ... is whatever you set for HASURA_GRAPHQL_ADMIN_SECRET.
  1. `endpoint: https://adjective-noun-12.hasura.app/`, except with your instance from before.
  1. Try running `hasura console`, a local webapp should start. Close it.
  1. Run `hasura migration apply` to create tables.
- Auth0
  1. In the section for Rules, set the variables:
  1. `ADMIN_SECRET`: same as the secret, above.
  1. `HASURA_GRAPHQL_URL`: Should include the path, and look something like `https://adjective-noun-12.hasura.app/v1/graphql`, **IMPORTANT** this time include the path.
  1. Add the rules listed in `auth0/rules`, in this order:
  1. `upsert-user.js` - If you use "Try" running this, the first line should say `{"data":{"insert_user":{"affected_rows" : ...`, and you should see a row show up in the `user` table in your database.
  1. `hasura-jwt-claim.js` - If you "Try" running this, the first line should say
     `body {"data":{"user":[{"id": ..."}]}}`, and have an ID that matches the row in your database.
- ```bash
  npm run dev
  ```

## Production Setup on Vercel

- Update `REDIRECT_URI` and `POST_LOGOUT_REDIRECT_URI` in the `vercel.json` file. These are used during build-time for the serverless API endpoints.
- Install the Vercel CLI with

  ```bash
  npm i -g vercel
  ```

  and login with

  ```bash
  vercel login
  ```

- Add vercel secrets:
  ```bash
  vercel secrets add auth0-domain YOURDOMAIN.us.auth0.com
  vercel secrets add auth0-client-id 12345abcdefghijklmnopqrs
  vercel secrets add auth0-client-secret dfsuicpvxu89vdfsa32hjkt23h879fvcs7y81bjkHJDKFY
  vercel secrets add hasura-graphql-url https://adjective-noun-12.hasura.app
  vercel secrets add session-cookie-secret some-random-long-string-you-made-up
  ```
- Add vercel environment variables that are the same for all environments:
  ```bash
  vercel env add AUTH0_DOMAIN          # hello.us.auth0.com
  vercel env add AUTH0_CLIENT_ID       # 12345678
  vercel env add AUTH0_CLIENT_SECRET   # 0102030405060708090A0B0C0D0E0F
  vercel env add SESSION_COOKIE_SECRET # aassddff11223344
  vercel env add SECURE_COOKIE         # asdf1234
  vercel env add HASURA_GRAPHQL_URL    # https://adjective-noun-12.hasura.app
  ```
- No need to add Vercel environment variables for **PREVIEW**, they are calculated at runtime since preview URLs change.
- No need to add Vercel environment variables for **DEVELOPMENT**, if they aren't set they default to an appropriate `localhost:3000` URL.
- Add vercel environment variables for **PRODUCTION**:
  ```bash
  vercel env add REDIRECT_URI # https://www.example.com/api/callback
  vercel env add POST_LOGOUT_REDIRECT_URI # https://www.example.com
  ```

## Notes

- [How to](https://dev.to/mikewheaton/public-graphql-queries-with-hasura-2n06) set up public access on hasura.
