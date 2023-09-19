import React, { useEffect, useState } from 'react'
import { Imageurl, w500 } from '../API_Files/AuthKeys'
import { MovieImages } from '../API_Files/MoviesApi/MoviesApi';
import CircularPercentage from './Percentage';
import { useNavigate } from 'react-router-dom';
import { AddtoFav, addtoWishlist } from '../API_Files/usersApi/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedUserData } from '../Store/UserSlice';

const DetailsCover = (props) => {


    // console.log(props.Trailer[0]?.key);

    // console.log(embedUrl);

    const [IsHovered, setIsHovered] = useState(false);
    const [ImagesArray, setImagesArray] = useState([]);
    const data = [props.MovieData]
    const userdata = useSelector(state => state.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const embedUrl = "https://www.youtube.com/embed/" + props.Trailer[0]?.key
    const handleIframe = () => {
        var iframe = document.getElementById('myIframe');
        iframe.remove();
    }

    useEffect(() => {
        if (data[0]?.id) {
            MovieImages(data[0]?.id).then((res) => {
                // console.log(res.backdrops)
                setImagesArray(res.backdrops)
            })
        }
    }, [data[0]?.id]);

    const Images = ImagesArray.map((res) => res.file_path)
    // console.log(Images);

    const handleWishlist = (id, type) => {
        addtoWishlist(id, type).then((res) => {
            dispatch(LoggedUserData(res[0]))
        })
    }

    const Hover = () => {
        setIsHovered(true)

    }
    const convertMinutesToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h:${remainingMinutes}m`;
    };

    // console.log(userdata);

    return (
        <>
            <div id="carouselExampleAutoplaying" className="carousel d-none d-lg-block d-md-none d-sm-none slide rounded-5 mx-3" data-bs-ride="carousel">
                {/* <div className="carousel-indicators">

                {Images?.map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div> */}
                <div className="carousel-inner rounded-5">
                    {Images.length ? Images.map((item, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            data-bs-interval="5000"
                            style={{
                                height: "550px",
                                width: "100%",
                                border: "none",
                            }}
                        >
                            <div
                                className="carousel-image MovieImage mt-2 rounded-5"

                                style={{
                                    backgroundImage: `linear-gradient(to top, #000 5%, rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original/${item})`,
                                    backgroundSize: "100% ",
                                    backgroundPosition: "top",
                                    height: "100% ",
                                    width: "100%",
                                    border: 'none'
                                }}
                            >

                            </div>
                        </div>
                    )) :
                        <div

                            className={`carousel-item active`}
                            data-bs-interval="5000"
                            style={{
                                height: "550px",
                                width: "100%",
                                border: "none",
                            }}
                        >
                            <div
                                className="carousel-image MovieImage"

                                style={{
                                    backgroundImage: `linear-gradient(to top, #000 5%, rgba(0,0,0,0)), url(https://th.bing.com/th/id/OIP.LORB2irgr7SNocN4b5VDVAHaE5?pid=ImgDet&rs=1)`,
                                    backgroundSize: "100% ",
                                    backgroundPosition: "top",
                                    height: "100% ",
                                    width: "100%",
                                    border: 'none'
                                }}
                            >

                            </div>
                        </div>

                    }
                </div>

                {
                    data?.map((data, i) =>
                        <div key={i} className="carousel-caption p-0 mt-4" style={{
                            height: '100%', backgroundImage: `linear-gradient(to right, #000 10%, rgba(0, 0, 0, 0))`, textAlign: "left",
                            // filter:'brightness(50%)',
                            left: "0px"
                        }}>
                            <div className="col-12 mx-auto" style={{ position: 'relative' }}>
                                <div className="row" style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <div className="col-4 mt-5">
                                        <div className="MovieDetails col-9 mt-5 ps-4 mx-auto rounded-4">
                                            <img className='img-fluid rounded-4' src={Imageurl + data.poster_path} alt="" />
                                        </div>
                                    </div>
                                    <div className="MovieDetails col-8 mt-5 pt-5" >
                                        <h4 className='fw-bolder' style={{ color: '#1a98ff', fontSize: '34px', fontFamily: 'calibri' }}>{data.original_title} ({new Date(data.release_date).getFullYear()})</h4>
                                        <h5 className='fw-bolder' style={{ color: '#1a98ff', fontSize: '22px', fontFamily: 'calibri' }}>{data.title}</h5>
                                        <h6 style={{ fontSize: '12px', color: "skyblue" }} className='p-0 m-0  fw-bold'>{data.tagline}</h6><br />
                                        <h6 style={{ fontSize: '12px' }} className='p-0 mb-2 text-light fw-bold'>{data.release_date} ({
                                            data.production_countries?.map((res) =>
                                                res.iso_3166_1
                                            )
                                        }) • {
                                                data.genres?.map((res, key) =>
                                                    (res.name)
                                                ).join(", ")
                                            } • {data.runtime && convertMinutesToHours(data.runtime)}</h6>
                                        <div className="">
                                            <div className="" style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'start', alignItems: 'center' }}>
                                                <div className=" p-0 me-3">
                                                    <CircularPercentage data={data.vote_average} />
                                                </div>

                                                <div className=" me-3" >
                                                    <button data-bs-trigger="hover"
                                                        onClick={() => handleWishlist(data.id, "watchlist")} data-bs-content="Add to list" className='btn' style={{ backgroundColor: '#00ffcd', borderRadius: '50%' }}>
                                                        {
                                                            userdata?.watchlist?.includes(data.id) ?

                                                                <i className="fa-solid fa-check" ></i> :
                                                                <i className="fa-solid fa-list " ></i>

                                                        }
                                                    </button>
                                                </div>
                                                <div className=" me-3">
                                                    <button
                                                        data-bs-trigger="hover"
                                                        data-bs-content="Add to list"
                                                        className="btn"
                                                        onClick={() => handleWishlist(data.id, "favMovies")}
                                                        style={{
                                                            backgroundColor: "#00ffcd",
                                                            borderRadius: "50%",
                                                        }}
                                                    >
                                                        {
                                                            userdata?.favMovies?.includes(data.id) ?

                                                                <i className="fa-solid text-danger fa-heart " ></i> :

                                                                <i className="fa-solid fa-heart "></i>

                                                        }
                                                    </button>
                                                </div>
                                                {/* <div className=" me-3">
                                                    <button data-bs-trigger="hover" data-bs-content="Add to list" className='btn' style={{ backgroundColor: '#00ffcd', borderRadius: '50%' }}>

                                                        <i className="fa-solid fa-bookmark "></i>
                                                    </button>
                                                </div> */}


                                            </div>
                                        </div>

                                        <div className="text-light">
                                            <h5 className='mt-3' style={{ flex: 1, justifyContent: 'flex-end' }}>{"Overview "} </h5>
                                            <hr className='text-light col-8' />

                                            <p style={{ textAlign: 'justify' }} onMouseEnter={Hover} onMouseLeave={() => setIsHovered(false)} className='text-light  fw-lighter col-8 line-limit m-0 p-0'>{data.overview}</p>


                                            <br />
                                            {
                                                data.genres?.map((res, key) =>

                                                    <button key={key} className='btn text-light btn-sm rounded-5 me-2 mb-3' style={{ border: '1px solid white' }}>{res.name}</button>
                                                )
                                            }

                                            <div className="" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'row' }}>
                                                <div className="mx-2 p-0">
                                                    <span className='text-light fw-lighter  line-limit '><i className="fa-solid fa-calendar-days"></i> &nbsp;{data.release_date}</span>
                                                </div>
                                                <div className="mx-2 p-0">
                                                    <i className="fa-solid fa-fire text-danger"></i> &nbsp; {data.popularity}
                                                </div>
                                                <div className="mx-2 p-0">
                                                    <span className='text-light fw-lighter  line-limit '><i className="fa-solid fa-clock"></i> &nbsp;{convertMinutesToHours(data.runtime)}</span>
                                                </div>
                                                <div className="mx-2 p-0">
                                                    {
                                                        props.Trailer[0]?.key ?
                                                            <span data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal" style={{ cursor: 'pointer' }} className='text-light fw-lighter  line-limit'>
                                                                <i className="fa-sharp fa-solid fa-circle-play"></i><span className='' > Watch Trailer</span></span> :
                                                            <span className='text-light fw-lighter  line-limit'>
                                                                <i className="fa-solid fa-ban"></i><span className=''  > No Videos </span></span>
                                                    }
                                                </div>
                                                <div className="mx-2 p-0">

                                                    <span style={{ cursor: 'pointer' }} className='text-light fw-lighter  line-limit'>
                                                        <i className="fa-solid fa-images"></i><span className='' onClick={() => navigate(`/media/${data.id}`)}  > Media</span></span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                }
                <a
                    className="carousel-control-prev ms-2"
                    href="#carouselExampleAutoplaying"
                    role="button"
                    data-bs-slide="prev" // Updated attribute
                >
                    <span className="carousel-control-prev-icon " aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a
                    className="carousel-control-next me-2"
                    href="#carouselExampleAutoplaying"
                    role="button"
                    data-bs-slide="next" // Updated attribute
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>

            </div>
            <div className="col-md-11 col-12 mx-4 d-block d-lg-none d-md-block " style={{ position: 'relative' }}>
                <div className="row" style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <div className="w-200 h-900" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, backgroundImage: `url(${w500 + data.poster_path})`, backgroundSize: 'cover', filter: 'blur(200px)' }} />
                    {
                        data?.map((data, i) =>
                            <React.Fragment key={i}>
                                <div className="col-md-4 my-3 col-8 mx-auto">

                                    <img className='img-fluid rounded-4' src={Imageurl + data.poster_path} alt="" />
                                </div>
                                <div className="col-md-7 my-3 col-12 ms-4" style={{ justifyContent: 'center' }}>
                                    <div className="MovieDetails " >
                                        <h4 className='fw-bolder' style={{ color: '#1a98ff', fontSize: '34px', fontFamily: 'calibri' }}>{data.original_title} ({new Date(data.release_date).getFullYear()})</h4>
                                        <h5 className='fw-bolder' style={{ color: '#1a98ff', fontSize: '22px', fontFamily: 'calibri' }}>{data.title}</h5>
                                        <h6 style={{ fontSize: '12px', color: "skyblue" }} className='p-0 m-0  fw-bold'>{data.tagline}</h6><br />
                                        <h6 style={{ fontSize: '12px' }} className='p-0 mb-2 text-light fw-bold'>{data.release_date} ({
                                            data.production_countries?.map((res) =>
                                                res.iso_3166_1
                                            )
                                        }) • {
                                                data.genres?.map((res, key) =>
                                                    (res.name)
                                                ).join(", ")
                                            } • {data.runtime && convertMinutesToHours(data.runtime)}</h6>
                                        <div className="">
                                            <div className="" style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'start', alignItems: 'center' }}>
                                                <div className=" p-0 me-2">
                                                    <CircularPercentage data={data.vote_average} />
                                                </div>
                                                
                                                <div className=" me-3" >
                                                    <button data-bs-trigger="hover"
                                                        onClick={() => handleWishlist(data.id, "watchlist")} data-bs-content="Add to list" className='btn' style={{ backgroundColor: '#00ffcd', borderRadius: '50%' }}>
                                                        {
                                                            userdata?.watchlist?.includes(data.id) ?

                                                                <i className="fa-solid fa-check" ></i> :
                                                                <i className="fa-solid fa-list " ></i>

                                                        }
                                                    </button>
                                                </div>
                                                <div className=" me-3">
                                                    <button
                                                        data-bs-trigger="hover"
                                                        data-bs-content="Add to list"
                                                        className="btn"
                                                        onClick={() => handleWishlist(data.id, "favMovies")}
                                                        style={{
                                                            backgroundColor: "#00ffcd",
                                                            borderRadius: "50%",
                                                        }}
                                                    >
                                                        {
                                                            userdata?.favMovies?.includes(data.id) ?

                                                                <i className="fa-solid text-danger fa-heart " ></i> :

                                                                <i className="fa-solid fa-heart "></i>

                                                        }
                                                    </button>
                                                </div>
                                                {/* <div className=" me-3">
                                                    <button data-bs-trigger="hover" data-bs-content="Add to list" className='btn' style={{ backgroundColor: '#00ffcd', borderRadius: '50%' }}>

                                                        <i className="fa-solid fa-bookmark "></i>
                                                    </button>
                                                </div> */}


                                            </div>
                                        </div>

                                        <div className="text-light">
                                            <h5 className='mt-3' style={{ flex: 1, justifyContent: 'flex-end' }}>{"Overview "} </h5>
                                            <hr className='text-light col-5' />

                                            <p style={{ textAlign: 'justify' }} onMouseEnter={Hover} onMouseLeave={() => setIsHovered(false)} className='text-light  fw-lighter col-8 line-limit m-0 p-0'>{data.overview}</p>


                                            <br />
                                            {
                                                data.genres?.map((res, key) =>

                                                    <button key={key} className='btn text-light btn-sm rounded-5 me-2 mb-3' style={{ border: '1px solid white' }}>{res.name}</button>
                                                )
                                            }
                                            <div className="col-10 p-0 ms-2">
                                                <div className="" style={{ flex: 1, justifyContent: 'flex-end' }}>

                                                    <div className="row">
                                                        <div className="col-auto mx-2 p-0">
                                                            <span className='text-light fw-lighter  line-limit '><i className="fa-solid fa-calendar-days"></i> &nbsp;{data.release_date}</span>
                                                        </div>
                                                        <div className="col-auto mx-2 p-0">
                                                            <span className='text-light fw-lighter  line-limit '><i className="fa-solid fa-clock"></i> &nbsp;{convertMinutesToHours(data.runtime)}</span>
                                                        </div>
                                                        <div className="col-auto mx-2 p-0">
                                                    <i className="fa-solid fa-fire text-danger"></i> &nbsp; <span className='text-light'>{data.popularity}</span>
                                                </div>
                                                        <div className="col-auto mx-2 p-0">
                                                            {
                                                                props.Trailer[0]?.key ?
                                                                    <span data-bs-toggle="modal"
                                                                        data-bs-target="#exampleModal" style={{ cursor: 'pointer' }} className='text-light fw-lighter  line-limit'>
                                                                        <i className="fa-sharp fa-solid fa-circle-play"></i><span className='' > Watch Trailer</span></span> :
                                                                    <span className='text-light fw-lighter  line-limit'>
                                                                        <i className="fa-solid fa-ban"></i><span className=''  > No Videos </span></span>
                                                            }
                                                        </div>
                                                        <div className="col-auto mx-2 p-0">

                                                            <span style={{ cursor: 'pointer' }} className='text-light fw-lighter  line-limit'>
                                                                <i className="fa-solid fa-images"></i><span className='' onClick={() => navigate(`/media/${data.id}`)}  > Media</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                </div>
            </div>
            <div className="modal fade" data-bs-backdrop="static" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0 text-light p-0 text-end ">
                            <div className="ms-auto">
                                <button className="text-dark btn fw-bolder" onClick={handleIframe} data-bs-dismiss="modal" aria-label="Close">
                                    X
                                </button>

                            </div>
                        </div>
                        <iframe
                            id="myIframe"
                            width="100%"
                            height="315"
                            src={embedUrl}
                            title="Embedded Video"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </>


    )
}

export default DetailsCover
