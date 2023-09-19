import React, { useEffect, useState } from "react";
import {
  GetGenres,
  GetTrending,
  MoviesByCategory,
  SearchMovie,
} from "../API_Files/MoviesApi/MoviesApi";
import Card from "../Reusables/Cards";
import { Imageurl, w500 } from "../API_Files/AuthKeys";
import { useNavigate } from "react-router-dom";
import '../Reusables/CardsWithAnimation.css'

const SearchComponent = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [SearchedData, setSearchedData] = useState([]);
  const [InPopularMovies, setInPopularMovies] = useState([]);
  const [Popular, setPopular] = useState([]);
  const recentSearches = []

  useEffect(() => {
    recentSearches.push(JSON.parse(localStorage.getItem('RecentSearches')))
    GetTrending().then((res) => {
      setInPopularMovies(
        res.results.filter((res) => res.original_title !== null)
      );
    });
    MoviesByCategory(1, "popular").then((res) => {
      setPopular(res.results.filter((res) => res.original_title !== null));
    });



  }, []);

  // console.log(InPopularMovies);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchedData('');
    setSearchText(value);
    if (searchText !== "") {
      SearchMovie(value).then((res) => {
        // console.log(typeof res);
        setSuggestions(res?.results?.slice(0, 10).map((res) => res));
      });
    }
  };



  const handleSuggestionClick = (suggestion) => {
    // console.log(suggestion.media_type);
    setSearchText(suggestion);
    setSearchedData(suggestion);
    // SearchMovie(suggestion).then((res) => {
    //   console.log(res);
    // });
    setSuggestions([]);
  };

  // console.log(SearchedData);

  const handleInputSubmit = (event) => {
    event.preventDefault();
    // Perform search or other actions with the selected suggestion
    // console.log("Selected suggestion:", searchText);
    

  };

  // console.log(SearchedData);



  return (
    <div>


      <form onSubmit={handleInputSubmit}>
        <div className="col-10 mt-2 mx-auto">
          <div className="input-group ">
            <input
              type="text"
              className="form-control col-12"
              placeholder="Search By Movie Name"
              // value={searchText.name || searchText.title}
              style={{ borderRadius: "20px 0px 0px 20px " }}
              // style={{borderRadius: " 20px "}}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button style={{borderRadius: " 0px 20px 20px 0px"}} className="btn col-1 btn-warning" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
          <ul
            className="list-group col-12"
            style={{ display: "block", maxHeight: "240px" }}
          >

            {suggestions.map((suggestion, i) => (
              <li
                key={i}
                className="list-group-item col-12"
                style={{ backgroundColor: "white", cursor: "pointer" }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {
                  suggestion?.name ?
                    <>
                      <i className="fa-solid fa-magnifying-glass"></i> &nbsp;{" "}
                      {suggestion.name} {" in Persons "}
                    </> :
                    <>
                      <i className="fa-solid fa-magnifying-glass"></i> &nbsp;{" "}
                      {suggestion.title} {" in Movies "}
                    </>

                }
              </li>
            ))}
          </ul>


      <div className="container">
        {
          searchText && SearchedData ?
            (SearchedData.media_type === "movie" ?
              <SearchedMovie searchText={searchText} SearchedData={SearchedData} />
              :
              <SearchedActor searchText={searchText} SearchedData={SearchedData} />

            ) : (
              <>
                <SuggestedCategories
                  InPopularMovies={InPopularMovies}
                  header={"Trending"}
                />
                <SuggestedCategories
                  InPopularMovies={Popular}
                  header={"Popular"}
                />
              </>
            )
        }
      </div>

    </div>
  );
};

