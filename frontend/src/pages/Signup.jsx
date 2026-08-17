import { Link } from "react-router-dom";
import "../styles/auth.css";

function Signup() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Start New</span>
        <h1>Create account</h1>
        <p className="auth-description">
          Your notes deserve a place of their own.
        </p>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <label>Name
            <input type="text" placeholder="Your name"/>
          </label>
          <label>Email
            <input type="email" placeholder="jon@example.com"/>
          </label>
          <label>Password
            <input type="password" placeholder="At least 8 characters"/>
          </label>
          <button type="submit" className="button button-primary">
            Create account
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;