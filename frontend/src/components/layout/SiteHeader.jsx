import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import "../../styles/header.css";

const logoUrl =
  "https://static.vecteezy.com/system/resources/previews/029/722/382/large_2x/notes-icon-in-trendy-flat-style-isolated-on-white-background-notes-silhouette-symbol-for-your-website-design-logo-app-ui-illustration-eps10-free-vector.jpg";

function SiteHeader() {
  const { isLoggedIn, user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  function handleLogout() {
    setProfileOpen(false);
    logout();
  }

  return (
    <>
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

              <button
                type="button"
                className="nav-user"
                onClick={() => setProfileOpen(true)}
                aria-label="Open profile"
              >
                {user?.name}
                <span className="nav-user-arrow">⌄</span>
              </button>
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

      {profileOpen && (
        <div
          className="profile-overlay"
          onClick={() => setProfileOpen(false)}
        >
          <aside
            className="profile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-drawer-header">
              <div>
                <span className="profile-eyebrow">Account</span>
                <h2>Profile</h2>
              </div>

              <button
                type="button"
                className="profile-close"
                onClick={() => setProfileOpen(false)}
                aria-label="Close profile"
              >
                ×
              </button>
            </div>

            <div className="profile-info">
              <div className="profile-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <h3>{user?.name || "User"}</h3>
                <p>{user?.email || "No email available"}</p>
              </div>
            </div>

            <div className="profile-section">
              <span className="profile-section-title">Account</span>

              <Link
                to="/notes"
                className="profile-option"
                onClick={() => setProfileOpen(false)}
              >
                <span>
                  <strong>My notes</strong>
                  <small>View and manage your notes</small>
                </span>

                <span className="profile-option-arrow">→</span>
              </Link>
            </div>

            <div className="profile-drawer-footer">
              <button
                type="button"
                className="profile-logout"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default SiteHeader;