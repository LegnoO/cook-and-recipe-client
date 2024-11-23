// ** Lib
import clientFetch from "@/lib/clientFetch";


export async function login({ email, password, rememberMe }: LoginCredentials) {
  const response = await clientFetch(`/auth/public/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      rememberMe,
    }),
    credentials: "include",
  });

  return await response.text();
}

export async function logout() {
  const response = await clientFetch(`/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  await response.text();
}

export async function getUserInfo() {
  const response = await clientFetch("/users/owned/info", { method: "GET" });

  const userInfo = await response.json();

  return userInfo;
}

export async function refreshUser() {
  const rememberMe: boolean = localStorage.getItem("rememberMe")
    ? JSON.parse(localStorage.getItem("rememberMe")!)
    : false;

  const response = await clientFetch(`/refresh`, {
    method: "POST",
    body: JSON.stringify({
      rememberMe,
    }),
    credentials: "include",
  });

  await response.json();
}
