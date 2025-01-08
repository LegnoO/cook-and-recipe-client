import serverFetch from "@/lib/serverFetch";

export async function getUserProfile() {
  const response = await serverFetch(`/users/owned/profile`);

  const userInfo = await response.json();
  return userInfo;
}
