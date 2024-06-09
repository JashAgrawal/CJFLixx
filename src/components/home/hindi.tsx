import React from "react";
import { FaFire } from "react-icons/fa";
import MovieHistory from "../carousels/scroller";
import TMDB_Api_Service from "@/services/tmdbClient";
import { objToQueryParams } from "@/lib/utils";
import SectionHeading from "../common/sectionHeading";

const HorizontalScroller = async ({
  heading,
  type,
  language,
  country,
  genre,
}: {
  heading: string;
  type: string;
  language?: string;
  country?: string;
  genre?: string;
}) => {
  const filters = {
    include_adult: true,
    with_origin_country: country,
    with_original_language: language,
    with_genres: genre,
  };
  const res = await TMDB_Api_Service.get(
    `/discover/${type}?${objToQueryParams(filters)}`
  );
  const data = res.data.results;
  if (data.length === 0) {
    return null;
  }
  return (
    <div className="w-full px-2 md:px-8">
     <SectionHeading heading={heading}/>
      <MovieHistory movies={data} type={type} />
    </div>
  );
};

export default HorizontalScroller;
