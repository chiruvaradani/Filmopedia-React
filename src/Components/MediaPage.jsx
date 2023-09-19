import { Radio, Space, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetMovieTrailers, GetMoviesByID, MovieImages } from '../API_Files/MoviesApi/MoviesApi';
import '../Reusables/Cards.css'
// import filesearching from '../Reusables/filesearching.gif'
import ImagesGallery from '../Reusables/ImagesGallery';


const MediaPage = () => {
    const params = useParams();
    const [Videos, setVideos] = useState([]);
    const [MovieData, setMovieData] = useState([]);
    const [selectedType, setselectedType] = useState('');

    const [Logos, setLogos] = useState([]);
    const [backdrops, setbackdrops] = useState([]);
    const [posters, setposters] = useState([]);

    useEffect(()=>{
        window.scroll(0,0)
      })

    useEffect(() => {
        GetMovieTrailers(params.movieId, 'videos').then((res) => {
            setVideos(res?.results);
        });
        GetMoviesByID(params.movieId).then((res) => {
            setMovieData(res);
            // console.log(res);
        })
        MovieImages(params.movieId).then((res) => {

            setbackdrops(res?.backdrops)
            setposters(res?.posters)
            setLogos(res?.logos)

        });
    }, []);

    // console.log(MovieData.id);
    // console.log(Videos && Videos);
    const [tabIndex, setTabIndex] = useState(1);

    return (
        <>
            <div className="btn-group col-lg-8 offset-lg-2 col-12 offset-auto position-fixed rounded-5" role="group" aria-label="Basic example" style={{ zIndex: 1, border: "1px solid #1a98ff", backgroundColor: '#000' }}>

                <button type="button" onClick={() => setTabIndex(1)} style={{
                    backgroundColor: tabIndex === 1 ? '#1a98ff' : 'black', // Set the active tab's background color
                    color: tabIndex === 3 ? 'white' : ''
                }} className="btn text-light btn-sm  me-1 border-0 rounded-5">Videos {tabIndex === 1 && <span>({Videos.length})</span>}</button>

                <button type="button" onClick={() => { setTabIndex(2); setselectedType('backdrops') }} style={{
                    backgroundColor: tabIndex === 2 ? '#1a98ff' : 'black', // Set the active tab's background color
                    color: tabIndex === 3 ? 'white' : ''
                }} className="btn text-light btn-sm  border-0 rounded-5" >Covers{tabIndex === 2 && <span>({backdrops.length})</span>}</button>

                <button type="button" onClick={() => { setTabIndex(3); setselectedType('Logos') }} style={{
                    backgroundColor: tabIndex === 3 ? '#1a98ff' : 'black', // Set the active tab's background color
                    color: tabIndex === 3 ? 'white' : ''
                }} className="btn text-light btn-sm  border-0 rounded-5" >Logos {tabIndex === 3 && <span>({Logos.length})</span>}</button>

                <button type="button" onClick={() => setTabIndex(4)} style={{
                    backgroundColor: tabIndex === 4 ? '#1a98ff' : 'black', // Set the active tab's background color
                    color: tabIndex === 3 ? 'white' : ''
                }} className="btn text-light btn-sm  border-0 rounded-5" >Posters{tabIndex === 4 && <span>({posters.length})</span>}</button>

            </div>

            <div className="container mt-5">
                {
                    tabIndex === 1 &&
                    <VideosComp data={Videos} />
                }
                {
                    tabIndex === 2 &&
                    <ImagesGallery data={backdrops} type={"Backdrops"} />
                }
                {
                    tabIndex === 3 &&
                    <ImagesGallery data={Logos} type={"logos"} />
                }
                {
                    tabIndex === 4 &&
                    <ImagesGallery data={posters} type={"posters"} />
                }
            </div>
        </>
    )
}




const VideosComp = (props) => {
    const [selectedVideos, setSelectedVideos] = useState('');

    const handleIframeClose = () => {
        setSelectedVideos('');
    };
    return (
        <div className="">
            <div className="col-12 mx-auto" style={{ overflowX: 'hidden' }}>
                <div className="row">

                    {props.data.length ? props.data.map((res) => (
                        <div
                            key={res.key}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalVideo"
                            className="card p-0 VideoCard col-lg-4 col-md-6 col-12 text-light"
                            style={{ backgroundColor: 'black' }}
                            onClick={() => setSelectedVideos(res.key)}
                        >

                            <img className="VideoImage img-fluid px-3" src={`https://img.youtube.com/vi/${res.key}/hqdefault.jpg`} alt="" />
                            <div className="card-img-overlay Videocontent">
                                <div className="" style={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center', marginTop: '20%' }}>
                                    <i className="fa-solid fa-circle-play" style={{ fontSize: '60px' }}></i>
                                </div>
                                <div className="col-12 mt-2 text-center">
                                    <div className='' >{res.type}</div>
                                    <p>{res.name}</p>
                                </div>
                            </div>
                        </div>
                    )) :
                        <div className="col-lg-4 col-md-6 col-12 mx-auto" style={{minHeight:'80vh'}}>
                            <div className="text-center">
                                {/* <img style={{ width: '100%' }} src={filesearching} alt="" /> */}
                                <h4 className='text-light'>Sorry! No Data Found</h4>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="modal fade " id="exampleModalVideo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0 text-light p-0 text-end ">
                            <div className="ms-auto">
                                <button className="text-dark btn fw-bolder" onClick={handleIframeClose} data-bs-dismiss="modal" aria-label="Close">
                                    X
                                </button>

                            </div>
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


export default MediaPage;
