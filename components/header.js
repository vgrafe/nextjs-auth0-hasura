import Link from 'next/link';

function Header({ user, loading }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="https://github.com/vgrafe/nextjs-auth0-hasura">
              <img src="/gh.png" alt="github logo" className="gh-logo" />
            </a>
          </li>
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
          {!loading &&
            (user ? (
              <>
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
                <li>
                  <Link href="/session">
                    <a>session</a>
                  </Link>
                </li>
                <li>
                  <Link href="/advanced/ssr-session">
                    <a>ssr-session</a>
                  </Link>
                </li>
                <li>
                  <a href="/api/logout">Logout</a>
                </li>
              </>
            ) : (
              <li>
                <a href="/api/login">Login</a>
              </li>
            ))}
        </ul>
      </nav>

      <style jsx>{`
        .gh-logo {
          position: absolute;
          left: 2em;
          transform: translateY(-8px);
        }
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
        nav {
          max-width: 50rem;
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
}

export default Header;
