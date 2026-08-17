import { Link } from "react-router-dom";
import "../styles/landing.css";

const Home=()=>{
  return (
    <main className="landing">
      <div className="landing-copy">
        <span className="eyebrow">A secret area for ideas</span>
        <h1>Keep your thoughts<br /><em>hidden.</em></h1>
        <p>Write things down, come back to them later and keep everything that matters in one simple workarea.</p>
        <div className="landing-actions">
          <Link to="/signup" className="button button-primary">
            Create an account
          </Link>
          <Link to="/login" className="button button-secondary">
            Sign in
          </Link>
        </div>
      </div>
      <div className="note-preview" aria-hidden="true">
        <div className="preview-top">
          <span>Tuesday, August 18</span>
          <span>03:12 AM</span>
        </div>
        <div className="preview-line preview-line-short" />
        <div className="preview-line" />
        <div className="preview-line" />
        <div className="preview-line preview-line-medium" />
        <div className="preview-note">
          <span>Things worth remembering</span>
          <strong>don't always come loudly.</strong>
        </div>
      </div>
    </main>
  );
}

export default Home;