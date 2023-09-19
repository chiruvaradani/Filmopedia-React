import React, { useEffect, useState } from 'react';
import { MovieImages } from '../API_Files/MoviesApi/MoviesApi';
import { Imageurl } from '../API_Files/AuthKeys';
import Aos from 'aos';
// import filesearching from '../Reusables/filesearching.gif'

const ImagesGallery = ({ data, type }) => {

  const [selectedImage, setselectedImage] = useState(null);
  const [Copied, setCopied] = useState(false);
  const [clipboardValue, setclipboardValue] = useState('');

  // console.log(data);

  useEffect(() => {
    Aos.init()
    window.scroll(0,0)
  });

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
    setclipboardValue(url)
  };
  // console.log(ImagesData);

  return (
    <div className='text-light col-12'  >
      {/* Mapping using Object.keys() */}
      {/* <h1 className='text-light text-capitalize ms-3 my-2'>{type}</h1> */}
      <div className='row'>
        {data.length ? data.map((resp, respIndex) => (
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            key={respIndex} className={`text-center mx-2 ${type === "posters" ? "col-lg-2 col-md-4 col-sm-6 col-6" : "col-lg-3 col-md-4 col-sm-6 col-12"} mx-auto mb-3`} style={{
              backgroundColor: type === "logos" ? "#212121" : ""
            }}>
            <img
              className='w-100 imageGallery'

              style={{ objectFit: 'cover', maxHeight: type === "posters" ? "100%" : 'auto', maxWidth: type === "posters" && "100%",width:type==="Backdrops"&&'100%' }}
              src={Imageurl + resp?.file_path}
              alt=''
              data-bs-toggle="modal" data-bs-target="#exampleModal"
              onClick={() => setselectedImage(resp)}
            />
          </div>
        )) :
          <div className="col-lg-4 col-md-6 col-12 mx-auto" style={{ minHeight: '80vh' }}>
            <div className="text-center">
              {/* <img style={{ width: '100%' }} src={filesearching} alt="" /> */}
              <h4 className='text-light'>Sorry! No Data Found</h4>
            </div>
          </div>
        }
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className={`modal-dialog ${type === "posters" ? "modal-sm" : 'modal-lg'} modal-dialog-centered`}>
          <div className="modal-content" style={{ backgroundColor: '#fff', maxWidth: '100%' }}>
            <div className="modal-header border-0 text-light p-0 text-end ">
              <div className="ms-auto">
                <button type="button" className="text-dark btn fw-bolder" data-bs-dismiss="modal" aria-label="Close">X</button>

              </div>
            </div>
            <div className="modal-body p-0 m-0 mx-auto text-dark" style={{ backgroundColor: 'white' }} >

              <img
                className='p-0 m-0 '
                style={{ maxHeight: '449px', width: '100%', objectFit: 'cover' }}
                src={Imageurl + selectedImage?.file_path}
                alt=''
              />
              <div className="col-12 p-3 mx-auto" style={{ backgroundColor: '#fff' }}>
                <div className="row">
                  <div className="col-auto text-center">
                    <p className='p-0 m-0'>height: <span className='fw-bolder'>{selectedImage?.height}px</span> </p>

                  </div>
                  <div className="col-auto text-center">
                    <p className='p-0 m-0'>Width:<span className='fw-bolder'>{selectedImage?.width}px</span></p>

                  </div>
                  <div className="col-auto text-center d-block d-md-none">

                    <p className='p-0 m-0 '>Aspect Ratio:<span className='fw-bolder'>{selectedImage?.aspect_ratio}</span> </p>

                  </div>


                </div>
                <div className="col-10 input-group rounded-4 mt-2">
                  <input className='form-control rounded-start-4' readOnly type="text" value={selectedImage ? Imageurl + selectedImage.file_path : ""} />
                  {
                    clipboardValue === `${selectedImage?.file_path && Imageurl + selectedImage?.file_path}` ?
                      <button disabled className='btn btn-primary rounded-end-4' ><i className="fa-solid fa-check"></i></button> :
                      <button className='btn btn-primary rounded-end-4' onClick={() => handleCopy(Imageurl + selectedImage.file_path)} ><i className="fa-solid fa-copy"></i></button>
                  }
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ImagesGallery;
