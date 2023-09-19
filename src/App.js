import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoggedUserData } from './Store/UserSlice';
import Header from './Components/Header';
import MoviesPage from './Components/MoviesPage';
import Collections from './Components/Collections';
import DetailsPage from './Components/DetailsPage';
import SearchComponent from './Components/SearchComponent';
import ActorDetails from './Components/ActorDetails';
import Footer from './Components/Footer';
import AboutUs from './InfoComponents/AboutUs';
import MediaPage from './Components/MediaPage';
import LoginPage from './UserComps/LoginPage';
import Protected from './API_Files/Protected';
import { getUserData } from './API_Files/usersApi/userApi';
import Profile from './UserComps/Profile';
import UserSettings from './UserComps/UserSettings';
import EditProfile from './UserComps/EditProfile';
import DeleteAccount from './UserComps/DeleteAccount';
import UserMovies from './Components/UserMovies';

const Homepage = lazy(() => import('./Components/Homepage'));
const ExplorePage = lazy(() => import('./Components/ExplorePage'));
const IsloggedIn = localStorage.getItem('userData');
const token = localStorage.getItem('token');

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(token);
    if (typeof token !== 'undefined' || typeof token !== null) {
      getUserData().then((res) => {
        // console.log(res);
        dispatch(LoggedUserData(res));
      });
    }
  }, [token]); // Empty dependency array ensures the effect runs only once (on mount).

  return (
    <div className="">
      <Header />
      <div className={`mt-5`}>
        <Suspense fallback={<div className='text-light fs-1'>Please Wait</div>}>
          <Routes>
            <Route element={<Protected />} />
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/movies' element={<Protected Component={MoviesPage} />} />
            <Route path='/profile' element={<Protected Component={Profile} />} />
            <Route path='/movies/:collection' element={<Protected Component={Collections} />} />
            <Route path='/user/:collection' element={<Protected Component={UserMovies} />} />
            <Route path='/:category/:id' element={<Protected Component={DetailsPage} />} />
            <Route path='/Explore/:language' element={<Protected Component={ExplorePage} />} />
            <Route path='/celebrity/:id' element={<Protected Component={ActorDetails} />} />
            <Route path='/about' element={<AboutUs />} />
            {/* <Route path='/settings' element={<UserSettings />} >
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="delete-profile" element={<DeleteAccount />} />
              <Route path="aboutUs" element={<AboutUs />} />
            </Route> */}
            <Route path='/media/:movieId' element={<Protected Component={MediaPage} />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}



export default App;
