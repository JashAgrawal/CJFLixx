import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const servers = [
  {
    name: "Server 1",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidsrc.pro/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    name: "Server 2",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidsrc.cc/v2/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    name: "Server 3",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidsrc.icu/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    name: "Server 4",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidsrc.in/embed/${type}?tmdb=${id}${
        type == "tv" ? `&season=${ss || 1}&episode=${ep || 1}` : ""
      }`,
  },
];
const ServerTab = ({
  alreadyActiveTab,
  setActiveServerUrl,
  id,
  type,
  ss,
  ep,
}: {
  alreadyActiveTab: number;
  setActiveServerUrl: (url: string) => void;
  id: string;
  type: string;
  ss?: string;
  ep?: string;
}) => {
  const [activeTab, setActiveTab] = React.useState(alreadyActiveTab || 0);
  const router = useRouter();
  const pathName = usePathname();
  const handleServerChange = async (server: any, si: number) => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("userId", userId);
    }
    setActiveServerUrl(server.getter(type, id, ss, ep));
    setActiveTab(si);
    const res = await axios.post("/api/history", {
      userId,
      id: id,
      type: type,
      serverWatchedAt: si,
      currSeason: ss ? "" + ss : "1",
      currEpisode: ep ? "" + ep : "1",
    });
    router.push(
      pathName +
        "?" +
        new URLSearchParams({ serverWatchedAt: "" + si }).toString()
    );
  };
  return (
    <div className="flex w-full justify-center items-center ">
      <div className="w-full flex space-x-2 rounded-full bg-black bg-opacity-50 backdrop-blur-sm p-2">
        {servers.map((server, si) => (
          <div
            onClick={() => handleServerChange(server, si)}
            key={server.name}
            className={`text-white rounded-full py-2 px-2 md:py-2 md:px-6 text-xs md:text-lg text-center w-full cursor-pointer ${
              activeTab == si ? "bg-gray-600" : ""
            } bg-opacity-40`}
          >
            {server.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerTab;
