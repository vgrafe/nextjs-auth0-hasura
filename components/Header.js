import Link from 'next/link';

import { useUser } from '../lib/user';

const Header = () => {
  const { user, loading } = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/graphql-ssr">
              <a>graphql-ssr</a>
            </Link>
          </li>
          <li>
            <Link href="/graphql-static">
              <a>graphql-static</a>
            </Link>
          </li>
          {!loading &&
            (user ? (
              <>
                <li>
                  {/* You can use <Link /> here too */}
                  <a href="/profile">profile</a>
                </li>
                <li>
                  <a href="/api/logout">logout</a>
                </li>
              </>
            ) : (
              <li>
                <a href="/api/login">login</a>
              </li>
            ))}
        </ul>
      </nav>

      <style jsx>{`
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
        nav {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:nth-child(2) {
          margin-right: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
