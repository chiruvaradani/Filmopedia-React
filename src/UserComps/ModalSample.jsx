import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateImage } from '../API_Files/usersApi/userApi';

const EditProfileModal = ({ isOpen, onClose, image }) => {
    const [profile, setprofile] = useState('');
    const userData=useSelector(state=>state.userData)
   
    const [pics, setpics] = useState();
    const [loading, setloading] = useState(false);


    const postDetails = (pics) => {
        setloading(true);
        if (pics === undefined) {
        }
        // console.log(pics);
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
                    setprofile(data.url.toString())
                    // console.log(data.url.toString());
                    setloading(false);
                })
                .catch((err) => {
                    // console.log(err);
                    setloading(false);
                });
        } else {

            setloading(false);
            return;
        }
    };

    const handleSubmit=()=>{
        UpdateImage(profile).then((res)=>{
            // console.log("Updated");
        })
    }

    // console.log(profile);

    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog " >
                <div className="modal-content">
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title">Update Profile Image</h5>
                        <button type="button" className="btn btn-close" onClick={onClose}>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="col-6 mx-auto">
                            {
                                profile? 
                                <img src={profile} style={{ width: '100%' }} alt="" />:
                                <img src={image} style={{ width: '100%' }} alt="" />
                            }
                            <input type="file"  onChange={(e)=>postDetails(e.target.files[0])} className='form-control inputStyle' />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>handleSubmit()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
