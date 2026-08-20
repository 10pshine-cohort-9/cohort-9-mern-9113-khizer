import { useState } from "react";
import AuthContext from "./AuthContext";
import { loginUser, registerUser } from "../services/authService";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  function saveLogin(result) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    setToken(result.token);
    setUser(result.user);

    return result;
  }

  async function login(email, password) {
    const result = await loginUser(email, password);
    return saveLogin(result);
  }

  async function register(name, email, password) {
    const result = await registerUser(name, email, password);
    return saveLogin(result);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoggedIn: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;