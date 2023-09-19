import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MoviesByCategory, fetchGenres, fetchMoviesByGenre } from '../API_Files/MoviesApi/MoviesApi';
import { useParams } from 'react-router-dom';
import Card from '../Reusables/Cards';
import CardSecType from '../Reusables/CardsSecType';
import MovieCarousel from '../Reusables/MovieCarousel';
import Carousel from 'react-multi-carousel';
import { responsive } from './Homepage';
import '../mediaQuery.css'

const MovieGenres = () => {
  const [genres, setGenres] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const params = useParams()
  const containerRef = useRef(null);

  useEffect(()=>{
    window.scroll(0,0)
  })
  
  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300, // Adjust the scroll amount as needed
        behavior: 'smooth',
      }); // Adjust the scroll amount as needed
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: +300, // Adjust the scroll amount as needed
        behavior: 'smooth',
      }); // Adjust the scroll amount as needed
    }
  };

  useEffect(() => {

    MoviesByCategory(1, "popular", params.language).then((res) => {
      for (let i = res.results.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res.results[i], res.results[j]] = [res.results[j], res.results[i]];
      }
      setupcoming(res?.results)
    })

    // Fetch available genres
    fetchGenres()
      .then((genres) => {
        setGenres(genres);

        // Fetch movies for each genre
        const moviesByGenre = {};
        genres.forEach((genre) => {
          fetchMoviesByGenre(genre.id, params.language)
            .then((movies) => {
              moviesByGenre[genre.name] = movies;
              setMoviesByGenre({ ...moviesByGenre });
            })
            .catch((error) => {
              // console.error('Error fetching movies by genre:', error);
            });
        });
      })
      .catch((error) => {
        // console.error('Error fetching genres:', error);
      });
  }, []);
  // console.log(moviesByGenre);

  return (
    <div className=''>
      <MovieCarousel MultiMovies={upcoming} type={"popular"} />
      {Object.keys(moviesByGenre).map((genreId) => (
        <div className="col-11 mt-4 mx-auto" key={genreId}>
          {moviesByGenre[genreId].length > 0 && (
            <>
              <div>
                <h3 className='fw-bold  my-2 ' style={{ color: '#1a98ff', fontFamily: 'calibri' }}>
                  FP <span className='text-light'>{genreId} Movies</span>
                </h3>
              </div>



              <Carousel
                responsive={responsive}
                draggable={true} // Enable manual scrolling with mouse wheel
                // autoPlay={true}
                slidesToSlide={2}
                swipeable={true}
                keyBoardControl={true}
              >
                {moviesByGenre[genreId].map((res, i) => (
                  res && (
                    <React.Fragment key={i}>

                      <div className="d-none d-lg-block d-md-none ">
                        <div className="col-12 mx-2">
                          <CardSecType category={"movies"} type={"Now_Playing"} data={res} />
                        </div>
                      </div>
                    </React.Fragment>
                  )
                ))}
              </Carousel>
              <div className="col-12" style={{ zIndex: 2, display: 'flex', flexDirection: 'row' }}>

                
                <div className='mb-2' style={{ display: 'flex', overflowX: 'auto', scrollbarColor: 'green' }} ref={containerRef}>

                  {moviesByGenre[genreId].map((res, i) => (
                    
                      <React.Fragment key={i}>
                        <div  className="col-lg-2 col-md-4 col-5 ms-3 border-0 d-block d-lg-none">
                          <CardSecType category={"movies"} type={"Now_Playing"} data={res} />
                        </div>
                        <div className="d-none ">
                          <Card category={"movies"} type={"Now_Playing"} data={res} />
                        </div>
                      </React.Fragment>
                    
                  ))}
                </div>
                
              </div>

            </>

          )}
        </div>
      ))}
    </div>

  );
};

export default MovieGenres;
