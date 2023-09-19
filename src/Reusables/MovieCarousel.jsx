import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { MovieImages, MoviesByCategory } from '../API_Files/MoviesApi/MoviesApi';
import { Imageurl, w500 } from '../API_Files/AuthKeys';
import Aos from 'aos';
import '../mediaQuery.css'
import { memo } from 'react'
import Skeleton from 'react-loading-skeleton';

const MovieCarousel = (props) => {

  const navigateToPage = useNavigate()

  const filter = props.MultiMovies?.filter((res) => res.backdrop_path !== null)
  const data = filter
  const [MovieData, setMovieData] = useState([]);
  const [ImagesData, setImagesData] = useState({});
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImages = async () => {
        const imagesData = {};
        for (const item of data) {
          try {
            const images = await MovieImages(item.id);
            console.log(images);
            const resp=images.logos.filter((res)=>res.iso_639_1==='en' || res.iso_639_1===null)
            console.log(resp);
            imagesData[item.id] = resp[0]?.file_path || ''; // Store the image URL for each movie ID
          } catch (error) {
            // console.error('Error fetching movie image:', error);
          }
        }
        setImagesData(imagesData);
        const newData = data.map((item, index) => ({
          ...item,
          Logo: imagesData[item.id]
        }))
        // console.log(newData);
        const FilterLogos = newData.filter((res) => res.Logo !== "")
        // console.log(FilterLogos);
        setMovieData(FilterLogos)
        setLoading(false)
      };

      fetchImages();
    }
  }, [props]);

  useEffect(() => {
    Aos.init()
  }, []);

  // const convertMinutesToHours = (minutes) => {
  //   const hours = Math.floor(minutes / 60);
  //   const remainingMinutes = minutes % 60;
  //   return `${hours}h ${remainingMinutes}m`;
  // };


  // console.log(MovieData);

  return (
    <>
      {Loading &&
        <>
          <div className="col-11 mx-auto">
            <Skeleton  className='mx-2' height="60vh" />
          </div>
        </>

      }
      {
        Loading ===false &&
        <div id="carouselExampleIndicators" className="carousel slide mx-3 mb-4 rounded-3" data-ride="carousel">
      <div className="carousel-indicators">

        {MovieData?.map((item, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner rounded-3">
        {MovieData.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            data-bs-interval="5000"
            style={{
              height: "500px",
              width: "100%",
              border: "none",
            }}
          >
            <div
              className="carousel-image MovieImage"
              style={{
                backgroundImage: `linear-gradient(to top, #000 5%, rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                height: "100% ",
                width: "100%",
                border: 'none'
              }}
            >
              <div className="" style={{ height: '100%',  }}>

                <div data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500" 
                  className="ms-5 text-light col-lg-7 col-10 MovieDetails" style={{flex: 1, justifyContent: "end", alignItems: 'end' }}>
                  
                  {ImagesData[item.id] ? (
                    <img
                      style={{ maxHeight: '150px',margin:'140px 0px 40px 0px', justifyContent:'flex-end'}}
                      src={Imageurl + ImagesData[item.id]}
                      className='col-8 text-center MovieDetails logoImage'
                      alt=""
                    />
                  ): <p>{item.title}</p>
                  }
                  {/* <p className='corouselMovie d-none d-sm-block fs-5 MovieDetails text-light'>({item.title})</p> */}
                  {/* <h6 style={{ fontSize: '12px' }} className='p-0 m-0 MovieDetails'>{item.release_date} • {
                    item.original_language
                  } </h6> */}
                  {/* <hr className='col-8 d-none d-sm-block  carouseltext MovieDetails' /> */}
{/* 
                  <p className="card-text carouseltext MovieDetails col-lg-8 col-10 textName line-limit">{item.overview}</p> */}

                  {/* <p className="MovieDetails d-none d-sm-block carouseltext card-text col-6">
                    Popularity: {item.popularity}
                  </p> */}
                  <h5 className='fw-bold MovieDetails carouseltext card-text col-6' style={{ color: '#1a98ff', fontFamily: 'calibri' }}><span onClick={() => navigateToPage(`/${props.type}/${item.id}`)} className='text-light btn btn-outline-dark' style={{ cursor: 'pointer' }}>{'View Details >'}</span>
                  </h5>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>


      <a
        className="carousel-control-prev ms-2"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="prev" // Updated attribute
      >
        <span className="carousel-control-prev-icon " aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className="carousel-control-next me-2"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="next" // Updated attribute
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
      }
    </>




  );
};



export default MovieCarousel