const SearchedMovie = (props) => {

  const navigate = useNavigate()
  const SearchedData = props.SearchedData
  const searchText = props.searchText

  return (
    <div className="col-11 mx-auto">
      <div className="row">
        <div className="col-12">
          {
            searchText.length > 1 && SearchedData && (
              <>
                <h3 className="text-light mt-3">{SearchedData.length} Results Found</h3>
                <hr className="text-light col-12 me-4 p-0" />

                <div
                  onClick={() => navigate(`/search/${SearchedData.id}`)}
                  className="card col-12 searchCard rounded-2 my-3 mx-2 p-0 border-0"
                  style={{
                    maxHeight: "200px",
                    backgroundImage: ` linear-gradient(to bottom right, #1a98ff, rgb(0,0,0,0.9))`,
                  }}
                >
                  <div className="row g-0">
                    <div className="col-md-2">
                      {SearchedData.poster_path ? (
                        <img
                          style={{
                            height: "200px",
                            borderRadius: " 5px 0px 0px 5px",
                          }}
                          className="card-img"
                          src={Imageurl + SearchedData.poster_path}
                          alt=""
                        />
                      ) : (
                        <img
                          style={{ height: "200px" }}
                          className="rounded-2 card-img"
                          src={
                            "https://th.bing.com/th/id/R.92bbcc343f7b1f92248638406dc5a626?rik=Jn0ckhzfVncgow&riu=http%3a%2f%2fak2.picdn.net%2fshutterstock%2fvideos%2f22386277%2fthumb%2f1.jpg&ehk=Aa%2bu6s%2bYhu8daTdVEdJWY7VjMfo0rpnpStl0eIPxWcw%3d&risl=&pid=ImgRaw&r=0"
                          }
                          alt=""
                        />
                      )}
                    </div>
                    <div className="col-md-8 text-light">
                      <div className="p-3">
                        <h4 className="fw-bolder line-limit1 m-0">
                          {SearchedData.title}
                        </h4>
                        <p className="p-0 m-0">
                          {" "}
                          <small>
                            {new Date(SearchedData.release_date).toDateString()}
                          </small>{" "}
                        </p>
                        <div className="mt-3">
                          <p className="p-0 m-0">Overview:</p>
                          <p className="p-0 m-0 line-limit">
                            {" "}
                            <small>{SearchedData.overview}</small>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )

              </>

            )}
        </div>
      </div>
    </div>
  )
}
const SearchedActor = (props) => {

  const navigate = useNavigate()
  const SearchedData = props.SearchedData
  const searchText = props.searchText

  return (
    <div className="col-11 mx-auto">
      <div className="row">
        <div className="col-12">
          {
            searchText && SearchedData && (
              <>
                {/* <h3 className="text-light mt-3">{SearchedData.length} Results Found</h3> */}
                <hr className="text-light col-12 me-4 p-0" />

                <div
                  onClick={() => navigate(`/search/${SearchedData.id}`)}
                  className="card col-3 rounded-2 my-3 mx-2 p-0 border-0"
                  style={{  backgroundColor: '#fff' }}
                >
                <div class="card-img-container">

                  {
                    SearchedData.profile_path ?
                      <img className="card-img-top zoom-rotate"  src={w500 + SearchedData.profile_path} alt="" /> :
                      SearchedData.gender === 1 ?
                        <img className="card-img-top zoom-rotate"  src={"https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-373-456325-512.png"} alt="" /> :
                        <img style={{ borderRadius: '50%', height: '110%' }} src={"https://www.shareicon.net/data/2016/05/24/770124_man_512x512.png"} alt="" />
                  }
                </div>
                  <div className="card-body" style={{ backgroundColor: '#fff' }}>
                    <h2 className="card-title">{SearchedData.name}</h2>
                    <p className="card-text" style={{fontSize:'10px'}}>
                      {
                        SearchedData.known_for.map((res) => res.title).join(", ")
                      }

                    </p>
                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                  </div>
                </div>
                )

              </>

            )}
        </div>
      </div>
    </div>
  )
}

const SuggestedCategories = (props) => {
  const navigate = useNavigate();
  const InPopularMovies = props.InPopularMovies;
  return (
    <div className="container">
      <div className="col-12 text-light">
        <h1 className="mt-3">
          <i className="fa-solid fa-arrow-trend-up"></i> {props.header}{" "}
        </h1>
        <div className="row">
          {InPopularMovies.map((res, i) => (
            <div key={i} className="col-2 my-2">
              <button
                style={{ color: "white" }}
                onClick={() => navigate(`/search/${res.id}`)}
                className="rounded-5 btn btn-sm col-12 btn-outline-info text-truncate"
              >
                {res.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
