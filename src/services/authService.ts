// ** Utils
import AxiosInstance from "@/lib/apiClient";
import fetcher from "@/lib/apiServer";

export async function login({ email, password, rememberMe }: LoginCredentials) {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      rememberMe,
    }),
  });
  if (!response.ok) {
    const errorData = await response.text();
    throw errorData;
  }
  return response.json();
}

export async function getUserInfo() {
  const response = await AxiosInstance.get<User>("/users/owned/info");

  return response.data;
}

export async function getUserProfile() {
  return fetcher("/users/owned/profile");
}

export async function refreshUser(rememberMe: boolean) {
  const response = await AxiosInstance.post<AuthTokens>("/auth/refresh", {
    rememberMe,
  });
  const newToken = response.data;
  localStorage.setItem("access-token", newToken);

  return response.data;
}
