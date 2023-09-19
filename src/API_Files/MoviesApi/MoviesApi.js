import axios from "axios"
import { token } from "../AuthKeys";


//To get a Particular Movie based on ID
export const GetMoviesByID=async(id)=>{
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: token,
            Accept: 'application/json'
          },params:{
            language:'en-US'
          }
        });
        return (response.data); // Handle the response data here
      } catch (error) {
        console.error(error);
      }
}

export const FaveMovies=async(id)=>{
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: token,
            Accept: 'application/json'
          },params:{
            language:'en-US'
          }
        });
        return ([response.data]); // Handle the response data here
      } catch (error) {
        console.error(error);
      }
}


//To get a Movie Trailer
export const GetMovieTrailers=async(id,type)=>{
  // console.log(id);
   if(id && type){
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/${type}`, {
        headers: {
          Authorization: token,
          Accept: 'application/json'
        },params:{
          language:'en-US'
        }
      });
      return (response.data); // Handle the response data here
    } catch (error) {
      // console.error(error);
    }
   }
}


//To get Movies on based on Genre ID
export const MoviesByGenre = async(genreId)=>{
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        headers: {
          Authorization: token,
          Accept: 'application/json'
        },
        params:{
          page:1,
          with_genres:genreId,
          language:`all`
        }
      });
      return (response.data); // Handle the response data here
    } catch (error) {
      console.error(error);
    }
}

//To get a particular Movie Category for Ex:PopularMovies, Upcoming etc...

export const MoviesByCategory = async (page, type, lang) => {
  // console.log(type, lang, page);
  try {
    const response1 = await axios.get(`https://api.themoviedb.org/3/movie/${type}`, {
      params: {
        page: page,
        with_original_language: lang
      },
      headers: {
        Authorization: token,
        Accept: 'application/json'
      }
    });

    const response2 = await axios.get(`https://api.themoviedb.org/3/movie/${type}`, {
      params: {
        page: page + 1, // Fetch the next page
        with_original_language: lang
      },
      headers: {
        Authorization: token,
        Accept: 'application/json'
      }
    });

    if (lang) {
      // console.log(response1.data);
      // console.log(response2.data);
    }

    const combinedResults = {
      ...response1.data,
      results: [...response1.data.results, ...response2.data.results] // Combine results from both pages
    };

    return combinedResults;
  } catch (error) {
    console.error(error);
  }
};


//To get a Reviews of particular Movie
export const MovieReview = async(MovieId)=>{
    if(MovieId){
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${MovieId}/reviews`, {
          headers: {
            Authorization: token,
            Accept: 'application/json'
          }
        }); 
        return (response.data);
        // Handle the response data here
      } catch (error) {
        // console.error(error);
      }
    }
}

//To get a Trending Movie
export const GetTrending = async (period) => {
  if(period){
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/${period}?language=hi`, {
        headers: {
          Authorization: token,
          Accept: 'application/json'
        },
        params: {
          media_type: 'movie',
          with_original_language: 'hi' // Specify the language code for Hindi
        }
      });
      return response.data;
      // Handle the response data here
    } catch (error) {
      // console.error(error);
    }
  }
};


//To get a Images of particular Movie
export const MovieImages = async(MovieId)=>{
    if(MovieId){
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${MovieId}/images`, {
          headers: {
            Authorization: token,
            Accept: 'application/json'
          }
        }); 
        return (response.data);
        // Handle the response data here
      } catch (error) {
        console.error(error);
      }
    }
}

//To search a movie by Name
export const SearchMovie = async (searchText) => {
  
  try {
    const formattedSearchText = searchText
    // const formattedSearchText = searchText.split(' ').join('%20');
    // console.log(`https://api.themoviedb.org/3/search/movie?query=${formattedSearchText`);
    
    const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${formattedSearchText}`, {
      headers: {
        Authorization: token,
        Accept: 'application/json'
      },
      params: {
        
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      }
    });
    
    return response.data;
    // Handle the response data here
  } catch (error) {
    console.error(error);
  }
};

//To Get all genre of movie
export const fetchGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,{
        headers: {
          Authorization: token,
          Accept: 'application/json'
        },
      }
    );
    return response.data.genres;
  } catch (error) {
    throw new Error('Error fetching genres:', error);
  }
};
export const fetchMoviesByGenre = async (genreId,lang) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,{
        headers: {
          Authorization: token,
          Accept: 'application/json'
        },
        params: {
          with_genres:genreId,
          with_original_language:lang
        }
      }
    );
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching movies by genre:', error);
  }
};


//To Get all Languages 
export const fetchLanguages = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/configuration/languages`,{
        headers: {
          Authorization: token,
          Accept: 'application/json'
        },
      }

    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    throw new Error('Error fetching genres:', error);
  }
};
