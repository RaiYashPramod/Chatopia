"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface FriendRequestSidebarOptionProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}

const FriendRequestSidebarOption: FC<FriendRequestSidebarOptionProps> = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unSeenRequestCount, setUnSeenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_request`)
    );

    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const friendRequestHandler = () => {
      setUnSeenRequestCount((prev) => prev + 1);
    };

    const addedFriendHandler = () => {
      setUnSeenRequestCount((prev) => prev - 1);
    };

    pusherClient.bind("incoming_friend_request", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_request`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
      pusherClient.unbind("incoming_friend_request", friendRequestHandler);
      pusherClient.unbind("new_friend", addedFriendHandler);
    };
  }, [sessionId]);

  return (
    <Link
      href="/dashboard/requests"
      className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-200 hover:bg-gray-50 dark:hover:bg-slate-700 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 dark:text-gray-200 border-gray-200 dark:border-gray-400 group-hover:border-indigo-600 dark:group-hover:border-indigo-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-200 flex w-6 h-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medim bg-white dark:bg-slate-800">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend Requests</p>

      {unSeenRequestCount > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600">
          {unSeenRequestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestSidebarOption;
