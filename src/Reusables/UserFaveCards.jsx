import React, { useEffect, useState } from 'react'
import { Imageurl } from '../API_Files/AuthKeys';
import './CardsWithAnimation.css'
import { RemoveFromWishlist } from '../API_Files/usersApi/userApi';
import { useDispatch } from 'react-redux';
import { LoggedUserData } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const UserFaveCards = ({ data, type }) => {

  const [Loading, setLoading] = useState(true);
  const [RespData, setRespData] = useState([]);
  console.log(data);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setRespData(data);
        setLoading(false);
      }, 1000);
    }
  }, [data]);

  const RemoveWishlist = (id, type) => {
    console.log(id, type);
    RemoveFromWishlist(id, type).then((res) => {
      // console.log(res);
      dispatch(LoggedUserData(res[0]))
    })
  }

  return (
    <div>
      {Loading ?
        <>
          <Skeleton className="mx-2 rounded-4" height={300} width={180} />
        </>
        :
        <div className="card bg-dark text-light">
          <div className="card bg-dark text-light p-1 border-0 rounded-2"  onClick={() => navigate(`/watchlist/${RespData.id}`)} style={{ overflow: 'hidden', position: 'relative' }}>
            <div className='rounded-2' style={{ overflow: 'hidden' }} >
              <img className="card-imgs " src={Imageurl + RespData.poster_path} style={{ width: '100%', zIndex: -1, objectFit: 'cover' }} alt="" />
            </div>
          </div>
          <div className="card-body py-1  px-2" >
            <h6 className='fw-bolder p-1 m-0 line-limit1' style={{ height: '25px' }}>{RespData.title}</h6>
            <div className="float-end" style={{ position: 'absolute', top: '2%', right: '5%' }}>
              <button className='rounded-circle btn btn-dark py-0 px-2' onClick={() => RemoveWishlist(RespData.id, type)} style={{ width: 'auto' }}>X</button>
            </div>
            <hr className='my-1' />
            <span className='line-limit font-size-reduced' style={{ fontSize: '12px' }}>{RespData.overview}</span>
          </div>
        </div>
      }

    </div>
  )
}

export default UserFaveCards
