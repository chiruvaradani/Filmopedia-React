import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './LoginPage.css'
import { Divider, Spin, message } from 'antd';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { useNavigate } from 'react-router-dom/dist';
import { CheckUsers, PostUsers } from '../API_Files/usersApi/userApi';
import axios from 'axios';

const RegisterPage = ({ props }) => {

    const [Mainstate, setMainstate] = useState({ email: '', Username: "", profile: '' });
    const [SecondState, setSecondState] = useState({ password: "", mobile: 0, confirmPassword: "" });
    const [DisableNext, setDisableNext] = useState(true);
    const [showNextForm, setshowNextForm] = useState(false);
    const [DisableLogin, setDisableLogin] = useState(true);
    const [pics, setpics] = useState();
    const [loading, setloading] = useState(false);
    const [AccessToken, setAccessToken] = useState('');
    const navigate = useNavigate()
    // console.log(props);
    const [MainFormError, setMainFormError] = useState({
        emailError: '', UsernameError: "", profileError: ''
    })
    const [SecondFormError, setSecondFormError] = useState({
        passwordError: "", mobileError: "", confirmPasswordError: ""
    })
    const [ValidBox, setValidBox] = useState({
        emailValid: '', passwordValid: "", UsernameValid: "", mobileValid: "", confirmPasswordValid: "", profileValid: ''
    })

    useEffect(() => {
        if (pics === "" || pics === null) {
            setMainFormError({ ...MainFormError, profileError: "Please Upload a image" })
        } else {
            setMainFormError({ ...MainFormError, profileError: "" })
        }
    }, [pics]);

    useEffect(() => {
        const isStateValid = Object.values(Mainstate).every((value) => value !== "" && value !== null);
        const isFormErrorValid = Object.values(MainFormError).every((value) => value === "" || value === null);
        // console.log(!isStateValid || !isFormErrorValid);
        setDisableNext(!isStateValid || !isFormErrorValid);

    }, [Mainstate, MainFormError]);

    useEffect(() => {
        const isSecondStateValid = Object.values(SecondState).every((value) => value !== "" && value !== null);
        const isSecondFormErrorValid = Object.values(SecondFormError).every((value) => value === "" || value === null);

        setDisableLogin(!isSecondStateValid || !isSecondFormErrorValid);

    }, [SecondState, SecondFormError]);

    useEffect(() => {
        console.log(AccessToken);
        // Replace 'YOUR_ACCESS_TOKEN' with the actual access token obtained after login
        if (AccessToken) {
            const accessToken = AccessToken;
            fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`)
                .then(response => response.json())
                .then(data => {
                    setMainstate({ ...Mainstate, Username: data.name, email: data.email, profile: data.picture.data.url })
                    setshowNextForm(true)
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [AccessToken]);

    const postDetails = (pics) => {
        setloading(true);
        if (pics === undefined) {


        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "Auth");
            fetch("https://api.cloudinary.com/v1_1/chiruvaradani/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setpics(data.url.toString());
                    setMainstate({ ...Mainstate, profile: data.url.toString() })
                    console.log(data.url.toString());
                    setloading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setloading(false);
                });
        } else {

            setloading(false);
            return;
        }
    };

    const handleData = ({ provider, data }) => {
        if (data.accessToken) {
            setAccessToken(data.accessToken)
        } else {
            console.log(data);
            setMainstate({ ...Mainstate, Username: data.name, email: data.email, profile: data.picture })
            setshowNextForm(true)
        }
    }

    // console.log(Mainstate);

    const handleChange = (e) => {
        setMainstate({ ...Mainstate, [e.target.name]: e.target.value });
        // setMainstate({ ...Mainstate, [e.target.name]: e.target.value });
        // console.log(Mainstate);
        const EmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/


        if (e.target.name === "email") {
            if (e.target.value.length === 0) {
                setMainFormError({ ...MainFormError, emailError: "Email is required" });
                setValidBox({ ...ValidBox, emailValid: "is-invalid" });

            } else
                if (!EmailRegex.test(e.target.value)) {
                    setMainFormError({ ...MainFormError, emailError: "Enter a valid email" });
                    setValidBox({ ...ValidBox, emailValid: "is-invalid" });
                }
                else {
                    setMainFormError({ ...MainFormError, emailError: "" });
                    setValidBox({ ...ValidBox, emailValid: "is-valid" });
                }
        }
        if (e.target.name === "Username") {
            if (e.target.value.length === 0) {
                setMainFormError({ ...MainFormError, UsernameError: "Username is Required" });
                setValidBox({ ...ValidBox, UsernameValid: "is-invalid" });
            } else
                if (e.target.value.length < 8) {
                    setMainFormError({ ...MainFormError, UsernameError: "Username should be more then 8 characters" });
                    setValidBox({ ...ValidBox, UsernameValid: "is-invalid" });
                }
                else {
                    setMainFormError({ ...MainFormError, UsernameError: "" });
                    setValidBox({ ...ValidBox, UsernameValid: "is-valid" });
                }
        }
    };

    const handleNext = () => {
        console.log(Mainstate);
        message.open({
            key: 'updatable',
            type: 'loading',
            content: 'Loading...',
        });
        axios.post('https://filmopedia-server.cyclic.app/server/checkUser', Mainstate,{
            headers:{
                Accept: 'application/json',
                'Access-Control-Allow-Origin': 'https://chiruvaradani.github.io/Filmopedia/'
            }
        }).then((res) => {
            if(res){

                setshowNextForm(true)
                setTimeout(() => {
                    message.open({
                        key: 'updatable',
                        type: 'loading',
                        content: 'Proceeding',
                        duration: 2,
                    });
                }, 1000);
            }else{
                setTimeout(() => {
                    message.open({
                        key: 'updatable',
                        type: 'error',
                        content: 'User already exist',
                        duration: 2,
                    });
                }, 1000);
            }
        }).catch((err) => {
            setshowNextForm(false)
            console.log("Already Exist");
            setTimeout(() => {
                message.open({
                    key: 'updatable',
                    type: 'error',
                    content: 'Issue with Database',
                    duration: 2,
                });
            }, 1000);
           
        })
    }


    const handleSecondForm = (e) => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        setSecondState({ ...SecondState, [e.target.name]: e.target.value });
        if (e.target.name === "password") {
            if (e.target.value.length === 0) {
                setSecondFormError({ ...SecondFormError, passwordError: "Password is Required" });
                setValidBox({ ...ValidBox, passwordValid: "is-invalid" });
            } else
                if (!passwordPattern.test(e.target.value)) {
                    setSecondFormError({ ...SecondFormError, passwordError: "Invalid Password" });
                    setValidBox({ ...ValidBox, passwordValid: "is-invalid" });
                }
                else {
                    setSecondFormError({ ...SecondFormError, passwordError: "" });
                    setValidBox({ ...ValidBox, passwordValid: "is-valid" });
                }
        }

        if (e.target.name === "confirmPassword") {
            console.log(SecondState.password);
            console.log(SecondState.password === e.target.value);
            if (SecondState.password !== e.target.value) {
                setSecondFormError({ ...SecondFormError, confirmPasswordError: "Password mismatch" });
                setValidBox({ ...ValidBox, confirmPasswordValid: "is-invalid" });
            }
            else {
                setSecondFormError({ ...SecondFormError, confirmPasswordError: "" });
                setValidBox({ ...ValidBox, confirmPasswordValid: "is-valid" });
            }
        }
        if (e.target.name === "mobile") {
            console.log(e.target.value.length);
            if (e.target.value.length === 0) {
                setSecondFormError({ ...SecondFormError, mobileError: "mobile is Required" });
                setValidBox({ ...ValidBox, mobileValid: "is-invalid" });
            } else
                if (e.target.value.length !== 10) {
                    setSecondFormError({ ...SecondFormError, mobileError: "mobile should be of 10 digits" });
                    setValidBox({ ...ValidBox, mobileValid: "is-invalid" });
                }
                else {
                    setSecondFormError({ ...SecondFormError, mobileError: "" });
                    setValidBox({ ...ValidBox, mobileValid: "is-valid" });
                }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const UserData = ({ ...Mainstate, ...SecondState });
        delete UserData.confirmPassword
        console.log(UserData);
        message.open({
            key: 'updatable',
            type: 'loading',
            content: 'Loading...',
        });
        console.log(UserData);
        axios.post('https://filmopedia-server.cyclic.app/server/newUserData', UserData).then((res) => {
            // console.log("data posted successfully");
            setTimeout(() => {
                message.open({
                    key: 'updatable',
                    type: 'success',
                    content: 'Registered successfully',
                    duration: 2,
                });
                navigate('/login')
            }, 1000);
          }).catch((err)=>{
           setTimeout(() => {
            message.open({
                key: 'updatable',
                type: 'error',
                content: 'Could Not Connect to Database',
                duration: 2,
            });
           }, 1000);
          })

    }


    return (
        <div>

            <div className="mx-4 mx-auto col-12 p-3 bg-transparent " style={{ height: 'auto' }}>
                <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '' }}>
                    {/* //first Form */}
                    <div className="col-12 text-light ">

                        {
                            !showNextForm ?
                                <>
                                    <div className="firstform">
                                        <h1>Register now</h1>
                                        <hr style={{ color: 'orange' }} />
                                        <div className="col-12">
                                            <div className="">
                                                <div className="form-floating mt-2">
                                                    <input onChange={handleChange} type="text" className={`form-control text-light inputStyle ${ValidBox.UsernameValid}`} id="floatingInput" value={Mainstate.Username} name='Username' placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Username</label>
                                                </div>
                                                {
                                                    MainFormError.UsernameError && <span className='text-danger'>{MainFormError.UsernameError}</span>
                                                }
                                            </div>

                                        </div>

                                        <div className="form-floating mt-3">
                                            <input onChange={handleChange} type="email" className={`form-control mt-2 text-light inputStyle ${ValidBox.emailValid}`} value={Mainstate.email} id="floatingInput" name='email' placeholder="" />
                                            <label htmlFor="floatingInput">Email</label>
                                        </div>
                                        {
                                            MainFormError.emailError && <span className='text-danger'>{MainFormError.emailError}</span>
                                        }

                                        <div className="form-group mt-2">

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => postDetails(e.target.files[0])}
                                                className="form-control inputStyle"
                                                placeholder='Select'

                                            />
                                        </div>
                                        <button disabled={DisableNext} onClick={() => handleNext()} className='btn btn-warning form-control mt-2'>{loading ? <Spin /> : "Next"}</button>
                                        {/* <div className="divider-container my-2">
                                            <div className="line"></div>
                                            <span className="text fs-6">Signup Using</span>
                                            <div className="line"></div>
                                        </div>
                                        <div className="container">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-6 d-flex justify-content-end align-content-end">
                                                        <LoginSocialGoogle
                                                            client_id={
                                                                "87011631821-vs899dqioos1vnlugiorfqlg8venumre.apps.googleusercontent.com"
                                                            }
                                                            
                                                            access_type="offline"
                                                            a
                                                            scope="openid profile email"
                                                            discoveryDocs="claims_supported"
                                                            onResolve={handleData}
                                                            onReject={(err) => {
                                                                console.log(err);
                                                            }}

                                                        >
                                                            <GoogleLoginButton
                                                                className='google'
                                                            />
                                                        </LoginSocialGoogle>
                                                    </div>
                                                    <div className="col-6 col-6 d-flex justify-content-start align-content-start">
                                                        <LoginSocialFacebook

                                                            appId="837907941246491"
                                                            onResolve={handleData}
                                                            onReject={(err) => {
                                                                console.log(err)
                                                            }}
                                                        >
                                                            <FacebookLoginButton className='facebook' />
                                                        </LoginSocialFacebook>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}

                                        <p className='text-light text-start my-2'>Already a User.? <Link onClick={() => props(true)} >Login Now</Link></p>

                                    </div>
                                </> :
                                <div className="secondform">
                                    <div className="col-5 mx-auto text-center" style={{overflow:'hidden',borderRadius: '50%',border:'2px solid white'}}>
                                        <div className="" style={{height:"150px",objectFit:'cover'}}>
                                        <img src={Mainstate.profile && Mainstate.profile} style={{objectFit:'contain',width:'100%',height:'100%' }} alt="" />
                                       
                                        </div>
                                    </div>
                                    <h3 className='mt-3 text-center'>{Mainstate.Username && Mainstate.Username}</h3>
                                    <hr style={{ color: 'orange' }} />
                                    <div className='col-12'>
                                        <div className="form-floating mt-2">
                                            <input onChange={handleSecondForm} type="text" className={`form-control text-light inputStyle ${ValidBox.mobileValid}`} id="floatingInput" name='mobile' placeholder="name@example.com" />
                                            <label htmlFor="floatingInput">Contact No.</label>
                                        </div>
                                        {
                                            SecondFormError.mobileError && <span className='text-danger'>{SecondFormError.mobileError}</span>
                                        }

                                    </div>
                                    <div className="form-floating">
                                        <input onChange={handleSecondForm} type={"text"} className={`form-control mt-2 text-light  inputStyle ${ValidBox.passwordValid}`} name='password' id="floatingPassword" style={{ zIndex: 99 }} placeholder="Password" />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    {
                                        SecondFormError.passwordError && <span className='text-danger'>{SecondFormError.passwordError}</span>
                                    }



                                    <div className="form-floating">
                                        <input onChange={handleSecondForm} type={"text"} className={`form-control mt-2 text-light  inputStyle ${ValidBox.confirmPasswordValid}`} name='confirmPassword' id="floatingPassword" style={{ zIndex: 99 }} placeholder="Password" />
                                        <label htmlFor="floatingPassword">Confirm Password</label>
                                    </div>
                                    {
                                        SecondFormError.confirmPasswordError && <span className='text-danger'>{SecondFormError.confirmPasswordError}</span>
                                    }

                                    <button onClick={handleSubmit} className={`mt-3 p-1  ${DisableLogin ? "login text-muted" : "login enabled"} text-light`} style={{ width: '100%', cursor: `${DisableLogin ? "not-allowed" : "pointer"}` }} disabled={DisableLogin}>Signup</button>
                                </div>

                        }


                    </div>


                </div>
                {/*  */}


            </div>
        </div>
    )
}

export default RegisterPage
