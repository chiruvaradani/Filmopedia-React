import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetMoviesByID, GetMovieTrailers, MovieReview } from '../API_Files/MoviesApi/MoviesApi';
import DetailsCover from '../Reusables/DetailsCover';
import { Imageurl, w500 } from '../API_Files/AuthKeys';
import Aos from 'aos';

import '../App.css'
import SongsComp from '../Reusables/SongsComp';
import Demo from '../Reusables/Demo';

const DetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [MoviedId, setMoviedId] = useState(null);
  const [ParamsId, setParamsId] = useState('');
  const [MovieData, setMovieData] = useState([]);
  const [Trailer, setTrailer] = useState([]);
  const [Videos, setVideos] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [Reviews, setReviews] = useState([]);

  useEffect(() => {
    Aos.init();
    setParamsId(params.id);
    setMoviedId(Number(params.id)); // Update the movie ID when the params change

    GetMoviesByID(Number(params.id)).then((res) => {
      setMovieData(res);
    });
  }, [params.id]); // Add params.id to the dependency array

  useEffect(() => {
    window.scroll(0, 0);

    // Getting the Trailer of Movies
    GetMovieTrailers(MoviedId, 'videos').then((res) => {
      setVideos(res?.results)
      if (res && res.results) {
        setTrailer(res.results.filter((video) => video.type === 'Trailer' || 'Teaser'));
      }
    });

    // Getting the Cast and crews of Movies
    GetMovieTrailers(MoviedId, 'credits').then((res) => {
      if (res) {
        setCasts(res);
      }
    });

    // Getting the Reviews of Movie
    MovieReview(MoviedId).then((res) => {
      setReviews(res);
    });
  }, [MoviedId]);

  const handleIframe = () => {
    var iframe = document.getElementById('myIframe');
    iframe.remove();
  }

  // Getting the Main Official Trailer
  const data = Trailer.filter((video) => video.name.includes('Trailer'));
  const embedUrl = 'https://www.youtube.com/embed/' + data[0]?.key;

  // console.log(Videos);

  return (
    <div>

      <>
        <DetailsCover Trailer={Trailer} MovieData={MovieData} />
        <div className="container">
          <h3 className='mb-4' style={{ color: '#1a98ff' }}>Star Cast</h3>
          <div data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1500" className="col-12  mb-3 mx-auto text-light" style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='mb-2' style={{ display: 'flex', flex: 1, height: '250px', overflowX: 'auto', scrollbarColor: 'green' }}>
              {
                Casts.cast?.map((res,i) =>
                  <div key={i} className="col-lg-2 col-md-3 col-sm-4 col-xs-5 col-6 mb-4 py-4 crewImages" >

                    <div className="card border-0 me-3 px-3" onClick={() => navigate(`/celebrity/${res.id}`)} style={{ borderRadius: '50%', height: '140px', backgroundColor: '#000', cursor: 'pointer' }}>
                      {
                        res.profile_path ?
                          <img title={res.name} style={{ borderRadius: '50%', height: '100%' }} src={w500 + res.profile_path} alt="" /> :
                          res.gender === 1 ?
                            <img style={{ borderRadius: '50%', height: '100%' }} src={"https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-373-456325-512.png"} alt="" /> :
                            <img style={{ borderRadius: '50%', height: '110%' }} src={"https://www.shareicon.net/data/2016/05/24/770124_man_512x512.png"} alt="" />
                      }
                      <div className="card-footer">
                        <p className='text-center text-light p-0 m-0' style={{ fontSize: '14px' }}>{res.name}</p>
                        {
                          res.character &&
                          <p className='text-center text-light p-0 m-0 line-limit1' style={{ fontSize: '10px' }}>As {res.character}</p>
                        }
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <Crews data={Casts.crew} />

        <Production data={MovieData.production_companies} />
        


      </>
    </div>
  )
}

const Crews = (props) => {

  // console.logxw(props.data);
  const [FilteredData, setFilteredData] = useState([]);
  const filteredCrews = {};
  const jobTypes = [...new Set(props.data?.map((crew) => crew.job))]

  jobTypes.forEach((jobType) => {
    filteredCrews[jobType] = props.data?.filter((crew) => crew.job === jobType);
  });

  useEffect(() => {
    setFilteredData(filteredCrews)
  }, [props.data]);


  return (
    <div className="container mt-5 pt-2">
      <h3 className='mb-4' style={{ color: '#1a98ff' }}>Crew Members</h3>
      <div className="col-12">
        <div className="row">
          <div className=" mx-auto text-light" style={{ display: 'flex', flexDirection: 'row' }}>
            <div className=' mb-5' style={{ display: 'flex', flex: 1, overflowX: 'auto' }}>
              {Object.keys(FilteredData).map((jobType) => (
                <div   data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500" className='card p-2 text-light col-lg-2 col-md-3 col-sm-4 col-6 me-2 px-2' style={{ backgroundImage: ` linear-gradient(to bottom right, #1a98ff, rgb(0,0,0,0.9))`, height: '250px' }} key={jobType}>

                  <p className='fw-bolder my-3 p-0'>{jobType}</p>
                  <hr className='p-1 m-1' />
                  <ul className='m-0 p-0' style={{ height: '200px', overflowX: 'auto' }}>
                    {FilteredData[jobType].map((cast) => (

                      <li className='nav-link px-2' key={cast.id}>
                        {cast.name}
                      </li>

                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

const Production = (props) => {
  // console.log(props.data);
  return (

    <div className="container">
      <h3 className='mb-4' style={{ color: '#1a98ff' }}>Production Companies</h3>
      <div className="col-12">
        <div className="row">
          <div className=" mx-auto text-light" style={{ display: 'flex', flexDirection: 'row' }}>
            <div className=' mb-5' style={{ display: 'flex', flex: 1, overflowX: 'auto' }}>
              {
                props.data?.map((res,i) =>
                  <div key={i} className="col-lg-2 col-md-6 col-6 mx-2">
                    <div className="card" style={{ height: '180px', }}>
                      <div className="card-body text-center" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {
                          res.logo_path ?
                            <img style={{ width: '100%', height: '80px', objectFit: 'contain' }} src={w500 + res.logo_path} alt="" /> :
                            <img style={{ width: '40%' }} src={"https://th.bing.com/th/id/R.b74dfdd7c610c2adfa31460dcfbd6c93?rik=o4U8ANG6TStsMg&riu=http%3a%2f%2fwww.sinacloud.com%2fstatic%2fhome%2fimage%2fnot_found.png&ehk=HShQcKn9jz4iIl0Fwg5hursNZiSBdQNC%2b377RickrSs%3d&risl=&pid=ImgRaw&r=0"} alt="" />
                        }
                      </div>
                      <div className="card-footer fw-bolder text-light" style={{ backgroundColor: '#1a98ff' }}>
                        <h6 className='pt-2'>{res.name}</h6>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>


    </div>



  )
}

const VideosComp = (props) => {
  // console.log(props.data);

  const [selectedVideos, setSelectedVideos] = useState('');

  const handleIframeClose = () => {
    setSelectedVideos('');
  };


  return (
    <div className="container">
      <h3 className="mb-4" style={{ color: '#1a98ff' }}>
        Videos
      </h3>
      <div className="col-12" style={{ height: 'auto' }}>
        <div className="row">
          <div className="mx-auto text-light" style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="mb-5" style={{ display: 'flex', flex: 1, overflowX: 'auto' }}>
              {props.data?.map((res) => (
                <div
                  key={res.key}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalVideo"
                  className="card VideoCard col-4 ms-3 text-bg-dark"

                  onClick={() => setSelectedVideos(res.key)}
                >

                  <img className="VideoImage" src={`https://img.youtube.com/vi/${res.key}/hqdefault.jpg`} alt="" />
                  <div className="card-img-overlay Videocontent">
                    <div className="" style={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center', marginTop: '20%' }}>
                      <i className="fa-solid fa-circle-play" style={{ fontSize: '60px' }}></i>
                    </div>
                    <div className="col-12 mt-2 text-center">
                      <h4 className='' >{res.type}</h4>
                      <p>{res.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade " id="exampleModalVideo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-light float-end " style={{ backgroundColor: '#000', flex: 1, justifyContent: 'end', alignItems: 'end', border: 'none' }} >

              <button className="btn text-light float-end" onClick={handleIframeClose} data-bs-dismiss="modal" aria-label="Close">X</button>

            </div>
            {selectedVideos && (
              <iframe
                id="myIframe"
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideos}`}
                title="Embedded Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};




export default DetailsPage
