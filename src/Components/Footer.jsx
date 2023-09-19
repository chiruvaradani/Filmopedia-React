import React from 'react'
import { Logo } from '../API_Files/AuthKeys'
import { Navigate, useNavigate } from 'react-router-dom'
import './Details.css';

const Footer = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className="p-2 text-light " style={{zIndex:99}}>
      <div className="col-lg-4 col-md-6 col-8 mx-auto text-center col-12 ">
        {/* <div className="row"> */}
          {/* <div className="col-4 ms-5">

          <img src={Logo} style={{ width: '35px', height: '35px', borderRadius: '50%' }} alt="" />
          </div> */}
          {/* <div className="col-6 m-0 p-0"> */}

          
            <h4 className='text-center p-0 m-0'>Filmopedia Movie Database App</h4>  
      
          {/* </div> */}
          
        {/* </div> */}
      </div>
      <hr className='p-0 my-'  />
        <div className="col-12 text-center">
            
          <div className="row p-0">
            <div className="col-4 footer-links" onClick={()=>navigate('/about')}>About</div>
            <div className="col-4 footer-links">Contact Us</div>
            <div className="col-4 footer-links">FAQ's</div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
