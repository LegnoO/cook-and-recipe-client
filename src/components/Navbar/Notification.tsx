"use client";

// ** React Imports
import { useState, useEffect, Fragment } from "react";

// ** Next Imports
import { useSearchParams } from "next/navigation";

// ** Components
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [notifications, setNotifications] = useState<ListNotifications>([]);
  const [index, setIndex] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isAutoFetch, setIsAutoFetch] = useState(false);

  function queryParams() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("index", "1");
    params.set("size", (5 * index).toString());

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

  function handleClosePopover(open: boolean) {
    // || false => fix with total
    if (!open || false) {
      setIsAutoFetch(false);
      setHasMore(false);
    }
    setIsOpenPopover(open);
  }

  const { data: notificationResponse, isLoading } = useQuery({
    queryKey: ["notifications", index],
    queryFn: () => getNotificationOwned(queryParams()),
    ...queryOptionsConfig,
  });

  useEffect(() => {
    const idTimeout = setInterval(() => {
      async function check() {
        const newMessage = await checkNewNotification();

        setNotifications((prev) =>
          newMessage.length > 0 ? [...prev].concat(newMessage) : prev,
        );
      }
      check();
    }, 10000);

    return () => {
      clearTimeout(idTimeout);
    };
  }, []);

  useEffect(() => {
    if (notificationResponse) {
      setNotifications(notificationResponse);
      if (isAutoFetch) setHasMore(notificationResponse.length > 0 || false);
      // || false => fix with total
      if (false) {
        setIsAutoFetch(false);
      }
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [notificationResponse]);

  const MessageItem = ({
    notification,
  }: {
    notification: NotificationMessage;
  }) => {
    return (
      <Fragment>
        <div className="cursor-pointer p-3 transition-colors hover:bg-secondary/80 [&:not(:last-child)]:border-b">
          <div
            className={cn("relative flex flex-col gap-1", {
              "opacity-50": notification.status === "read",
            })}>
            <div className="flex flex-col">
              <p className="mb-1 text-sm font-medium leading-none">
                {notification.title}
              </p>
              <p className="mb-2 text-sm text-muted-foreground">
                {notification.message}
              </p>
              <p className="text-sm text-placeholder">
                {timeAgo(notification.createdDate)}
              </p>
            </div>
            {notification.status === "sent" && (
              <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Popover open={isOpenPopover} onOpenChange={handleClosePopover}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="relative h-10 w-10 rounded-full">
          <Bell className="!h-5 !w-5" />
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
        <div className="min-w-72">
          <div className="border-b p-3">
            <h3 className="text-sm font-medium lg:text-base">Notifications</h3>
          </div>

          <div
            id="scrollableDiv"
            className="max-h-[calc(100vh-300px)] overflow-auto">
            <InfiniteScroll
              scrollableTarget="scrollableDiv"
              dataLength={notifications.length}
              loader={null}
              next={fetchMoreData}
              hasMore={hasMore}>
              <Fragment>
                {notifications.map((notification) => (
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
              </Fragment>
            </InfiniteScroll>
          </div>

          {!isAutoFetch && (
            <div onClick={autoFetch} className="border-t p-3">
              <Button className="h-7 w-full px-3.5 py-1.5">
                View More Notifications
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Notification;
