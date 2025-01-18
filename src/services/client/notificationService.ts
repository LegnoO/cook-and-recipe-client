// ** Lib
import fetcher from "@/lib/fetcher";

export async function getNotificationOwned(params: string) {
  const response = await fetcher(`/notification/owned/find?${params}`);
  return await response.json();
}

export async function checkNewNotification() {
  const response = await fetcher("/notification/check-notification");
  return await response.json();
}
