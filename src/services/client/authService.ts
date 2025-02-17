// ** Lib
import fetcher from "@/lib/fetcher";

// ** Utils
import { setCookie } from "@/utils/cookies";

export async function getUserProfile() {
  const res = await fetcher(`/users/owned/profile`, { method: "GET" });

  return await res.json();
}

export async function login({ email, password, rememberMe }: LoginCredentials) {
  const res = await fetcher(`/auth/public/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      rememberMe,
    }),
    credentials: "include",
  });

  return await res.text();
}

export async function logout() {
  const response = await fetcher(`/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return await response.text();
}

export async function register(newCredentials: {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}) {
  const res = await fetcher(`/auth/register`, {
    method: "POST",
    body: JSON.stringify(newCredentials),
    credentials: "include",
  });

  await res.json();
}

export async function fetchUserInfo() {
  const res = await fetcher("/users/owned/info", { method: "GET" });

  return await res.json();
}

export async function requestReset(email: string) {
  const res = await fetcher("/auth/request-reset-password", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });

  return await res.text();
}

export async function sendOtp(otp: string) {
  const res = await fetcher(`/auth/verify-otp/${otp}`, {
    method: "POST",
  });

  return await res.text();
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
  const res = await fetcher("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ codeId, password, confirmPassword }),
  });

  return await res.text();
}

export async function refreshUser() {
  const rememberMe: boolean = localStorage.getItem("rememberMe")
    ? JSON.parse(localStorage.getItem("rememberMe")!)
    : false;

  const res = await fetcher(`/auth/refresh`, {
    method: "POST",
    body: JSON.stringify({
      rememberMe,
    }),
    credentials: "include",
  });

  const newToken = await res.text();
  setCookie("accessToken", newToken, {
    path: "/",
    secure: true,
    sameSite: "none",
  });
}
