import axios from "axios";
import { token } from "../AuthKeys";

//To get a details of a specific actor
export const ActorDetailsApi = async (ActorID) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${ActorID}?language=en-US`,{
          headers: {
            Authorization: token,
            Accept: 'application/json'
          },
          
        }
      );
      return response.data;
    } catch (error) {
      // throw new Error('Error fetching movies by genre:', error);
    }
  };

//To get a details of a specific actor
export const ActorMovies = async (ActorID) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${ActorID}/movie_credits?language=en-US`,{
          headers: {
            Authorization: token,
            Accept: 'application/json'
          },
          
        }
      );
      return response.data;
    } catch (error) {
      // throw new Error('Error fetching movies by genre:', error);
    }
  };

//To get a details of a specific actor
export const ActorImages = async (ActorID) => {
    try {
      const response = await axios.get(
        
        `https://api.themoviedb.org/3/person/${ActorID}/images`,{
          headers: {
            Authorization: token,
            Accept: 'application/json'
          },
          
        }
      );
      return response.data;
    } catch (error) {
      // throw new Error('Error fetching movies by genre:', error);
    }
  };