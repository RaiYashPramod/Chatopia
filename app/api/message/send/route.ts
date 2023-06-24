import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { Message, messageValidator } from "@/lib/validations/message";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export async function POST(req: Request) {
  try {
    // Parse the request body to extract 'text' and 'chatId'
    const { text, chatId }: { text: string; chatId: string } = await req.json();

    // Retrieve the user session using next-auth's getServerSession
    const session = await getServerSession(authOptions);

    // If session does not exist, return unauthorized response
    if (!session) return new Response("UnAuthorized", { status: 401 });

    // Split the chatId to extract userId1 and userId2
    const [userId1, userId2] = chatId.split("--");

    // Check if the authenticated user's id matches userId1 or userId2
    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response("UnAuthorized", { status: 401 });
    }

    // Determine the friend's user id
    const friendId = session.user.id === userId1 ? userId2 : userId1;

    // Fetch the friend list of the authenticated user from Redis
    const friendList = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:friends`
    )) as string[];

    // Check if the friendId is included in the friend list
    const isFriends = friendList.includes(friendId);

    // If the users are not friends, return unauthorized response
    if (!isFriends) {
      return new Response("UnAuthorized", { status: 401 });
    }

    // Fetch the sender's information from Redis
    const rawSender = (await fetchRedis("get", `user:${session.user.id}`)) as string;
    const sender = JSON.parse(rawSender) as User;

    // Get the current timestamp
    const timestamp = Date.now();

    // Create the message object
    const messageDate: Message = {
      id: nanoid(),
      senderId: session.user.id,
      text,
      timestamp,
    };

    // Parse and validate the message using the messageValidator
    const message = messageValidator.parse(messageDate);

    // Notify the client about the incoming message using Pusher
    await pusherServer.trigger(toPusherKey(`chat:${chatId}`), "incoming-message", message);

    // Notify the friend's client about the new message using Pusher
    await pusherServer.trigger(toPusherKey(`user:${friendId}:chats`), "new_message", {
      ...message,
      senderImg: sender.image,
      senderName: sender.name,
    });

    // Store the message in the database using Redis' zadd command
    await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message),
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
