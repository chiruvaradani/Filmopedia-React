import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css";
import "../mediaQuery.css";
import { Logo, w500 } from '../API_Files/AuthKeys';
import { GetTrending, MoviesByCategory, SearchMovie } from '../API_Files/MoviesApi/MoviesApi';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedUserData } from '../Store/UserSlice';
import { json } from 'react-router-dom/dist';
import Skeleton from 'react-loading-skeleton';

const Header = () => {
  const [searchBar, setSearchBar] = useState(false);
  const dispatch = useDispatch()
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [Loading, setLoading] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const isLoggedIn = (localStorage.getItem('token'))
  const UserData = useSelector(state=>state.userData)

  useEffect(() => {
    setLoading(true)
   if(UserData.length){
    setLoading(false)
   }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setNavbarVisible(true);
      } else {
        setNavbarVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      {
        isLoggedIn ?
          <nav className={`navbar navbarMain navbar-expand-lg navbar-dark position-fixed top-0 col-12`} style={{ zIndex: 100, backgroundColor: '#000' }} >
            <div className="container-fluid">
              <Link className="navbar-brand" to={'/'}>
                <img src={require('../assets/Vector_Logo.png')} style={{ width: '25px', height: '25px', borderRadius: '50%' }} alt="" />
                &nbsp;
                Filmopedia
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto my-2 my-lg-0 " style={{ '--bs-scroll-height': '100px' }}>

                  <li className="nav-item">
                    <NavLink className="nav-link mx-3 py-2" aria-current="page" to={'/'}>Home</NavLink>
                  </li>
                </ul>
                <SearchButton />

                <ul className='navbar-nav ' >
                  
                  
                <li className="nav-item dropdown ">
                    <NavLink className="nav-link " role="button" data-bs-toggle="dropdown" aria-expanded="true" >Profile
                    </NavLink>
                
                    <ul className="dropdown-menu  mx-1 col-12 LoginCard mt-2" style={{border:'1px solid orange'}}>
                      <li><Link className='dropdown-item fw-bold text-light ' to={'/profile'}><p className='p-0 m-0'  style={{fontSize:'14px'}}>{UserData?.Username}</p> 
                      <p className='p-0 m-0' style={{fontSize:'8px',opacity:0.5}}>View Profile</p>
                      </Link>  </li>
                      <hr className='col-11 text-warning mx-auto my-0' />
                      
                      <li><Link to={'/user/watchlist'} className="dropdown-item text-light  py-1" style={{fontSize:'12px'}} ><i className="fa-solid  me-2 fa-plus"></i> Watchlist</Link></li>

                      <li><Link to={'/user/favorites'} className="dropdown-item text-light  py-1" style={{fontSize:'12px'}} ><i className="fa-solid me-2 fa-heart "></i> Favorites</Link></li>
                      
                      <hr className='col-11 text-warning mx-auto my-0' />
                      
                      {/* <li><Link  className="dropdown-item text-light  py-1" style={{fontSize:'12px'}} ><i className="fa-solid  me-2 fa-user"></i> Edit Profile</Link></li> */}

                      {/* //Temporary Disabled */}
                      {/* <li><Link to={'/settings'} className="dropdown-item text-light  py-1" style={{fontSize:'12px'}} ><i className="fa-solid  me-2 fa-gear"></i> Settings</Link></li> */}
                     
                     
                      <li><Link className="dropdown-item text-light  py-1 " style={{fontSize:'12px'}} to={'/login'} onClick={() => { localStorage.clear(); dispatch(LoggedUserData(null)) }}><i className="fa-solid  me-2 fa-power-off"></i> Log Out</Link></li>
                     
                    </ul>

                  </li>
                  <li className="nav-item col-auto  ">
                    <NavLink className="nav-link text-light active py-2" to={'/movies'}> Movies</NavLink>
                  </li>
                  <li className="nav-item col-auto ">
                    <NavLink className="nav-link text-light  py-2" to={'/tvShows'}> TV shows</NavLink>
                  </li>

                  <li className="nav-item col-auto ">
                    
                  </li>

                  


                </ul>

              </div>
            </div>
          </nav> :
          <nav className="navbar position  mx-1 position-fixed  top-0 col-12" style={{ backgroundColor: 'none',zIndex:1 }}>
            <div className="container"> 
              <Link className="navbar-brand  mx-1" to={'/'} >
                <img src={require('../assets/Vector_Logo.png')} className='rounded-5' alt="Bootstrap" width="30" height="28" />
                <span className='pt-3 fs-4 text-light mx-2 py-3'>Filmopedia</span>
              </Link>
            </div>
          </nav>
      }
    </>
  );
};

const SearchButton = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    GetTrending().then((res) => {
      const filteredResults = res?.results?.filter((res) => res.original_title !== null);
      setSuggestions(filteredResults);
    });
    MoviesByCategory(1, "popular").then((res) => {
      const filteredResults = res.results.filter((res) => res.original_title !== null);
      setSuggestions(filteredResults);
    });
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    setShowDropdown(value !== "");
    if (value !== "") {
      SearchMovie(value).then((res) => {
        const filteredResults = res?.results?.slice(0, 10).map((res) => res);
        setSuggestions(filteredResults);
      });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // console.log(suggestion);

    setSearchText(suggestion);
    setShowDropdown(false);
    if (suggestion.media_type === "movie") {
      navigate(`/popular/${suggestion.id}`)
      setSearchText('')
    }
    else if (suggestion.media_type === "person") {
      navigate(`/celebrity/${suggestion.id}`)
      setSearchText('')
    }

  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    // console.log("Selected suggestion:", searchText);
  };

  useEffect(() => {
    // Handle click outside of the dropdown to close it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar-overlay col-lg-8 mx-auto col-12 ">
      <div className="container col-12" ref={dropdownRef}>
        <form onSubmit={handleInputSubmit}>

          <div className="search-box ">
            <i className="search-icon fa-solid px-2 fa-magnifying-glass bg-white fs-6"></i>
            <input type="text" className='border-0 form-control rounded-5 ' placeholder="Search for Movies or Actors . . ."
              value={searchText}
              onChange={handleInputChange} />
          </div>


          {showDropdown && suggestions ? (
            <ul className="dropdown-menu list-group lists " style={{ maxHeight: '200px', overflow: 'auto', width: '56%' }}>
              {suggestions.map((suggestion, i) => (
                <li
                  key={i}
                  className="list-group-item "
                  style={{ backgroundColor: "white", cursor: "pointer", fontSize: '10px' }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion?.title ? (
                    <>

                      <div className="col-12">
                        <div className="row">
                          <div className="col-11" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <i className="fa-solid fa-film"></i>
                            &nbsp;{" "}
                            {suggestion.title} in &nbsp;<b> Movies</b>
                          </div>
                          <div className="col-1 float-end">
                            <img src={w500 + suggestion.poster_path} style={{ height: '40px' }} alt="" />

                          </div>

                        </div>
                      </div>
                    </>
                  )
                    :
                    <>

                      <div className="col-12">
                        <div className="row">
                          <div className="col-11" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <i className="fa-solid fa-user"></i>
                            &nbsp;{" "}
                            {suggestion.name} in &nbsp; <b> Persons</b>
                          </div>
                          <div className="col-1 float-end">
                            <img src={w500 + suggestion.profile_path} style={{ height: '40px' }} alt="" />

                          </div>

                        </div>
                      </div>
                    </>

                  }
                </li>
              ))}
            </ul>
          ) : null
          }
        </form>
      </div>
    </div>
  );
};


export default Header;
