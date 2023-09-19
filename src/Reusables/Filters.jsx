import React, { useEffect, useRef, useState } from 'react';
import { fetchGenres, fetchLanguages } from '../API_Files/MoviesApi/MoviesApi';
import { useNavigate } from 'react-router-dom';

const Filters = (props) => {
  const [isFixed, setIsFixed] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.1;

      if (scrollHeight > threshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchLanguages().then((res) => {
      // const filteredResults = res.results.filter((res) => res.english_name);
      setLanguages(res);
    });
    fetchGenres().then((res) => {
      setGenres(res)
    })

  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    setShowDropdown(value !== '');

    const filteredResults = Languages.filter((language) =>
      language.english_name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredResults);
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

  const handleClick = (id) => {
    props.Languages(id)
    // setSearchText('')
    setShowDropdown(false);
    Check()
  }

  const Check = () => {
    let data = props.GenresArray.forEach((res) => props.GenresArray.includes(res.name))
    // console.log(data);
  }
  // console.log(props.GenresArray);


  return (
    <div className={`col-lg-12 col-12`}>
      <div className="mt-3">
        <div className=" p-2">

          <div className="col-12 p-0 m-0">
            <div className="accordion bg-dark col-12 " id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed p-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Sort Data
                  </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample" style={{ maxHeight: '120px', overflow: 'auto' }}>
                  <div className="accordion-body ps-2 py-0">
                    <ul style={{ cursor: 'pointer' }} className="list-group p-0 m-0 list-group-flush">
                      <li className="list-group-item pt-1 px-0" style={{ fontSize: '12px' }} onClick={() => props.sorting('rating low-high')}>
                        Rating low-high
                      </li>
                      <li className="list-group-item pt-1 px-0" style={{ fontSize: '12px' }} onClick={() => props.sorting('rating high-low')}>
                        Rating high-low
                      </li>
                      <li className="list-group-item pt-1 px-0" style={{ fontSize: '12px' }} onClick={() => props.sorting('sort_by_popularity low-high')}>
                        Popularity low-high
                      </li>
                      <li className="list-group-item pt-1 px-0" style={{ fontSize: '12px' }} onClick={() => props.sorting('sort_by_popularity high-low')}>
                        Popularity high-low
                      </li>
                      <li className="list-group-item pt-1 px-0" style={{ fontSize: '12px' }} onClick={() => props.sorting('sort_by_release_date old_new')}>
                        Release_date Old-New
                      </li>
                      <li className="list-group-item pt-1 px-0" style={{ fontSize: '12px' }} onClick={() => props.sorting('sort_by_release_date new_old')}>
                        Release_date New-Old
                      </li>
                      <li className="list-group-item pt-1 px-0" style={{ fontSize: '12px' }} onClick={() => props.sorting('sort_by_Title A-Z')}>
                        Title A-Z
                      </li>
                      <li className="list-group-item pt-1 px-0" style={{ fontSize: '12px' }} onClick={() => props.sorting('sort_by_Title Z-A')}>
                        Title Z-A
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>



            <div className="mt-2 ">
              <input type="text" className='border-0 col-12 form-control' placeholder="Search Language"
                value={suggestions.iso_639_1}
                onChange={handleInputChange} />
              <div className="col-12">
              {showDropdown && suggestions ? (
                <ul className="dropdown-menu list-group lists form-control" style={{width:'auto', maxHeight: '200px', overflow: 'auto', }}>
                  {suggestions.map((suggestion, i) => (
                    <li
                      key={i}
                      className="list-group mx-2 rounded-0 py-1"
                      style={{ borderBottom: '1px solid grey', backgroundColor: "white", cursor: "pointer", fontSize: '12px' }}
                      onClick={() => handleClick(suggestion.iso_639_1)}
                    >
                      {suggestion?.english_name && (
                        <>

                          {suggestion.english_name}
                        </>
                      )
                      }
                    </li>
                  ))}
                </ul>
              ) : null
              }
              </div>
            </div>


            <div className="accordion p-0 mt-2" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Genres
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className="col-auto">
                      {
                        Genres.map((res, key) => (
                          <button
                            onClick={() => props.GenresArrayFunc(res)}
                            key={key}
                            disabled={props.GenresArray.some((genre) => genre.name === res.name)}
                            className={`rounded-5 m-1`}
                            style={{ border: '1px solid black', fontSize: '12px' }}
                          >
                            {res.name}
                          </button>
                        ))
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>

  );
};

export default Filters;
