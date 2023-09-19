import Aos from "aos";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { w500 } from "../API_Files/AuthKeys";
import {
    ActorDetailsApi,
    ActorImages,
    ActorMovies,
} from "../API_Files/Persons/PersonsApi";
import CardSecType from "../Reusables/CardsSecType";
import Card from "../Reusables/Cards";

const ActorDetails = () => {
    const params = useParams();

    const [MoviedId, setMoviedId] = useState(null);
    const [ParamsId, setParamsId] = useState("");
    const [ActorData, setActorData] = useState({});
    const [Movies, setMovies] = useState([]);
    const [ImagesArray, setImagesArray] = useState([]);

    useEffect(() => {
        window.scroll(0, 0);
    });
    useEffect(() => {
        Aos.init();

        setParamsId(params.id);
        setMoviedId(Number(params.id)); // Update the movie ID when the params change
        // console.log(params.id); 

        ActorDetailsApi(Number(params.id)).then((res) => {
            setActorData(res);
        });

        ActorMovies(Number(params.id)).then((res) => {
            // console.log(res.cast);
            let sortedItems = res.cast;
            sortedItems.sort(
                (a, b) => new Date(b.release_date) - new Date(a.release_date)
            );
            setMovies(sortedItems);
        });
        ActorImages(Number(params.id)).then((res) => {
            // console.log(res);
            setImagesArray(res.profiles);
        });
    }, [params.id]); // Add params.id to the dependency array

    const Images = ImagesArray.map((res) => res.file_path);
    // console.log(Images);

    // console.log(Movies);
    return (
        <div className="text-light">
            <div className="container">
                <div className="col-12" style={{ position: 'relative' }}>
                    <div className="row p-4" style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <div className="w-200 h-900" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, backgroundImage: `url(${w500 + ActorData.profile_path})`, backgroundSize: 'cover', filter: 'blur(200px)' }} />

                        <div className="col-lg-3 col-12 " style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade mt-4" data-bs-ride="carousel">

                                <div className="carousel-inner rounded-5 my-3" style={{ height: '420px' }}>
                                    {Images.map((image, index) => (
                                        <div  className={`carousel-item ${index === 0 ? 'active' : ''} rounded-4 mb-5`} key={index}>
                                            <img src={w500 + image} className="" style={{ height: '420px', width: '100%', objectFit: 'cover' }} alt={`Slide ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-9 col-12" style={{ zIndex: 1 }}>
                            <div className="mb-3">
                                <h1 className="" style={{ fontSize: '50px' }}>{ActorData.name}</h1>
                                <hr />
                                <h6 className="p-0 m-0 fw-bold">Known For</h6>
                                <p className="p-0 m-0">{ActorData.known_for_department}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="p-0 m-0 fw-bold">Movies Count</h6>
                                <p className="p-0 m-0">{Movies.length}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="p-0 m-0 fw-bold">Gender</h6>
                                {ActorData.gender === 1 ? (
                                    <p className="p-0 m-0">Female</p>
                                ) : (
                                    <p className="p-0 m-0">Male</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <h6 className="p-0 m-0 fw-bold">Date of Birth</h6>
                                <p className="p-0 m-0">
                                    {ActorData.birthday}{" "}
                                    <span>
                                        (
                                        {new Date().getFullYear() -
                                            new Date(ActorData.birthday).getFullYear()}{" "}
                                        Years)
                                    </span>{" "}
                                </p>
                            </div>
                            <div className="mb-3">
                                <h6 className="p-0 m-0 fw-bold">Place of Birth</h6>
                                <p className="p-0 m-0">{ActorData.place_of_birth}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="p-0 m-0 fw-bold">Known Names</h6>
                                <p className="p-0 m-0 col-8">
                                    {ActorData?.also_known_as?.join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12 mt-4 ms-3">
                    <h3>Biography</h3>
                    <p className="card-text col-11">
                        <small className="text-body-primary">
                            {ActorData.biography}
                        </small>
                    </p>

                    <div className="col-12">
                        <div className="row">
                            <h4 className="mb-3">Recent Movies</h4>
                            <div
                                className="mb-1"
                                style={{
                                    display: "flex",
                                    overflowX: "auto",
                                    scrollbarColor: "green",
                                }}
                            >
                                {Movies.map((res, key) => (
                                    <React.Fragment key={key}>
                                        <div
                                            
                                            data-aos="fade-left"
                                            data-aos-duration="1500"
                                            className="col-lg-2 col-md-4 col-6 mx-3 d-block d-lg-none"
                                            style={{ minHeight: "200px" }}
                                        >
                                            <CardSecType
                                                category={"movies"}
                                                type={"Now_Playing"}
                                                data={res}
                                            />
                                        </div>
                                        <div className="d-none d-lg-block d-md-none mx-2">
                                            <Card
                                                category={"movies"}
                                                type={"Now_Playing"}
                                                data={res}
                                            />
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorDetails;
