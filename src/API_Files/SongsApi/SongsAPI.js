import axios from 'axios';
import { spotifyToken } from '../AuthKeys';



export const searchSongsByMovieName = async (movieName, language) => {
  try {
    // const accessToken = await getAccessToken();
    let name =(encodeURIComponent(movieName).replace(/%20/g, '+'));
    console.log(name==="k.g.f%3A+chapter+2");
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
      params: {
        query: name,
        type: 'album',
        limit:50
      },
    });

    console.log(response.data.albums.items);
    const tracks = response.data.albums.items;
    const songs = tracks.map((track) => ({
      title: track.name,
      type:track.album_type,
      previewUrl: track.images[0],
      language: language,
      href:track.external_urls.spotify
    }));
console.log(tracks);
    return songs;
  } catch (error) {
    console.error('Error searching for songs:', error);
    return [];
  }
};
