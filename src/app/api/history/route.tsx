import { prisma } from "@/client/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
  const req = await request.json();
  const {
    userId,
    id,
    type,
    currSeason,
    currEpisode,
    poster_path,
    title,
    serverWatchedAt,
  } = req;
  const inHistory = await prisma.watchHistory.findFirst({
    where: {
      userId: "" + userId,
      media_id: "" + id,
      media_type: type == "tv" ? "tv" : "movie",
    },
  });
  if (inHistory) {
    await prisma.watchHistory.update({
      where: {
        id: "" + inHistory.id,
      },
      data: {
        season_number: type == "tv" ? currSeason : "1",
        episode_number: type == "tv" ? currEpisode : "1",
        watched_at: new Date(),
        serverWatchedAt: serverWatchedAt ? "" + serverWatchedAt : "0",
      },
    });
  } else {
    await prisma.watchHistory.create({
      data: {
        userId: userId as string,
        poster_path: poster_path,
        title: title,
        media_id: "" + id,
        media_type: type == "tv" ? "tv" : "movie",
        season_number: type == "tv" ? "" + currSeason : "",
        episode_number: type == "tv" ? "" + currEpisode : "",
        watched_at: new Date(),
      },
    });
  }

  return NextResponse.json({ success: true, userId });
}

export async function GET(req: NextRequest) {
  const userId = cookies().get("userId")?.value;
  const history = await prisma.watchHistory.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      watched_at: "desc",
    },
  });
  return NextResponse.json(history);
}
