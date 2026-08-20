import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import "../../styles/header.css";

const logoUrl="https://static.vecteezy.com/system/resources/previews/029/722/382/large_2x/notes-icon-in-trendy-flat-style-isolated-on-white-background-notes-silhouette-symbol-for-your-website-design-logo-app-ui-illustration-eps10-free-vector.jpg";

function SiteHeader() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <img
          src={logoUrl}
          alt="notes logo"
          className="brand-image"
        />
        <span>Notes App</span>
      </Link>

      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/notes">My notes</Link>

            <button type="button" onClick={logout} className="nav-logout">
              Sign out
            </button>

            <span className="nav-user">
              {user?.name}
            </span>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link>

            <Link to="/signup" className="nav-signup">
              Get started
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default SiteHeader;