"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createArrayOfArrays } from "../details/details";
import useActiveSeason from "@/context/currSeason";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Loading from "../common/loading";
import TMDB_Api_Service from "@/services/tmdbClient";
const getSeasonDetails = (seriesId: string, seasonNumber?: number | string) => {
  return TMDB_Api_Service.get(`/tv/${seriesId}/season/${seasonNumber || 1}`);
};

const EpisodePicker = ({
  seasons,
  id,
  ss,
  ep,
}: {
  seasons: any[];
  id: string;
  ss?: string;
  ep?: string;
}) => {
  const router = useRouter();
  const [activeSeasonNumber, setActiveSeasonNumber] = useState(ss || "1");
  const [episodes, setEpisodes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const activeEpRef = React.useRef(null);
  const params = useSearchParams();

  useEffect(() => {
    getSeasonDetails(id, activeSeasonNumber).then((res) => {
      console.log(activeSeasonNumber, ss);
      // console.log(res.data.episodes);
      setEpisodes(res.data.episodes);
    });
  }, [ss, id, activeSeasonNumber]);

  const scrollToElement = () => {
    const { current } = activeEpRef;
    if (current) {
      //@ts-ignore
      current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToElement();
  }, [ss, ep, id]);

  const handleClick = async (newEp: number) => {
    setLoading(true);
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("userId", userId);
    }
    await axios.post("/api/history", {
      userId,
      id: id,
      type: "tv",
      currSeason: activeSeasonNumber ? activeSeasonNumber : "1",
      currEpisode: newEp ? "" + newEp : "1",
    });
    setLoading(false);
    router.push(
      `/tv/${id}/${activeSeasonNumber}/${newEp}${
        params.has("serverWatchedAt")
          ? `?serverWatchedAt=${params.get("serverWatchedAt")}`
          : ""
      }`
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col space-y-2 w-full h-full md:w-1/3 pt-4 pb-0 max-md:mt-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
      <div className="px-4">
        <Select
          defaultValue={ss ? ss : activeSeasonNumber.toString()}
          onValueChange={(val) => {
            setActiveSeasonNumber(val);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                seasons.find(
                  (season: any) => season.season_number == activeSeasonNumber
                )?.name || `Season ${activeSeasonNumber}`
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {seasons
                // .filter((season: any) => season.name !== "Specials")
                .map((season: any) => (
                  <SelectItem key={season.id} value={"" + season.season_number}>
                    {season.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid md:grid-cols-1 max-h-[30vh] md:max-h-[76vh] md:min-h-[76vh] overflow-y-auto px-4">
        {episodes.map((episode: any, ei) => (
          <div
            ref={
              `${ei + 1}` == ep && `${activeSeasonNumber}` == ss
                ? activeEpRef
                : null
            }
            onClick={() => handleClick(ei + 1)}
            // href={`/tv/${id}/${activeSeasonNumber+1}/${ei + 1}`}
            key={episode.episode_number}
            className={`text-white text-lg rounded-lg text-center p-4 bg-black bg-opacity-30 m-1 cursor-pointer ${
              `${ei + 1}` == ep && `${activeSeasonNumber}` == ss
                ? "ring-2 ring-red-500"
                : ""
            }`}
            // style={{ backgroundColor: ((`${ei + 1}` == currEpisode) && (`${si + 1}` == currSeason)) ? "red" : "black" }}
          >
            <span className="">{episode.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodePicker;
