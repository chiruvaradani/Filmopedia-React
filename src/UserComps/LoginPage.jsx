import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './LoginPage.css'
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { GetTrending } from '../API_Files/MoviesApi/MoviesApi';
import { Imageurl, token } from '../API_Files/AuthKeys';
import RegisterPage from './RegisterPage';
import { Steps, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedUserData } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom/dist';
import axios from 'axios';
import { LoginAuth, getUserData } from '../API_Files/usersApi/userApi';
import { addToken } from '../Store/tokenSlice';

export default function LoginPage() {
    const [toggle, settoggle] = useState(false);
    const [state, setstate] = useState({ Username: "", password: "" });
    const [disabled, setdisabled] = useState(false);
    const [EmailvalidBox, setEmailvalidBox] = useState("");
    const [validBox, setvalidBox] = useState("");
    const [MovieData, setMovieData] = useState([]);
    const [FormError, setFormError] = useState({
        UserNameError: "", passwordError: ''
    })
    const [tagsIndex, setTagsIndex] = useState(0);
    const [ShowLogin, setShowLogin] = useState(true);
    const key = 'updatable';
    const UserData = useSelector((state) => state.userData)
    const token = useSelector((state) => state.token)
    // console.log(UserData);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Tags = ["Unleash the Magic of Cinema", "Discover, Delight, and Dive into Movies", "Lights, Camera, Explore – Filmopedia", "Where Stories Come Alive – Filmopedia"]

    useEffect(() => {
        window.scroll(0, 0)
        GetTrending('day').then((res) => {
            setMovieData(res?.results)
        })
        const interval = setInterval(() => {
            setTagsIndex((prevIndex) => (prevIndex + 1) % Tags.length);
        }, 5000); // Interval in milliseconds (2 seconds)

        return () => clearInterval(interval);
    }, []);

    // console.log(`token`, token);
    // console.log(localStorage.getItem('token'));

    function getUserData() {
        const token = localStorage.getItem('token');
        if (!token) {
        //   console.log('Token not found');
          return;
        }
      
        axios.get('https://filmopedia-server.cyclic.app/server/UserData', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((res) => {
        //   console.log(res.data);
          dispatch(LoggedUserData(res.data));
        })
        .catch((error) => {
          // Handle errors here
        });
      }
      

    const handleToggle = () => {
        settoggle(true)
        setTimeout(() => {
            settoggle(false)
        }, 500);
    }

    const handleClass = (ShowLogin) => {
        setShowLogin(ShowLogin)
    }

    useEffect(() => {
        const isStateValid = Object.values(state).every((value) => value !== "" && value !== null);
        const isFormErrorValid = Object.values(FormError).every((value) => value === "" || value === null);
        setdisabled(!isStateValid || !isFormErrorValid);
    }, [state, FormError]);

   

    const handleChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value });
        // console.log(state);

        if (e.target.name === "Username") {
            if (e.target.value.length === 0) {
                setFormError({ ...FormError, UserNameError: "UserName is required" });
                setEmailvalidBox('is-invalid')
            }
            if (e.target.value.length < 8) {
                setFormError({ ...FormError, UserNameError: "Username should be between 8-12 characters" });
                setEmailvalidBox('is-invalid')
            }
            else {
                setFormError({ ...FormError, UserNameError: "" });
                setEmailvalidBox('is-valid')
            }
        }
        if (e.target.name === "password") {
            if (e.target.value.length === 0) {
                setFormError({ ...FormError, passwordError: "Password is Required" });
                setvalidBox('is-invalid')
            } else
                if (e.target.value.length < 8) {
                    setFormError({ ...FormError, passwordError: "Password should be between 8-12 characters" });
                    setvalidBox('is-invalid')
                }
                else {
                    setFormError({ ...FormError, passwordError: "" });
                    setvalidBox('is-valid')
                }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(state);
        message.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        LoginAuth(state).then((res) => {
            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: 'Login Successfully',
                    duration: 2,
                });
            }, 1000);
            // console.log(res.data);
            localStorage.getItem('token')
            navigate('/')
            getUserData()
               
            }).catch((err)=>{
                message.open({
                    key,
                    type: 'loading',
                    content: 'Loading...',
                });
                setTimeout(() => {
                    message.open({
                        key,
                        type: 'error',
                        content: 'Invalid Credentials',
                        duration: 2,
                    });
                }, 1000);
            })
        }


    return (
            <>
                <div className="" style={{
                    backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 91%) 2%, rgba(0,0,0,0)),linear-gradient(to BOTTOM, rgb(0 0 0 / 91%) 2%, rgba(0,0,0,0.1)), url(${'https://9to5toys.com/wp-content/uploads/sites/5/2018/07/VUDU-HDX-Weekend-Sale-Friday-the-13th.jpg?quality=82&strip=all&w=1600'})`,
                    backgroundSize: '100%',
                    height: '100vh',
                    width: '100%',
                    border: 'none',
                    scrollbarWidth: '1px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>

                    <div className="col-lg-8 my-5 col-11 card LoginCard p-4 mx-2" >

                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '' }}>
                            <div className="col-6 d-none d-lg-block" >
                                <div className="text-center">
                                    <h1 className='col-12'><span className='text-warning '>Filmopedia DB</span> </h1>
                                    <div className="typewriter">
                                        <h1 key={tagsIndex} className='text-light p-0 mt-2 fs-6 col-12 text-center' style={{ textAlign: 'justify' }}>{Tags[tagsIndex]} </h1>
                                    </div>
                                </div>

                                <Swiper
                                    effect={'cards'}
                                    grabCursor={true}
                                    modules={[EffectCards]}
                                    className="mySwiper"
                                    loop={true}
                                    centeredSlides={true}
                                >
                                    {
                                        MovieData.map((res, i) =>

                                            <SwiperSlide key={i}>
                                                <div className="card rounded-4 border-0 mt-3 d-flex" style={{ height: '320px', width: '240px', overflow: 'hidden' }}>
                                                    <img src={Imageurl + res.poster_path} style={{ height: '100%', width: '100%' }} alt="" />

                                                </div>
                                            </SwiperSlide>
                                        )
                                    }

                                </Swiper>

                            </div>
                            {
                                ShowLogin ?

                                    <div className={`col-lg-6  col-12`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '' }}>
                                        <div className="mx-4 mx-auto col-12 p-3 bg-transparent " style={{ height: 'auto' }} >
                                            <div >
                                                <div className="col-12 text-light "  >
                                                    <h1>Login Form</h1>
                                                    <div className="form-floating mt-3">
                                                        <input onChange={handleChange} type="text" className={`form-control text-light inputStyle ${EmailvalidBox}`} id="floatingInput" name='Username' placeholder="name@example.com" />
                                                        <label htmlFor="floatingInput">Email/Mobile number</label>
                                                    </div>


                                                    <div className="position-relative" >
                                                        <div className="input-group mt-3">
                                                            <div className="form-floating">
                                                                <input onChange={handleChange} type={toggle ? "text" : 'password'} className={`form-control text-light  inputStyle ${validBox}`} name='password' id="floatingPassword" style={{ zIndex: 99 }} placeholder="Password" />
                                                                <label htmlFor="floatingPassword">Password</label>
                                                            </div>
                                                        </div>
                                                        {
                                                            toggle ?
                                                                null
                                                                :
                                                                <button className="btn fs-6 border-0 position-absolute btn-sm m-0 " type="button" style={{ right: 25, bottom: 10, zIndex: 1 }} id="button-addon2"><i className="fa-solid fa-eye fs-5" onClick={handleToggle}></i></button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={handleSubmit} className={`mt-3 p-1  ${disabled ? "login text-muted" : "login enabled"} text-light`} style={{ width: '100%', cursor: `${disabled ? "not-allowed" : "pointer"}` }} disabled={disabled}>Login</button>


                                            <p className='text-light text-start my-2 '>New User.? <Link onClick={() => handleClass(false)}>SignUp Now</Link></p>

                                        </div>
                                    </div> :
                                    <div className={`col-lg-6 col-12`}>
                                        <RegisterPage props={handleClass} />
                                    </div>
                            }
                        </div>



                    </div>
                </div>

            </>
        );
    }
