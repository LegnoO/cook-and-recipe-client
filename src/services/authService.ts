// ** Lib
import fetcher from "@/lib/fetcher";

export async function login({ email, password, rememberMe }: LoginCredentials) {
  const response = await fetcher(`/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      rememberMe,
    }),
    credentials: "include",
  });

  await response.json();
}

export async function logout() {
  const response = await fetcher(`/logout`, {
    method: "POST",
  });

  return response.json();
}

export async function getUserInfo() {
  const response = await fetcher(`/user-info`, {
    method: "GET",
  });

  const userInfo = await response.json();
  return userInfo.data;
}

// export async function getUserProfile() {
//   return fetcher("/users/owned/profile");
// }

export async function refreshUser() {
  const rememberMe: boolean = localStorage.getItem("rememberMe")
    ? JSON.parse(localStorage.getItem("rememberMe")!)
    : false;

  const response = await fetcher(`/refresh`, {
    method: "POST",
    body: JSON.stringify({
      rememberMe,
    }),
    credentials: "include",
  });

  await response.json();
}
