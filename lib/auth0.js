import absoluteUrl from 'next-absolute-url'
import { initAuth0 } from '@auth0/nextjs-auth0'

const getConfigWith = (baseURL) => ({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: process.env.AUTH0_SCOPE,
  domain: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.REDIRECT_URI || `${baseUrl}/api/callback`,
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI || `${baseUrl}/`,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET,
    cookieLifetime: process.env.SESSION_COOKIE_LIFETIME,
    // Store the id_token in the session. Defaults to false.
    storeIdToken: true,
    // Store the access_token in the session. Defaults to false.
    storeAccessToken: false,
    // Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: true,
  },
})

export default (request) => {
  const requestUrl = absoluteUrl(request).origin
  return initAuth0(getConfigWith(requestUrl))
}
