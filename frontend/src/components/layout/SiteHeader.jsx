import { Link } from "react-router-dom";
import "../../styles/header.css";

const logoUrl="https://static.vecteezy.com/system/resources/previews/029/722/382/large_2x/notes-icon-in-trendy-flat-style-isolated-on-white-background-notes-silhouette-symbol-for-your-website-design-logo-app-ui-illustration-eps10-free-vector.jpg";

const SiteHeader = () => {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <img src={logoUrl} alt="Notes" className="brand-logo"/>
        <span>Notes App</span>
      </Link>
      <nav>
        <Link to="/login">Sign in</Link>
        <Link to="/signup" className="nav-signup">
          Get started
        </Link>
      </nav>
    </header>
  );
};

export default SiteHeader;