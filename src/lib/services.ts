import TMDB_Api_Service from "@/services/tmdbClient";

export const quickSearch = async (query: string) => {
    const res = await TMDB_Api_Service.get("/search/keyword" + `?query=${query}`);
    return res.data.results
  }
  export const fullSearch = async (query: string) => {
    const res = await TMDB_Api_Service.get("/search/multi" + `?query=${query.split(" ").join("+").split("%20").join("+")}&include_adult=true`);
    return res.data.results;
  }