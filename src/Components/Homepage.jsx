import React, { useEffect, useState } from 'react';
import { MovieImages, MoviesByCategory } from '../API_Files/MoviesApi/MoviesApi';
import { Imageurl, Logo } from '../API_Files/AuthKeys';
import { ShowsByCategory } from '../API_Files/TvApi/TvApi';
import Aos from 'aos';
import Card from '../Reusables/Cards';
import CardSecType from '../Reusables/CardsSecType';
import './Details.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../API_Files/usersApi/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedUserData } from '../Store/UserSlice';

const HomePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
    Aos.init();
    
  }, []);

  

  

  const [MovieCards, setMovieCards] = useState([]);
  const [TVCards, setTVCards] = useState([]);
  const isLoggedIn = useSelector(state=>state.userData)

  useEffect(() => {
    //To get Movies
    MoviesByCategory(1, 'upcoming').then((res) => {
      setMovieCards(res.results);
    });

    //To get TV shows
    ShowsByCategory(1, 'popular').then((res) => {
      setTVCards(res.results);
    });
  }, []);

  const Navigate=useNavigate()

  return (
    <div>
    

      <div
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className="col-12 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `linear-gradient(to top, #000 2%, rgba(0,0,0,0)),linear-gradient(to BOTTOM, #000 2%, rgba(0,0,0,0.1)), url(${'https://9to5toys.com/wp-content/uploads/sites/5/2018/07/VUDU-HDX-Weekend-Sale-Friday-the-13th.jpg?quality=82&strip=all&w=1600'})`,
          backgroundSize: '100%',
          height: '100vh',
          width: '100%',
          border: 'none',
          scrollbarWidth: '1px',
        }}
      >
        <div
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500" className="text-light mb-5"  >
          <div className=" mb-3 container mx-auto">

            <h1 data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500" className='text-light fw-bolder py-3' style={{ fontSize: '50px' }}><span className='bg-warning text-dark p-2'>Filmopedia</span></h1>
            <h1 data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500" className='text-light fw-bolder ' style={{ fontSize: '50px' }}>The Movies Database</h1>
            {/* <p className='p-0 m-0 fs-4'> Unleash the World of Movies</p> */}
          <hr className='' />
          <p className='fs-5'>Filmopedia is a cutting-edge movie app that puts the entire world of cinema at your fingertips. With its vast collection of films, comprehensive information, and user-friendly interface, Filmopedia is the ultimate companion for movie lovers of all ages and tastes.</p>
          <h2 className='btn btn-primary' onClick={()=>isLoggedIn?Navigate('/movies'):Navigate('/login')}>{isLoggedIn?"Expolore Movies >":"Log in to Explore >"}  </h2>
          </div>

        </div>

      </div>


      <div className="d-none d-lg-block d-md-none ms-2">
        <Carousel
          responsive={responsive}
          draggable={true}
          autoPlay={true}
          slidesToSlide={2}
          swipeable={true}
          keyBoardControl={true}
        >
          {MovieCards.map((movie, index) => (
            <div key={index} className="col-12">
              <CardSecType category={'movies'} type={'Now_Playing'} data={movie} />
            </div>
          ))}
        </Carousel>

        <h1 className="text-light">TV Shows</h1>
        <Carousel
          responsive={responsive}
          draggable={true}
          slidesToSlide={2}
          swipeable={true}
          keyBoardControl={true}
        >
          {TVCards.map((movie, index) => (
            <div key={index} className="col-12">
              <CardSecType category={'TV shows'} type={'Now_Playing'} data={movie} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="d-block d-lg-none d-md-block mx-2">
        <div className="mb-5 snaps-inline" style={{ display: 'flex', overflowX: 'auto', scrollbarColor: 'green' }}>
          {MovieCards.map((res, index) => (
            <div key={index}>
              <Card category={'movies'} type={'Popular'} data={res} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export default HomePage;
