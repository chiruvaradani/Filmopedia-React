import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetTrending, MovieImages } from "../API_Files/MoviesApi/MoviesApi";
import './CardsWithAnimation.css'
import { Imageurl } from "../API_Files/AuthKeys";
import Skeleton from "react-loading-skeleton";

const TopRated = () => {
    const navigateToPage = useNavigate()
    const [state, setstate] = useState([]);
    const [SetPeriod, setSetPeriod] = useState('week');
    const [Loading, setLoading] = useState(true);
    const [ImagesData, setImagesData] = useState([]);
    // console.log(props);


    useEffect(() => {
        GetTrending(SetPeriod).then((res) => {
            setLoading(true)
            setTimeout(() => {
                setstate(res?.results.slice(0, 10))
                setLoading(false);
            }, 1000);
        })
    }, [SetPeriod]);

    useEffect(() => {
        if (state && state.length > 0) {
            const fetchImages = async () => {
                const imagesData = {};
                for (const item of state) {
                    try {
                        const images = await MovieImages(item.id);
                        console.log(images);
                        const resp=images.logos.filter((res)=>res.iso_639_1==='en')
                        console.log(resp);
                        imagesData[item.id] = resp[0]?.file_path || ''; // Store the image URL for each movie ID
                    } catch (error) {
                        // console.error('Error fetching movie image:', error);
                    }
                }
                setImagesData(imagesData);
            };

            fetchImages();
        }
    }, [state]);

    // console.log(state);

    return (
        <>
            <div className="col-12 list my-4" >
                <div className="row">
                    <div className="col-auto">
                        <h3 className='fw-bold ms-2' style={{ color: '#1a98ff', fontFamily: 'calibri' }}><span className='text-light'>Top Trending  <i className="fa-solid fa-arrow-trend-up"></i></span>
                        </h3>

                    </div>
                    <div className="col-auto text-end" >
                        <div className="text-light">
                            <div className="btn-group rounded-5" role="group" aria-label="Basic example" style={{ border: '1px solid #1a98ff' }}>
                                <button type="button" onClick={() => setSetPeriod('week')} style={{ backgroundColor: SetPeriod === 'week' ? '#1a98ff' : '' }} className="btn btn-sm rounded-5 border-0 text-light fw-bolder">Today</button>
                                <button type="button" onClick={() => setSetPeriod('day')} style={{ backgroundColor: SetPeriod === 'day' ? '#1a98ff' : '' }} className="btn btn-sm rounded-5 border-0 text-light fw-bolder">This Week</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <>

                <div className="d-none d-lg-block d-md-none mx-2">
                    <div className="col-12 list my-4">
                        <div className="row">
                            <div className='mb-2' style={{ display: 'flex', overflowX: 'auto', scrollbarColor: 'green' }}>
                                {Loading && (
                                    state.map((res, i) =>
                                        <Skeleton key={i} className="mx-2 rounded-4" height={350} width={260} />
                                    )
                                )}
                                {Loading === false && (
                                    <div className="card-container" style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
                                        {state.map((data, i) => (
                                            <div className="card-wrapper" key={i}>
                                                <div onClick={() => navigateToPage(`/${"trending"}/${data.id}`)} className="card border-0 CardMainTop mx-3 p-0" style={{ background: `url(${Imageurl + data.backdrop_path})`, backgroundSize: 'cover', overflow: 'hidden', cursor: 'pointer', }}>
                                                    <div className="imgbox border-0 card-img text-center cardImageTop">
                                                        <div className="InsideCard text-bg-dark" style={{ background: `url(${Imageurl + data.backdrop_path})`, backgroundSize: 'cover', overflow: 'hidden', cursor: 'pointer', }} >
                                                            {data.poster_path ? (
                                                                <img
                                                                    id="cardImage"
                                                                    className="p-0 m-0"
                                                                    src={Imageurl + data.poster_path}
                                                                    alt=""
                                                                    style={{ width: '260px', objectFit: 'cover', filter: 'brightness(50%)' }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    id="cardImage"
                                                                    style={{ objectFit: 'contain', width: '100px', display: 'flex', flex: 1, placeItems: 'center' }}
                                                                    className="mx-3 "
                                                                    src="https://th.bing.com/th/id/OIP._5F3Fg7SM_JcA6jbw6EU4QAAAA?pid=ImgDet&rs=1"
                                                                    alt=""
                                                                />
                                                            )}

                                                            <div className="card-img-overlay" style={{}}>
                                                                <h1 style={{ position: 'absolute', bottom: 0, left: 10, fontSize: '100px', fontFamily: "Gasoek One", }} className="count">{i + 1}</h1>
                                                            </div>



                                                        </div>

                                                    </div>
                                                    <div className="content border-0 text-light card-img-overlay text-dark"
                                                        style={{ backgroundImage: `linear-gradient(to top, #000 4%, rgba(0,0,0,0))` }}
                                                    >

                                                        <div className="col-10 m-3 text-light" style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1 }}>
                                                            <h1 style={{ fontSize: '100px', fontFamily: "Gasoek One", filter: '' }} className="text-light count">#{i + 1}</h1>
                                                            {ImagesData[data.id] ? (
                                                                <img
                                                                    style={{ maxHeight: '150px' }}
                                                                    src={Imageurl + ImagesData[data.id]}
                                                                    className='col-8 text-center MovieDetails logoImage'
                                                                    alt=""
                                                                />
                                                            ) : <p>{data.title}</p>
                                                            }
                                                            {/* <h1 className="text-truncate col-10 fs-3" >{data.title}</h1> */}
                                                            {/* <p className="card-text carouseltext MovieDetails col-lg-8 col-10 textName line-limit">{data.overview}</p> */}


                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>




                <div className="d-block d-lg-none d-md-block mx-2">
                    <div className="col-12 list my-4">
                        <div className="row">
                            <div className='mb-2' style={{ display: 'flex', overflowX: 'auto', scrollbarColor: 'green' }}>
                                {Loading && (
                                    state.map((res, i) =>
                                        <Skeleton key={i} className="mx-2 rounded-4" height={350} width={260} />
                                    )
                                )}
                                {Loading === false && (
                                    <div className="card-container" style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
                                        {state.map((data, i) => (
                                            <div className="card-wrap" key={i}>
                                                <div onClick={() => navigateToPage(`/${"trending"}/${data.id}`)} className="card border-0  mx-3 p-0" style={{ overflow: 'hidden', cursor: 'pointer',height: "325px" ,width: "220px" }}>

                                                    <div className=" border-0 col-8 card-img text-center ">
                                                        <img

                                                            className="p-0 m-0 border-0"
                                                            src={Imageurl + data.poster_path}
                                                            alt=""
                                                            style={{ height: "325px" ,width: "220px", filter: 'brightness(70%)' }}
                                                        />
                                                    </div>
                                                    <div className="card-img-overlay text-light" style={{}}>
                                                        <h1 style={{ position: 'absolute', bottom: 0, left: 10, fontSize: '100px', fontFamily: "Gasoek One", }} className="count text-center">{i + 1}</h1>
                                                        {ImagesData[data.id] ? (
                                                                <img
                                                                    style={{ maxHeight: '150px' }}
                                                                    src={Imageurl + ImagesData[data.id]}
                                                                    className='col-12 text-center MovieDetails logoImage'
                                                                    alt=""
                                                                />
                                                            ) : <p>{data.title}</p>
                                                            }
                                                    </div>


                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>



        </>
    )
}

export default TopRated;
