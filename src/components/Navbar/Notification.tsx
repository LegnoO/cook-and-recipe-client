"use client";

// ** React Imports
import { useEffect } from "react";

// ** Components
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Repeat from "@/components/Repeat";
import { Scroll } from "@/components/Scroll";

// ** Icons
import { Bell } from "lucide-react";

// ** Config

const Notification = () => {
  // const [messages, setMessages] = useState<any>(null);
  // console.log("🚀 ~ Notification ~ messages:", messages);

  // useEffect(() => {
  //   let errCount = 0;
  //   const accessToken = getCookieValue("accessToken");

  //   async function test() {
  //     const testRes = await clientFetch("/notification/check-notification", {
  //       method: "GET",
  //     });
  //     console.log("🚀 ~ useEffect ~ test:", await testRes.json());
  //   }
  //   test();
  //   const eventSource = new EventSourcePlus(
  //     `https://cook-and-recipe.vercel.app/api/notification/check-notification/continuous`,
  //     {
  //       maxRetryInterval: 10000,
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     },
  //   );
  //   const controller = eventSource.listen({
  //     onMessage(message) {
  //       console.log(message);
  //     },

  //     onResponseError({ request, response, options }) {
  //       errCount++;
  //       if (errCount >= 10) {
  //         controller.abort();
  //       }
  //     },
  //   });
  // }, []);

  useEffect(() => {
    const idTimeout = setInterval(() => {
      // console.log("ok");
    }, 2000);

    return () => {
      clearTimeout(idTimeout);
    };
  }, []);

  const MessageItem = () => {
    return (
      <div className="cursor-pointer p-3 transition-colors hover:bg-secondary/80 [&:not(:last-child)]:border-b">
        <div className="relative flex flex-col gap-1">
          <div className="flex flex-col">
            <p className="mb-1 text-sm font-medium leading-none">
              Meeting reminder
            </p>
            <p className="mb-2 text-sm text-muted-foreground">
              Team meeting in 30 minutes
            </p>
            <p className="text-sm text-placeholder">1 hour ago</p>
          </div>
          <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="relative h-10 w-10 rounded-full">
          <Bell className="!h-5 !w-5" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <div className="min-w-72">
          <div className="border-b px-3.5 py-3">
            <h3 className="text-sm font-medium lg:text-base">Notifications</h3>
          </div>
          <Scroll className="max-h-[calc(100vh-200px)]">
            <Repeat times={4}>
              <MessageItem />
            </Repeat>
          </Scroll>
          <div className="border-t p-3.5">
            <Button className="h-7 w-full px-3.5 py-1.5">
              View All Notifications
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Notification;
