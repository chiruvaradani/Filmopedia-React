import React, { useEffect, useRef, useState } from 'react'
import MovieCarousel from '../Reusables/MovieCarousel'
import { GetTrending, MovieImages, MoviesByCategory } from '../API_Files/MoviesApi/MoviesApi';
import Card from '../Reusables/Cards';
import { Imageurl, Languages } from '../API_Files/AuthKeys';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardSecType from '../Reusables/CardsSecType';
import MyComponent from '../Reusables/Demo';
import TopRated from '../Reusables/TopTenMovies';

const MoviesPage = () => {

  const [InPopularMovies, setInPopularMovies] = useState([]);
  const [PopularMovies, setPopularMovies] = useState([]);
  const [now_playing, setnow_playing] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [TopMovies, setTopMovies] = useState([]);
  const [MultiMovies, setMultiMovies] = useState([]);


  useEffect(() => {
    window.scroll(0, 0)

    MoviesByCategory(1, "popular").then((res) => {
      for (let i = res.results.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res.results[i], res.results[j]] = [res.results[j], res.results[i]];
      }
      setPopularMovies(res?.results)
    })

    MoviesByCategory(1, "now_playing").then((res) => {
      for (let i = res.results.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res.results[i], res.results[j]] = [res.results[j], res.results[i]];
      }
      setnow_playing(res?.results)
    })


    MoviesByCategory(1, "upcoming").then((res) => {
      for (let i = res.results.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res.results[i], res.results[j]] = [res.results[j], res.results[i]];
      }
      setupcoming(res?.results)
    })

    GetTrending('day').then((res)=>{
      const data = res?.results.filter((res) => res?.backdrop_path !== null)
      setMultiMovies(data.slice(0, 10))
      setTopMovies(data.slice(0, 10))
    })




  }, []);

 
  const navigate = useNavigate()
  // console.log(InPopularMovies);

 


  const MoviesList = (props) => {
  
    const navigate = useNavigate()
    return (
      <div className="col-12 list my-4 mt-5 pt-2"  >
        <h3 className='fw-bold ms-2' style={{ color: '#1a98ff', fontFamily: 'calibri' }}>FP  <span className='text-light'>{props.title}</span>
          <span onClick={() => navigate(`/movies/${props?.type}`)} style={{ cursor: 'pointer' }} className='ms-4 text-light fs-6'>{"See More >"} </span></h3>
        <div className="col-12"  style={{ zIndex: 2, display: 'flex', flexDirection: 'row' }}>
        
          <div className='mb-2 snaps-inline'  style={{ display: 'flex', overflowX: 'auto', scrollbarColor: 'green' }} >

            {
              props.data.map((res, index) =>
                <React.Fragment key={index}>
                  <div  data-aos="fade-left"
                    data-aos-duration="1500" className="col-lg-3 col-md-3 col-sm-4 col-xs-5 col-5 mx-2 d-block d-lg-none" >

                    <CardSecType category={"movies"} type={"Now_Playing"} data={res} />
                  </div>
                  <div className="d-none d-lg-block d-md-none mx-2">
                    <Card category={"movies"} type={"Now_Playing"} data={res} />
                  </div>
                </React.Fragment>
              )
            }
          </div>
            
        </div>
      </div>
    )
  }

  
  return (
    <div>
      <MovieCarousel MultiMovies={TopMovies} type={"popular"} />
      <div className="text-success">
        <div className="mx-2 ">
          <div className="col-12 list px-3 my-4" >
            <h3 className='fw-bold ms-2' style={{ color: '#1a98ff', fontFamily: 'calibri' }}><span className='text-light'>Explore in your Language</span>
            </h3>
            <div className="col-12" style={{ zIndex: 2, display: 'flex', flexDirection: 'row' }}>
            
          <div className='mb-2 snaps-inline'  style={{ display: 'flex', overflowX: 'auto', scrollbarColor: 'green' }}>
                {
                  Languages.map((res, i) =>
                    <div key={i} className="col-lg-3 col-md-4 col-6 mx-2" onClick={() => navigate(`/Explore/${res.languageCode}`)}>
                      <div
                        data-aos="fade-left"
                        data-aos-duration="1500"
                        className="card languages text-light card-comp border-0 mx-1 my-3"
                        style={{
                          height: '150px',
                          width: '100%',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          background: "rgb(24,160,231)",
                          background: "linear-gradient(160deg, rgba(24,160,231,1) 0%, rgba(13,80,134,1) 56%, rgba(2,0,36,1) 100%)"
                        }}
                      >
                        <h4>Explore Movies In</h4>
                        <h2 className='text-center'>{res.Language}</h2>
                      </div>

                    </div>
                  )
                }
              </div>
              
            </div>
          </div>
        </div>
        <div className="px-3 p-0 mt-5">
          <MoviesList data={PopularMovies} type={"popular"} title={"Popular Movies"} />
        </div>

        <div className="px-3 p-0 mt-5">
          <TopRated />
        </div>

        <div className="px-3 p-0 mt-5 position-relative">
          <div className="position-relative">
            <MoviesList data={upcoming} type={"upcoming"} title={"Upcoming Movies"} />
          </div>
        </div>

        <div className="px-3 p-0 mt-5" style={{ position: 'relative' }}>
          <div className="" style={{ zIndex: -1 }}>
            <MoviesList data={now_playing} type={"now_playing"} title={"Now Playing"} />
          </div>
        </div>
       



      </div>

    </div>
  )
}

export default MoviesPage
