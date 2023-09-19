import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Imageurl } from "../API_Files/AuthKeys";
import "./CardsWithAnimation.css";
import CircularPercentage from "./Percentage";

const ActorCard = (props) => {
  const [IsHoveres, setIsHoveres] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [RespData, setRespData] = useState([]);
  const navigate = useNavigate();
  // console.log(props);


  useEffect(()=>{
    window.scroll(0,0)
  })

  useEffect(() => {
    if (props.data) {
      setTimeout(() => {
        setRespData([props.data]);
        setLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <div className="mb-4">
      {Loading && (
        <>
          <Skeleton className="mx-2" height={300} width={200} />
        </>
      )}
      {Loading === false &&
        RespData.map((data, i) => (
          <div className="col-12">
            <div
              className="row"
              style={{ display: "flex", flex: 1, flexDirection: "row" }}
            >
              <div
                key={i}

                className="card CardMain mx-3 p-0"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
              >
                <div className="imgbox Card-img text-center">
                 {
                  data.poster_path?
                  <img id="cardImage"
                    className="p-0 m-0"
                    src={Imageurl + data.poster_path}
                    alt=""
                  />:
                  <img id="cardImage" style={{objectFit:'contain',width:'130px',display:'flex', flex:1, placeItems:'center'}}
                    className="mx-3"
                    src={"https://th.bing.com/th/id/OIP._5F3Fg7SM_JcA6jbw6EU4QAAAA?pid=ImgDet&rs=1"}
                    alt=""
                  />
                 }
                </div>
                <div className="content Card-img-overlay text-dark">
                  <h6 className="fs-4 fw-bolder line-limit1">{data.title || data.name}</h6>
                  <p style={{ fontSize: "10px" }} className="p-0 m-0">{data.release_date}( <span className="text-danger fw-bold">
                    {data.popularity}
                    <i className="fa-solid fa-fire text-danger"></i>
                  </span> )</p>
                  <span > Overview </span>
                  <hr className="p-0 m-0" />
                  <p className="line-limit p-0 m-0" style={{ fontSize: "8px" }}>{data.overview}</p>
                  
                  <div className="col-8 ms-2 mt-2">
                    <div
                      className="row"
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <div className="col-1 p-0 m-0">
                        <CircularPercentage data={data.vote_average} />
                      </div>

                      <div className="col-1 ms-4 me-3">
                        <button
                          data-bs-trigger="hover"
                          data-bs-content="Add to list"
                          className="btn"
                          style={{
                            backgroundColor: "#00ffcd",
                            borderRadius: "50%",
                          }}
                        >
                          <i
                            data-bs-toggle="popover"
                            className="fa-solid fa-list "
                          ></i>
                        </button>
                      </div>
                      <div className="col-1 mx-3">
                        <button
                          data-bs-trigger="hover"
                          data-bs-content="Add to list"
                          className="btn"
                          style={{
                            backgroundColor: "#00ffcd",
                            borderRadius: "50%",
                          }}
                        >
                          <i className="fa-solid fa-heart "></i>
                        </button>
                      </div>
                      <div className="col-1 mx-3">
                        <button
                          data-bs-trigger="hover"
                          data-bs-content="Add to list"
                          className="btn"
                          style={{
                            backgroundColor: "#00ffcd",
                            borderRadius: "50%",
                          }}
                        >
                          <i className="fa-solid fa-bookmark "></i>
                        </button>
                      </div>
                      <p className="mt-3" style={{ cursor: "pointer" }} onClick={() => navigate(`/${props.type}/${data.id}`)}>View {"Details  >"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ActorCard;
