import NowPlaying from "@/components/home/NowPlaying";
import HorizontalScroller from "@/components/home/hindi";
import HistoryList from "@/components/home/historyList";
import Section from "@/components/home/section";
import TrendingAll from "@/components/home/trendingAll";
import TMDB_Api_Service from "@/services/tmdbClient"

export default async function Home() {
  const res = await TMDB_Api_Service.get("/trending/all/week");
  const movies = res.data.results;
  return (
    <div className="flex flex-col items-center ">
      <NowPlaying/>
      <TrendingAll/>
      <HistoryList/>
      <HorizontalScroller heading="Hollywood Movies" type="movie" language="en" country="US"/>
      <HorizontalScroller heading="Hollywood Tv Shows" type="tv" language="en" country="US"/>
      <HorizontalScroller heading="Bollywood Movies" type="movie" language="hi" country="IN"/>
      <HorizontalScroller heading="Horror Movies" type="movie" genre="27"/>
      <Section isTv={false}/>
      <Section isTv={true}/>
      <div className="w-full h-16"></div>
    </div>
  )
}
