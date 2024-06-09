"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Badge } from "../ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "../ui/drawer";
import VideoDetailsClient from "../details/detailsClient";
import { useRouter } from "next/navigation";
interface propss {
  id: string;
  name?: string;
  description?: string;
  imgPath?: string;
  genre?: string;
  year?: string;
  rating?: string;
  type?: string;
  ss?: string;
  ep?: string;
  serverWatchedAt?: string;
  isDirectPlayer?: boolean;
}
export function MovieCard({
  id,
  imgPath,
  name,
  description,
  year,
  type,
  rating,
  genre,
  ss,
  ep,
  serverWatchedAt,
  isDirectPlayer = false
}: propss) {
  const router = useRouter();
  return (
    // <Link
    //   href={`${!ss && !ep ? "/details" : ""}/${type}/${id}${
    //     type == "tv" && ss && ep ? `/${ss}/${ep}` : ""
    //   }${serverWatchedAt ? `?serverWatchedAt=${serverWatchedAt}` : ""}`}
    // >
    <Card className="p-0 relative m-0 border-0">
      <CardContent className="p-0 border-0">
        <HoverCard>
          <Drawer>
            <HoverCardTrigger className="">
              {!isDirectPlayer ? (
                <DrawerTrigger>
                  <Image
                    unoptimized
                    src={"https://image.tmdb.org/t/p/w500" + imgPath}
                    width={500}
                    height={500}
                    alt="Movie"
                    className={`w-full rounded-sm overflow-hidden hover:ring-2 hover:scale-110 shadow-black hover:shadow-lg ease-in-out duration-300 hover:ring-red-700 hover:z-[40]`}
                  />
                </DrawerTrigger>
              ) : (
                <Image
                  onClick={() => {
                    if (isDirectPlayer) {
                      router.push(`${!ss && !ep ? "/details" : ""}/${type}/${id}${type == "tv" && ss && ep ? `/${ss}/${ep}` : ""
                        }${serverWatchedAt ? `?serverWatchedAt=${serverWatchedAt}` : ""}`)
                    }
                  }}
                  unoptimized
                  src={"https://image.tmdb.org/t/p/w500" + imgPath}
                  width={500}
                  height={500}
                  alt="Movie"
                  className={`w-full rounded-sm overflow-hidden hover:ring-2 hover:scale-110 shadow-black hover:shadow-lg ease-in-out duration-300 hover:ring-red-700 hover:z-[40]`}
                />
              )}
            </HoverCardTrigger>
            <HoverCardContent
              className="h-full z-[999] border backdrop-blur-sm rounded-lg border-gray-600"
              side="right"
              sideOffset={3}
            >
              <div
                className="w-96 pb-0 bg-black bg-opacity-70 text-white pt-4 rounded-xl z-90 flex flex-col justify-between space-y-2"
                style={{ display: description ? "block" : "none" }}
              >
                <div className="min-h-8 px-4">{name}</div>
                <div className="min-h-8 px-4 pb-2 text-sm text-gray-200">
                  {description}
                </div>
                <div className="flex justify-between py-4 border-t px-4">
                  <Badge variant={"outline"} className="text-white">
                    {type?.toUpperCase()}
                  </Badge>
                  <Badge variant={"outline"} className="text-white">
                    {year?.slice(0, 4)}
                  </Badge>
                  <Badge variant={"outline"} className="space-x-2 text-white">
                    <StarFilledIcon />
                    <p>{rating?.toString()?.slice(0, 3)}</p>
                  </Badge>
                </div>
              </div>
            </HoverCardContent>
            {/* <DrawerOverlay className="fixed h-0 top-0 inset-0 bg-black/40" /> */}

            <DrawerContent className="flex flex-col fixed bottom-0 md:left-8 md:right-8 h-[80vh] md:h-[90vh] p-0 m-0">
              <VideoDetailsClient
                type={type || "movie"}
                id={id}
                showPlayButton={true}
              />
            </DrawerContent>
          </Drawer>
        </HoverCard>
      </CardContent>
    </Card>
    // </Link>
  );
}
