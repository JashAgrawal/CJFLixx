"use client";
import React, { useEffect, useRef } from "react";
import ServerTab, { servers } from "./tab";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const PlayerComp = ({
  url,
  id,
  type,
  currEpisode,
  currSeason,
}: {
  url: string;
  id: string;
  type: string;
  currSeason?: string;
  currEpisode?: string;
}) => {
  const [sloading, setSLoading] = React.useState(false);
  const [isMobileScreenLandscape, setIsMobileScreenLandscape] =
    React.useState(false);
  const serverWatchedAt = useSearchParams().get("serverWatchedAt");
  console.log(serverWatchedAt);
  const [activeUrl, setActiveServerUrl] = React.useState(
    serverWatchedAt
      ? servers[parseInt(serverWatchedAt)].getter(
          type,
          id,
          currSeason,
          currEpisode
        )
      : url
  );
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (
        window.screen.orientation.angle === 90 ||
        window.screen.orientation.angle === -90
      ) {
        setIsMobileScreenLandscape(true);
        // Request fullscreen for the iframe
        if (iframeRef.current.requestFullscreen) {
          iframeRef.current.requestFullscreen();
        } else if (iframeRef.current.mozRequestFullScreen) {
          // Firefox
          iframeRef.current.mozRequestFullScreen();
        } else if (iframeRef.current.webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          iframeRef.current.webkitRequestFullscreen();
        } else if (iframeRef.current.msRequestFullscreen) {
          // IE/Edge
          iframeRef.current.msRequestFullscreen();
        }
      }
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    toast("For Ad Free Experience Please Use Brave Browser", {
      id: "brave-browser",
    });
  }, []);

  useEffect(() => {
    setSLoading(true);
    let timer1 = setTimeout(() => {
      setSLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [activeUrl]);

  return (
    <div className="w-full flex flex-col space-y-4 overflow-hidden">
      <div className="w-full relative bg-black rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          id="iframeee"
          src={activeUrl}
          // allow="fullscreen"
          // onClick={handleClick}
          className={`w-full h-full min-h-[30vh] md:min-h-[80vh] rounded-lg ${
            isMobileScreenLandscape ? "min-h-[80vh]" : ""
          }`}
          width={"100%"}
          height={"100%"}
          referrerPolicy="origin"
          // scrolling="no"
          allowFullScreen
          // sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
        {sloading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full min-h-[30vh] md:min-h-[80vh] rounded-lg flex justify-center items-center z-10 bg-black">
            Loading ...
          </div>
        )}
      </div>
      <ServerTab
        alreadyActiveTab={serverWatchedAt ? parseInt(serverWatchedAt) : 0}
        id={id}
        type={type}
        ss={currSeason}
        ep={currEpisode}
        setActiveServerUrl={setActiveServerUrl}
      />
      <p className="text-center text-sm text-gray-300">
        If the current server Doesnt Work please switch the server
      </p>
    </div>
  );
};

export default PlayerComp;
