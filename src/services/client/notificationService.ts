// ** Lib
import fetcher from "@/lib/fetcher";

export async function getNotificationOwned(
  params: string,
): Promise<NotificationResponse> {
  const res = await fetcher(`/notification/owned/find?${params}`);
  return await res.json();
}

export async function checkNewNotification(): Promise<
  NewNotificationMessage[]
> {
  const res = await fetcher("/notification/check-notification");
  return await res.json();
}
