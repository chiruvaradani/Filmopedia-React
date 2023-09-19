import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import '../mediaQuery.css'
import UserFaveCards from '../Reusables/UserFaveCards'
import { FaveMovies, GetMoviesByID } from '../API_Files/MoviesApi/MoviesApi'
import { useNavigate } from 'react-router-dom'
import './settings.css'

const Profile = () => {
    const userData = useSelector(state => state.userData)
    const [watchList, setWatchList] = useState([]);
    const [favMoviesList, setfavMoviesList] = useState([]);
    // const [moviesIds, setMoviesIds] = useState(userData.watchlist);
    // console.log(userData);
    const navigate = useNavigate()

    const date = (new Date(userData.createdAt).toDateString());
    let a = (date.split(' '));
    const FinalDate = (a[1] + " " + a[3])



    useEffect(() => {
        // console.log(userData.watchlist);
        fetchMovies()
    }, [userData]);

    const fetchMovies = async () => {
        let MoviesArray = []
        let FavMoviesArray = []

        if (userData.watchlist?.length || userData.favMovies?.length) {
            for (const res of userData.watchlist) {
                // console.log(res);//[1,2,3,4]
                const resp = await FaveMovies(res);
                MoviesArray.push(...resp);
                // console.log("MoviesArray", MoviesArray);
            }
            setWatchList(MoviesArray)

            for (const res of userData.favMovies) {
                // console.log(res);//[1,2,3,4]
                const resp = await FaveMovies(res);
                FavMoviesArray.push(...resp);
                // console.log("FavMoviesArray", FavMoviesArray);
            }
            setfavMoviesList(FavMoviesArray)
        }


        else {
            setfavMoviesList([])
            setWatchList([])
        }
    }


    const handleChange = (event) => {
        // do something with event data
        // console.log(event);
    }

    // console.log(watchList);


    return (
        <div className='text-light ' >
            <div className="col-12" style={{ backgroundImage: 'radial-gradient(at 15%top,#32112c 0,#000 100%)', zIndex: 0 }}>
                <div className="innercontent" style={{ backgroundImage: 'url(https://everything-to-love.com/wp-content/uploads/2022/04/Multicolor-e1642082969124-1024x374.png) ', height: 'auto', backgroundSize: 'cover', zIndex: 1 }}>
                    <div className="row mt-5 pt-4" style={{ backgroundImage: 'linear-gradient(to top, #000 2%, rgba(0,0,0,0.1))' }}>
                        <div className="col-lg-4 col-md-4 col-sm-6 mx-auto col-12 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <div className="col-12 m-4" style={{ height: "200px", objectFit: 'cover', width: '200px',backgroundColor:'#fff',borderRadius:'50%',overflow:'hidden' }}>

                                <img src={userData.profile && userData.profile} style={{ objectFit: 'contain', width: '100%', height: '100%' }} alt="" />


                            </div>
                        </div>

                        <div className="col-lg-8 textClass col-md-8 col-12 " style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <div className="fs-4 font-size-reduced">
                                <h1 className='font-size-reduced'>{userData.Username}</h1>
                                <h6 className='font-size-reduced' style={{ opacity: 0.7, fontSize: '14px' }}>Member since {FinalDate}</h6>
                                <h4 className='font-size-reduced'>{userData.email}</h4>
                                {/* <div className="textClass text-center my-2" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left' }}>
                                    <button className='btn font-size-reduced btn-primary me-2 btn-sm'><i class="fa-solid fa-pen"></i> &nbsp; Edit Profile</button>
                                    <button className='btn font-size-reduced btn-danger me-2 btn-sm'><i class="fa-solid fa-close"></i> &nbsp;Delete Profile</button>
                                    <button className='btn font-size-reduced btn-info me-2 btn-sm'><i class="fa-solid fa-power-off"></i> &nbsp;Logout</button>
                                </div> */}
                                <div className="textClass text-center" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left' }}>
                                    <div className="me-3" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>
                                        <h6 className='font-size-reduced'>Watchlists</h6>
                                        <h3 className='font-size-reduced'>{userData.watchlist?.length}</h3>
                                    </div>
                                    <div className="me-3" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>
                                        <h6 className='font-size-reduced'>Favorites</h6>
                                        <h3 className='font-size-reduced'>{userData.favMovies?.length}</h3>
                                    </div>
                                    <div className="me-3" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>
                                        <h6 className='font-size-reduced'>Watchlists</h6>
                                        <h3 className='font-size-reduced'>{userData.watchlist?.length}</h3>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="container">
                    <div className="col-12 my-3">
                        <h2>Your Watchlist <span className='float-end fs-6 pt-2 pe-2 seeMore' onClick={() => navigate('/user/watchlist')}>See More</span></h2>
                        <div className="" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'revert', overflow: 'auto', position: 'relative' }}>
                            {
                                watchList ?
                                    watchList?.map((data) =>
                                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 mx-2" style={{ display: 'flex', flexDirection: "row", flexWrap: 'nowrap' }}>
                                            <UserFaveCards data={data} type={'watchlist'} />
                                        </div>
                                    ) :
                                    <h4 className="text-light">No Movies Found</h4>
                            }
                            {/* <div className="col-1" style={{display:'flex',justifyContent:'center',}}>
                                <div className="card">
                                    <h1 className='col-12 p-2 align-text-bottom' style={{opacity:1}} >See More</h1>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="container">
                    <div className="col-12 my-3">
                        <h2>Your FavList <i className='fa-solid text-danger fa-heart'></i>  <span className='float-end seeMore fs-6 pt-3 pe-2' onClick={() => navigate('/user/favorites')}>See More</span></h2>
                        <div className="" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'revert', overflow: 'auto', position: 'relative' }}>
                            {
                                favMoviesList &&

                                favMoviesList.map((data) =>
                                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mx-2" style={{ display: 'flex', flexDirection: "row", flexWrap: 'nowrap' }}>
                                        <UserFaveCards data={data} type={'favMovies'} />
                                    </div>
                                )

                            }
                            {favMoviesList.length === 0 && <h4 className="text-light">No Movies Found</h4>}
                            {/* <div className="col-1" style={{display:'flex',justifyContent:'center',}}>
                                <div className="card">
                                    <h1 className='col-12 p-2 align-text-bottom' style={{opacity:1}} >See More</h1>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
