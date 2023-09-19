import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Imageurl } from '../API_Files/AuthKeys';

const CardSecType = (props) => {
  const [IsHoveres, setIsHoveres] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [RespData, setRespData] = useState([]);
  const navigate = useNavigate()
  // console.log(props);  


  useEffect(() => {
    if (props.data) {
      setTimeout(() => {
        setRespData([props.data])
        setLoading(false)
      }, 1000);
    }
  }, [props.data]);

  return (
    <div className='mb-4 col-12' style={{ zIndex: -1 }}>
      {Loading &&

        <>
          <div className="col-auto">
            <Skeleton className='mx-2' height={230} width={160} />
          </div>
        </>

      }
      {
        Loading === false &&
        <>

          {RespData.map((data, i) =>
            <div key={i} onClick={() => navigate(`/${props.type}/${data.id}`)}
              className="card HomeCard card-comp border-0 mx-3" style={{backgroundColor:'#000'}} onMouseEnter={() => setIsHoveres(true)} onMouseLeave={() => setIsHoveres(false)} >
              {
                data.poster_path ?

                  <img style={{ height: '100%',minHeight:'250px',width:'100%' }} className='rounded-2 card-img' src={Imageurl + data.poster_path} alt="" /> :
                  <img style={{ height: '100%',minHeight:'250px', width: '100%' }} className='rounded-2 card-img ' src={'https://th.bing.com/th/id/OIP._5F3Fg7SM_JcA6jbw6EU4QAAAA?pid=ImgDet&rs=1'} alt="" />

              }
              {
                IsHoveres &&
                <div className='col-12 card-img-overlay text-light rounded-2' data-aos="fade-up"
                  data-aos-duration="1000" >
                  <h6 className="card-title text-light col-12" >{data.title || data.name}</h6>
                  <hr className='p-0 m-0' />
                  <span className="card-text mt-1 line-limit" style={{ fontSize: '12px' }}> Overview</span>
                  <p className="card-text mt-1 line-limit" style={{ fontSize: '12px' }}>{data.overview}</p>
                </div>
              }

            </div>
          )}
        </>
      }
    </div>
  )
}

export default CardSecType
