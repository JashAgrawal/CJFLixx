import React from "react";
import PlayerComp from "./player";
import TMDB_Api_Service from "@/services/tmdbClient";
import { servers } from "./tab";
import VideoDetails from "../details/details";
import EpisodePicker from "./episodePicker";
import PlayerWrapper from "./playerWrapper";

const VideoPlayer = async ({
  type,
  id,
  currSeason,
  currEpisode,
}: {
  type: string;
  id: string;
  currSeason?: string;
  currEpisode?: string;
}) => {
  const res = await TMDB_Api_Service.get(`/${type}/${id}`);
  const media = res.data;
  return (
    <div className="w-full flex flex-col md:space-y-12 space-y-6 py-6 md:py-12 mt-10">
      <div className="flex md:space-x-4 max-md:flex-col-reverse max-md:space-y-4 px-4 md:px-16">
        {type == "tv" && (
          <EpisodePicker
            seasons={media.seasons}
            id={id}
            ss={currSeason}
            ep={currEpisode}
          />
        )}
        <PlayerWrapper
          id={id}
          type={type}
          currSeason={currSeason}
          currEpisode={currEpisode}
        />
      </div>
      <VideoDetails type={type} id={id} showPlayButton={false} />
    </div>
  );
};

export default VideoPlayer;
