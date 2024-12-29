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

export async function fetchUserInfo() {
  const response = await clientFetch("/users/owned/info", { method: "GET" });

  const userInfo = await response.json();

  return userInfo;
}

export async function requestReset(email: string) {
  const response = await clientFetch("/auth/request-reset-password", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });

  return await response.text();
}

export async function sendOtp(otp: string) {
  const response = await clientFetch(`/auth/verify-otp/${otp}`, {
    method: "POST",
  });

  return await response.text();
}

export async function resetPassword({
  codeId,
  password,
  confirmPassword,
}: {
  codeId: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await clientFetch("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ codeId, password, confirmPassword }),
  });

  return await response.text();
}

export async function refreshUser() {
  const rememberMe: boolean = localStorage.getItem("rememberMe")
    ? JSON.parse(localStorage.getItem("rememberMe")!)
    : false;

  const response = await clientFetch(`/auth/refresh`, {
    method: "POST",
    body: JSON.stringify({
      rememberMe,
    }),
    credentials: "include",
  });

  return await response.text();
}
