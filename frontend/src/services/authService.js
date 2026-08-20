import apiRequest from "./api";

export async function registerUser(name, email, password) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export async function loginUser(email, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}