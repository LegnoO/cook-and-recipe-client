interface NotificationMessage {
  id: string;
  title: string;
  message: string;
  createdDate: string;
  status: "sent" | "read" | "unread";
}

interface NewNotificationMessage extends NotificationMessage {
  status: "unread";
}

type ListNotifications = NotificationMessage[];

interface NotificationResponse {
  data: ListNotifications;
  paginate: Paginate;
}
