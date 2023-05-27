import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isAlreadyFriend = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    if (isAlreadyFriend) {
      return new Response("Already Friends", { status: 400 });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_request`,
      idToAdd
    );

    if(!hasFriendRequest) {
      return new Response('No Friend Request', {status: 400})
    }

    return new Response("Ok");
  } catch (error) {}
}
