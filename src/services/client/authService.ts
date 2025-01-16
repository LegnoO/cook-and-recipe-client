// ** Lib
import fetcher from "@/lib/fetcher";
import { setCookie } from "@/utils/cookies";

export async function getUserProfile() {
  const response = await fetcher(`/users/owned/profile`, { method: "GET" });

  const userInfo = await response.json();
  return userInfo;
}

export async function login({ email, password, rememberMe }: LoginCredentials) {
  const response = await fetcher(`/auth/public/login`, {
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
  const response = await fetcher(`/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  await response.text();
}

export async function register(newCredentials: {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}) {
  const response = await fetcher(`/auth/register`, {
    method: "POST",
    body: JSON.stringify(newCredentials),
    credentials: "include",
  });

  await response.json();
}

export async function fetchUserInfo() {
  const response = await fetcher("/users/owned/info", { method: "GET" });

  const userInfo = await response.json();

  return userInfo;
}

export async function requestReset(email: string) {
  const response = await fetcher("/auth/request-reset-password", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });

  return await response.text();
}

export async function sendOtp(otp: string) {
  const response = await fetcher(`/auth/verify-otp/${otp}`, {
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
  const response = await fetcher("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ codeId, password, confirmPassword }),
  });

  return await response.text();
}

export async function refreshUser() {
  const rememberMe: boolean = localStorage.getItem("rememberMe")
    ? JSON.parse(localStorage.getItem("rememberMe")!)
    : false;

  const response = await fetcher(`/auth/refresh`, {
    method: "POST",
    body: JSON.stringify({
      rememberMe,
    }),
    credentials: "include",
  });

  const newToken = await response.text();
  setCookie("accessToken", newToken, {
    path: "/",
    secure: true,
    sameSite: "none",
  });
}
