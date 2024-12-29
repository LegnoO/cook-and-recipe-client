"use client";

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
import { Bell, CheckCheck } from "lucide-react";

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

  const MessageItem = () => {
    return (
      <div className="cursor-pointer border-b border-l-3 border-l-primary p-3 transition-colors hover:bg-secondary/80">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-none">Meeting reminder</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Team meeting in 30 minutes
          </p>
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
        <div className="border-b px-3 py-2">
          <h3 className="text-base font-semibold lg:text-lg">Notifications</h3>
        </div>
        <Scroll className="max-h-[calc(100vh-200px)]">
          <Repeat times={20}>
            <MessageItem />
          </Repeat>
        </Scroll>
        <div className="px-4 py-2">
          <div className="flex cursor-pointer items-center justify-end gap-2">
            <CheckCheck className="h-4 w-4 text-primary" />
            <span className="text-sm">Mark all as read</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Notification;
