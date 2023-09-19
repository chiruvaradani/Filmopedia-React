import React, { useEffect } from 'react'
import '../InfoComponents/InfoComp.css'
import Aos from 'aos';
import '../../src/'

const AboutUs = () => {
    useEffect(() => {
        Aos.init()
        window.scroll(0, 0)
    });
    return (
        <div>
            <div className="col-12">
                <div className="" style={{ backgroundImage: 'radial-gradient(at 25%top,#32112c 0,#000 40%)', zIndex: 0 }}>
                    <div className="inner-Content text-center" style={{ backgroundImage: 'url(https://www.themoviedb.org/assets/2/v4/marketing/red_pipes-594140f35efb300741add9827cc4f41053b0a4bb7ba249a40375377cc9d22d47.svg)', height: 'auto', zIndex: 1 }}>
                        <div className="" >
                            <img data-aos="fade-right"
                                data-aos-easing="linear"
                                data-aos-duration="1500" className='img-fluid col-lg-7 col-md-10 col-12 mt-4 Avengers px-3' src="https://i.pinimg.com/originals/93/b5/66/93b566648f2f8a121d123b2a48a9650c.png" alt="" style={{ height: 'auto', }} />
                            <h1 data-aos="fade-left"
                                data-aos-easing="linear"
                                data-aos-duration="1500" className='text-light heading fw-bolder py-3 my-3' style={{ fontSize: '50px' }}>Let's Talk about <span className='bg-primary p-2'>Filmopedia</span></h1>

                            <h6
                                data-aos="fade-up"
                                data-aos-easing="linear"
                                data-aos-duration="1500"
                                className='text-center text-light fw-lighter col-lg-8 col-12 p-2 mx-auto'>Filmopedia is a cutting-edge movie app that puts the entire world of cinema at your fingertips. With its vast collection of films, comprehensive information, and user-friendly interface, Filmopedia is the ultimate companion for movie lovers of all ages and tastes. Filmopedia is a comprehensive movie database app that provides users with a wealth of information about films. The app serves as a one-stop destination for movie enthusiasts, offering a vast collection of movies from various genres, eras, and countries.</h6>
                        </div>
                    </div>
                    <div className="container my-5">
                        <div className="col-12 ">
                            <div className="row mb-3 ">
                                <div className="col-lg-4 col-md-6 col-12" >
                                    <div data-aos="fade-up"
                                data-aos-easing="linear"
                                data-aos-duration="1500" className="text-center card mb-3  DetailsContainer" style={{backgroundColor:"transparent",minHeightminHeight:'340px'}}>
                                    <i class="fa-solid fa-database m-3 " style={{color:'#d40242',fontSize:'100px'}}></i>
                                    <h4 className='text-info text-start ps-3 mt-2'>Extensive Movie Database</h4>
                                    <hr className='text-light p-0 m-0 mb-2 col-11 mx-3' />
                                    <p className='px-3 text-light text-start'>Filmopedia boasts a vast and comprehensive movie database, housing a wide range of films from different genres, eras, and countries. Users can explore a diverse collection of movies, from classic masterpieces to the latest releases.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12" >
                                    <div data-aos="fade-up"
                                data-aos-easing="linear"
                                data-aos-duration="1500" className="text-center card mb-3  DetailsContainer" style={{backgroundColor:"transparent",minHeightminHeight:'340px'}}>
                                    <i class="fa-solid fa-clock-rotate-left m-3 " style={{color:'#d40242',fontSize:'100px'}}></i>
                                    <h4 className='text-info text-start ps-3 mt-2'>Watchlist Management</h4>
                                    <hr className='text-light p-0 m-0 mb-2 col-11 mx-3' />
                                    <p className='px-3 text-light  text-start'>Filmopedia boasts a vast and comprehensive movie database, housing a wide range of films from different genres, eras, and countries. Users can explore a diverse collection of movies, from classic masterpieces to the latest releases.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12" >
                                    <div data-aos="fade-up"
                                data-aos-easing="linear"
                                data-aos-duration="1500" className="text-center card mb-3  DetailsContainer" style={{backgroundColor:"transparent",minHeight:'340px'}}>
                                    <i class="fa-solid fa-circle-info m-3 " style={{color:'#d40242',fontSize:'100px'}}></i>
                                    <h4 className='text-info text-start ps-3 mt-2'>Detailed Movie Information</h4>
                                    <hr className='text-light p-0 m-0 mb-2 col-11 mx-3' />
                                    <p className='px-3 text-light  text-start'>Each movie in Filmopedia's database is accompanied by comprehensive information, including the title, release date, director, cast, plot summary, and user ratings. Users can access a wealth of details about a film, helping them make informed decisions about what to watch.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12" >
                                    <div data-aos="fade-up"
                                data-aos-easing="linear"
                                data-aos-duration="1500" className="text-center card mb-3 DetailsContainer" style={{backgroundColor:"transparent",minHeight:'340px'}}>
                                    <img className='responsiveScreens p-3' src="https://webstockreview.net/images/laptop-clipart-smartphone-tablet-1.png" style={{height:'150px',objectFit:'contain'}} alt="" />
                                    <h4 className='text-info text-start ps-3 mt-2'>Cross-Platform</h4>
                                    <hr className='text-light p-0 m-0 mb-2 col-11 mx-3' />
                                    <p className='px-3 text-light text-start'>Filmopedia supports cross-platform sync, allowing users to synchronize their movie lists, watch history, and preferences across multiple devices. This feature ensures that users can seamlessly switch between devices without losing their data or progress.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12" >
                                    <div data-aos="fade-up"
                                data-aos-easing="linear"
                                data-aos-duration="1500" className="text-center card mb-3 DetailsContainer" style={{backgroundColor:"transparent",minHeight:'340px'}}>
                                    <img className='responsiveScreens p-3' src="https://th.bing.com/th/id/R.a082a782a4d07078ded5d88d77245656?rik=n3hFvlIud5G7Kg&riu=http%3a%2f%2fclipart-library.com%2fnew_gallery%2f783807_up-down-arrow-png.png&ehk=GOA9nvkbJPkB1iT6G9KYgk6R3zwuliQeHaJyMcvqXw8%3d&risl=&pid=ImgRaw&r=0" style={{height:'150px',objectFit:'contain'}} alt="" />
                                    <h4 className='text-info text-start ps-3 mt-2'>Sorting Options</h4>
                                    <hr className='text-light p-0 m-0 mb-2 col-11 mx-3' />
                                    <p className='px-3 text-light  text-start'>Filmopedia provides sorting options to arrange movie results in a preferred order. Users can sort movies by popularity, rating, release date, or alphabetical order. This functionality enables users to find movies based on their desired ranking or order.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>      
            </div>


        </div>

    )
}

export default AboutUs
