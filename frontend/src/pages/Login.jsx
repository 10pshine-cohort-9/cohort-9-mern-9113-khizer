import { Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Welcome back</span>
        <h1>Sign in</h1>
        <p className="auth-description">Pick up where you left off.</p>
        <form className="auth-form"onSubmit={(e) => e.preventDefault()}>
          <label>Email
            <input type="email" placeholder="jon@example.com"/>
          </label>
          <label>Password
            <input type="password"placeholder="*******"/>
          </label>
          <button type="submit" className="button button-primary">
            Sign in
          </button>
        </form>
        <p className="auth-footer">Don't have an account? <Link to="/signup">Create one</Link></p>
      </div>
    </main>
  );
}

export default Login;