
import axios from "axios";
import { token } from "../AuthKeys";


//To get TVShows Based on Types
export const ShowsByCategory = async (page, TvType) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${TvType}`, {
          headers: {
            Authorization: token,
            Accept: "application/json",
          },
          params: {
            page: page,
            region: "IN",
            with_original_language: "hi",
          },
        }
      );
      return response.data; // Handle the response data here
    } catch (error) {
      console.error(error);
    }
  };