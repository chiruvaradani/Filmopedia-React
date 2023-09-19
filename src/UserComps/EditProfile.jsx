import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component';
import { useSelector } from 'react-redux'
import { fetchGenres } from '../API_Files/MoviesApi/MoviesApi';
import './settings.css'
import EditProfileModal from './ModalSample';

const EditProfile = () => {
  const details = useSelector(state => state.userData)
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [genres, setgenres] = useState([]);

  // console.log(details);
  useEffect(() => {
    fetchGenres().then((res) => {
      // console.log(res);
      setgenres(res)
    })
  }, [])

  // console.log(genres);

  return (
    <div>
      <div className="">
        <h1 className='p-0 m-0'>Edit Profile</h1>
        <p className='p-0 m-0 ' style={{ opacity: '0.7' }}>{details.email}</p>
      </div>

      <hr />
      <div className="col-12">
        <div className="buttons" >
          <button className="btn mx-2 my-1 btn-secondary">
            change Username
          </button>
          <button className="btn mx-2 my-1 btn-secondary">
            change password
          </button>
        </div>
        <hr />

        <div className="mt-3">
          <h4>Add Details</h4>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <button className="btn btn-secondary rounded-circle " style={{ position: 'absolute', top: '80%', right: '20%' }} onClick={() => setShowModal(true)}>
          <i className='fa-solid fa-pen'></i>
        </button>
        <img src={details.profile} className='p-2' style={{ borderRadius: '50%', width: '80%' }} alt="" />
      </div>
      <br />
      <br />
      <br />
      <br />
      
      {/* Render the modal component */}
      <EditProfileModal image={details.profile} isOpen={showModal} onClose={() => setShowModal(false)} />
    
          <div className=" col-12">

            <div className="row">

              <div className="col-lg-6 col-md-6 col-12 my-1">
                <div className="form-floating ">
                  <input type="text" className={`form-control text-light inputStyle `} id="floatingInput" name='Username' placeholder="name@example.com" />
                  <label htmlFor="floatingInput">First Name</label>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12 my-1">
                <div className="form-floating ">
                  <input type="text" className={`form-control text-light inputStyle `} id="floatingInput" name='Username' placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Last Name</label>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12 my-1">
                <div className="form-floating ">
                  <input type="date" className={`form-control text-light inputStyle `} id="floatingInput" name='Username' placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Date of Birth</label>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12 my-1">
                <div class="form-floating">
                  <select style={{ color: 'white' }} class="form-select inputStyle " id="floatingSelect" aria-label="Floating label select example">
                    <option selected disabled style={{ opacity: '0.7 !important' }}>Select from below</option>
                    <option value="male" >Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  <label for="floatingSelect">Select the Gender</label>
                </div>
              </div>


            </div>
            


          </div>
        </div>

      </div>

    </div>
  )
}


export default EditProfile
