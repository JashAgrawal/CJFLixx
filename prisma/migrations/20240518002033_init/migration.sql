-- CreateEnum
CREATE TYPE "MediaTypes" AS ENUM ('movie', 'tv');

-- CreateTable
CREATE TABLE "WatchHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "poster_path" TEXT,
    "title" TEXT NOT NULL,
    "media_type" "MediaTypes" NOT NULL DEFAULT 'movie',
    "season_number" TEXT,
    "episode_number" TEXT,
    "media_id" INTEGER NOT NULL,
    "watched_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("id")
);
