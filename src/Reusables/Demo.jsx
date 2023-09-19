import React, { useEffect, useState } from 'react';
import { searchSongsByMovieName } from '../API_Files/SongsApi/SongsAPI';
import { Spotify } from 'react-spotify-embed';

const Demo = (props) => {
  const [SongsUri, setSongsUri] = useState([]);
  const movieName = (props.name)?.toLowerCase(); // Replace with the actual movie name

  function convertTitle(inputTitle) {
    // Remove unwanted characters, convert to lowercase, and normalize string
    const normalizedTitle = inputTitle
      .replace(/[:.()\[\]{}'"]/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

    // Capitalize the first letter of each word
    const titleArray = normalizedTitle.split(' ');
    const capitalizedTitle = titleArray
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return capitalizedTitle;
  }

  const normalizedMovieName = convertTitle(movieName);
  const titleRegExp = new RegExp(normalizedMovieName, 'i');

  useEffect(() => {
    // const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with the Spotify access token
    searchSongsByMovieName(movieName, "kannada")
      .then((songs) => {
        // console.log('Songs:', songs);
        const filteredSongs = songs.filter((song) => {
          const titleRegex = new RegExp(song.title)
          // console.log(titleRegex === titleRegExp);
        });
        setSongsUri(filteredSongs);
      })
      .catch((error) => {
        // console.error('Error:', error);
      });
  }, [props.name]);

  const songs = SongsUri.map((res) => res.href);
  // console.log(songs);

  return (
    <div className='text-light'>
      <div className="container">
        <div className="col-12">
          <div className="row">
            {songs.map((res) => (
              <div className="col-4" key={res}>
                <Spotify wide link={res} view="list" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
