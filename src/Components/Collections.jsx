import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MoviesByCategory } from '../API_Files/MoviesApi/MoviesApi';
import CardSecType from '../Reusables/CardsSecType';
import Filters from '../Reusables/Filters';

const Collections = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Language, setLanguage] = useState('');

  const [GenresArray, setGenresArray] = useState([]);
useEffect(() => {
  window.scroll(0,0)
 
});


  useEffect(() => {
    setItems([]); // Clear the existing items

    // Fetch movies based on the selected language, category, and page number
    MoviesByCategory(page, params.collection, Language)
      .then((res) => {
        // console.log(res.results[0].title);//
        let data = res.results;
        setItems((prevItems) => {
          const filteredItems = prevItems.filter((item) => item.original_language === Language);
          return [...filteredItems, ...data];
        });
      })
      .catch((error) => {
        // console.error('Error fetching movies:', error);
      });
  }, [params.collection, page, Language]);

  const sortedItemsRef = useRef(items);
  useEffect(() => {
    sortedItemsRef.current = [...items]; // Update the ref with the sorted items

  }, [items]);

  function Languages(langID) {
    // console.log(langID);
    setLanguage(langID)
  }
  function GenresArrayFunc(name) {
    setGenresArray([...GenresArray, name])
  }





  // console.log(items);

  function sorting(sortType) {
    let sortedItems = [...items];

    switch (sortType) {
      case 'rating low-high':
        sortedItems.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case 'rating high-low':
        sortedItems.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'sort_by_popularity low-high':
        sortedItems.sort((a, b) => a.popularity - b.popularity);
        break;
      case 'sort_by_popularity high-low':
        sortedItems.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'sort_by_release_date old_new':
        sortedItems.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        break;
      case 'sort_by_release_date new_old':
        sortedItems.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      case 'sort_by_Title A-Z':
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'sort_by_Title Z-A':
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;

      default:
        break;
    }
    setItems([...sortedItems]); // Update the state with the sorted items
   
  }

  const handleGenres = (name) => {
    setGenresArray((prevGenres) => {
      const updatedGenres = prevGenres.filter((genre) => genre !== name);

      // Check if any genres are remaining in the updatedGenres array
      if (updatedGenres.length > 0) {
        setItems((prevItems) => {
          const filteredItems = prevItems.filter((item) => {
            return updatedGenres.some((genre) => item.genre_ids.includes(genre.id));
          });
          return filteredItems.length > 0 ? filteredItems : prevItems;
        });
      } else {
        MoviesByCategory(page, params.collection, Language)
          .then((res) => {
            // console.log(res.results[0].title);
            let data = res.results;
            setItems((prevItems) => {
              const filteredItems = prevItems.filter((item) => item.original_language === Language);
              return [...filteredItems, ...data];
            });
          })
          .catch((error) => {
            // console.error('Error fetching movies:', error);
          });
      }

      return updatedGenres;
    });
  };

  useEffect(() => {
    if (GenresArray.length > 0) {
      setItems((prevItems) => {
        const filteredItems = prevItems.filter((item) => {
          // Check if any genre object from GenresArray matches the item's genre_ids
          return GenresArray.some((genre) => item.genre_ids.includes(genre.id));
        });
        return filteredItems;
      });
    } else {
      // If GenresArray is empty, display all items
      setItems(() => {
        return [...items]
      });
    }
  }, [GenresArray]);





  // console.log(GenresArray);

  return (
    <div>
      <div className="mx-3">
        <div className="col-12 list">
          <div className="row">
            <div className="col-lg-2 col-12">
              <Filters sorting={sorting} Languages={Languages} GenresArray={GenresArray} GenresArrayFunc={GenresArrayFunc} />
            </div>
            <div className="col-lg-10 col-12">
            {
              GenresArray.length && <span className='text-light'>Selected Genres: </span>
            }
              {
                GenresArray?.map((res, key) =>

                  <React.Fragment key={key}>
                    
                    <button  className="bg-dark text-light rounded-5 m-1" style={{ border: '1px solid white', fontSize: '6px' }}>
                      {res.name} &nbsp;
                      <span onClick={() => handleGenres(res)}>X</span>
                    </button>
                  </React.Fragment>

                )
              }
        <h3 className='text-light text-capitalize'>{params.collection} Movies</h3>
              <hr className='text-light' />
              <div className="row">
                {items.map((res, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    className="col-lg-3 col-md-4 col-sm-4 col-6 p-0"
                  >
                    <CardSecType category={"movies"} type={params.collection} data={res} />
                  </div>
                ))}
              </div>
              {
                items.length>=20 &&
                <nav aria-label="Page navigation example">
                <ul className="pagination d-flex justify-content-center">
                  <li className={`page-item ${page <= 1 ? "disabled" : ''}`} ><Link className="page-link" onClick={() => setPage(page - 1)} >Previous</Link></li>
                  <li className="page-item"><Link className="page-link" onClick={() => setPage(page)} >{page}</Link></li>
                  <li className="page-item"><Link className="page-link" onClick={() => setPage(page + 1)} >{page + 1}</Link></li>
                  <li className="page-item"><Link className="page-link" onClick={() => setPage(page + 2)} >{page + 2}</Link></li>
                  <li className="page-item"><Link className="page-link" onClick={() => setPage(page + 3)} >{page + 3}</Link></li>
                  <li className="page-item"><Link className="page-link" onClick={() => setPage(page + 1)} >Next</Link></li>
                </ul>
              </nav>
              }
              {/* <button onClick={() => setPage(page + 1)} className="btn form-control mx-auto btn-primary ">
                  See More
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
