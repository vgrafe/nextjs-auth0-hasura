require('dotenv').config();

module.exports = {
  target: 'serverless',
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: 'openid profile offline_access',
    REDIRECT_URI:
      process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
    POST_LOGOUT_REDIRECT_URI:
      process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/',
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    HASURA_GRAPHQL_URL: process.env.HASURA_GRAPHQL_URL,
    SESSION_COOKIE_LIFETIME: 7200 // 2 hours
  }
};
