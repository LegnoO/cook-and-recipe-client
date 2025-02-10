"use client";

// ** React Imports
import { useState, useEffect, useRef, Fragment, useCallback } from "react";

// ** Next Imports
import { useSearchParams } from "next/navigation";

// ** Components
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

// ** Icons
import { Bell } from "lucide-react";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import {
  getNotificationOwned,
  checkNewNotification,
} from "@/services/client/notificationService";

// ** Utils
import { cn, timeAgo } from "@/utils";

const Notification = () => {
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const sortBy = searchParams.get("sortBy") || "createdDate";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [notificationDetail, setNotificationDetail] = useState("");

  const [notifications, setNotifications] = useState<ListNotifications>([]);
  const [totalMessages, setTotalMessages] = useState<number | null>(null);
  const [index, setIndex] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isAutoFetch, setIsAutoFetch] = useState(false);

  function queryParams() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("index", "1");
    params.set("size", (5 * index).toString());
    params.set("sortOrder", sortOrder);
    params.set("sortBy", sortBy);
    return params.toString();
  }

  function fetchMoreData() {
    setIndex((prev) => prev + 1);
  }

  function autoFetch() {
    fetchMoreData();
    setIsAutoFetch(true);
    setHasMore(true);
  }

  function handleTogglePopover(open: boolean) {
    if (open) {
      fetchNotifications();
    }

    setIsOpenPopover(open);
    if (!notificationResponse || !totalMessages) return;

    if (!open || totalMessages <= 1) {
      setIsAutoFetch(false);
      setHasMore(false);
    }
  }

  const { data: notificationResponse, isLoading } = useQuery({
    queryKey: ["notifications", index],
    queryFn: () => getNotificationOwned(queryParams()),
    ...queryOptionsConfig,
  });

  function toggleNotificationDetail(
    isOpen: boolean,
    id: string,
    status: "read" | "sent" | "unread",
  ) {
    if (isOpen) {
      setNotificationDetail(id);
      if (status !== "read") {
      }
      return;
    }
    setNotificationDetail("");
  }

  const fetchNotifications = useCallback(async () => {
    const newMessage = await checkNewNotification();
    setNotifications((prev) =>
      newMessage.length > 0 ? [...prev, ...newMessage] : prev,
    );
    resetInterval();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkNewNotification]);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      fetchNotifications();
    }, 150000);
  }, [fetchNotifications]);

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  useEffect(() => {
    if (!notificationResponse) return;
    setTotalMessages(notificationResponse.paginate.total);
    setNotifications(notificationResponse.data);

    if (!totalMessages) return;
    if (isAutoFetch) setHasMore(totalMessages > 1);

    if (totalMessages <= 1) setIsAutoFetch(false);

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [notificationResponse]);

  const MessageItem = ({
    notification,
  }: {
    notification: NotificationMessage;
  }) => {
    return (
      <Fragment>
        <Dialog
          open={notificationDetail === notification.id}
          onOpenChange={(open) =>
            toggleNotificationDetail(open, notification.id, notification.status)
          }>
          <DialogTrigger asChild>
            <div className="cursor-pointer p-3 transition-colors hover:bg-secondary/80 [&:not(:last-child)]:border-b">
              <div
                className={cn("relative flex flex-col gap-1", {
                  "opacity-50": notification.status === "read",
                })}>
                <div>
                  <p className="mb-1 text-sm font-semibold">
                    {notification.title}
                  </p>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-placeholder">
                    {timeAgo(notification.createdDate)}
                  </p>
                </div>
                {notification.status === "sent" && (
                  <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
            </div>
          </DialogTrigger>

          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>{notification.title}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-2">
              <p className="col-span-4">{notification.message}</p>
              <p className="col-span-4 text-sm text-placeholder">
                {timeAgo(notification.createdDate)}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  };

  return (
    <Popover open={isOpenPopover} onOpenChange={handleTogglePopover}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="relative h-10 w-10 rounded-full">
          <Bell className="!h-4 !w-4" />
          <span
            className={cn("absolute right-0 top-0 h-2 w-2 rounded-full", {
              "bg-destructive": notifications.some((notification) =>
                notification.status.includes("unread"),
              ),
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <div className="min-w-[240px]">
          <div className="border-b p-3">
            <h3 className="text-sm font-medium lg:text-base">Notifications</h3>
          </div>

          <div
            id="scrollableDiv"
            className="max-h-[calc(100vh-150px)] overflow-auto">
            <InfiniteScroll
              scrollableTarget="scrollableDiv"
              dataLength={notifications.length}
              loader={null}
              next={fetchMoreData}
              hasMore={hasMore}>
              <Fragment>
                {notifications
                  .sort(
                    (a, b) =>
                      new Date(b.createdDate).getTime() -
                      new Date(a.createdDate).getTime(),
                  )
                  .map((notification) => (
                    <MessageItem
                      notification={notification}
                      key={notification.id}
                    />
                  ))}
                {isLoading && (
                  <Fragment>
                    <div className="flex flex-col gap-2 p-3">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[250px]" />
                    </div>

                    <div className="flex flex-col gap-2 border-t p-3">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[250px]" />
                    </div>
                  </Fragment>
                )}
                {!hasMore ||
                  (!isAutoFetch && (
                    <div onClick={autoFetch} className="border-t p-3">
                      <Button className="h-7 w-full px-3.5 py-1.5">
                        View More Notifications
                      </Button>
                    </div>
                  ))}
              </Fragment>
            </InfiniteScroll>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Notification;
