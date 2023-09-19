import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import '../mediaQuery.css'
import UserFaveCards from '../Reusables/UserFaveCards'
import { FaveMovies } from '../API_Files/MoviesApi/MoviesApi'
import { useLocation } from 'react-router-dom'


const UserMovies = () => {
    const userData = useSelector(state => state.userData)
    const [watchList, setWatchList] = useState([]);
    const [favMoviesList, setfavMoviesList] = useState([]);
    // const [moviesIds, setMoviesIds] = useState(userData.watchlist);
    // console.log(userData);
    const location = useLocation()
    console.log(location);


    useEffect(() => {
        // console.log(userData.watchlist);
        fetchMovies()
    }, [userData, location]);

    const fetchMovies = async () => {
        let MoviesArray = []
        let FavMoviesArray = []

        if (location.pathname === '/user/watchlist' && userData.watchlist?.length) {
            for (const res of userData.watchlist) {
                // console.log(res);//[1,2,3,4]
                const resp = await FaveMovies(res);
                MoviesArray.push(...resp);
                // console.log("MoviesArray", MoviesArray);
            }
            setWatchList(MoviesArray)
            setfavMoviesList([])

        } else
            if (location.pathname === '/user/favorites' && userData.favMovies?.length) {
                for (const res of userData.favMovies) {
                    // console.log(res);//[1,2,3,4]
                    const resp = await FaveMovies(res);
                    FavMoviesArray.push(...resp);
                    // console.log("FavMoviesArray", FavMoviesArray);
                }
                setfavMoviesList(FavMoviesArray)
                setWatchList([])
            }
            else {
                setfavMoviesList([])
                setWatchList([])
            }
    }


    return (
        <div>
            <div className="mt-5">
                <div className="container">
                    <div className="col-12 my-5">
                        <div className="row pt-4" style={{}}>
                            {
                                watchList &&
                                <>
                                   {location.pathname==='/user/watchlist' &&  <h4 className='text-light'>WatchList Movies ( {watchList.length} ) </h4>}
                                    {watchList?.map((data) =>
                                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6 col-12 my-2" style={{ display: 'flex', flexDirection: "row", flexWrap: 'nowrap' }}>
                                            <UserFaveCards data={data} type={'watchlist'} />
                                        </div>
                                    )}
                                </>

                            }
                            {
                                favMoviesList &&
                                <>
                                    {location.pathname==='/user/favorites' && <h4 className='text-light'>Favorite Movies({favMoviesList.length}) </h4>}
                                    {favMoviesList?.map((data) =>
                                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6 col-12 my-2" style={{ display: 'flex', flexDirection: "row", flexWrap: 'nowrap' }}>
                                            <UserFaveCards data={data} type={'favMovies'} />
                                        </div>
                                    )}
                                </>
                            }
                            {
                                !favMoviesList && !watchList &&
                                <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <h1 className='my-5 py-5 text-light'>No Movies Found</h1>
                                </div>
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
        </div>
    )
}

export default UserMovies
