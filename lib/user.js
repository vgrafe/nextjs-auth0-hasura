import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

import jscookie from 'js-cookie'; // TODO remove when cookie solution found

export async function fetchUser(cookie = '') {
  if (typeof window !== 'undefined' && window.__user) {
    return window.__user;
  }

  const res = await fetch(
    '/api/session',
    cookie
      ? {
          headers: {
            cookie
          }
        }
      : {}
  );

  if (!res.ok) {
    delete window.__user;
    jscookie.remove('token'); // TODO remove when cookie solution found
    return null;
  }

  const json = await res.json();
  if (typeof window !== 'undefined') {
    window.__user = json.user;
  }

  json.idToken &&
    !jscookie.get('token') &&
    jscookie.set('token', json.idToken, {
      // TODO remove when cookie solution found
      secure: process.env.SECURE_COOKIE
    });

  return json;
}

export function useFetchUser({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__user)
  );
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.__user || null;
  });

  useEffect(() => {
    if (!loading && user) {
      return;
    }
    setLoading(true);
    let isMounted = true;

    fetchUser().then(user => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        // When the user is not logged in but login is required
        if (required && !user) {
          window.location.href = '/api/login';
          return;
        }
        setUser(user);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
}
