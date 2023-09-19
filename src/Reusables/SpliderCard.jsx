import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
// import './Demo.css';
import CardSecType from './CardsSecType';
import { Card } from 'antd';

const SpliderCard = (props) => {

    // console.log(props?.data);

    return (
        <div className="col-12">
            <div className="slider-container">
                <Splide
                    options={{
                        type: 'slide',
          perPage: 3,
          perMove: 1,
          drag: 'drag', // Set drag option to 'drag'
          pagination: false,
          rewind: true,
          focus: 'center', // Set focus option to 'center'
          dragThreshold: 5, // Adjust the drag threshold value as needed
          slideOnClick: false, // Disable slide change on click

                        breakpoints: {
                            480: {

                                perPage: 2,
                            },
                            768: {
                                perPage: 4,
                            },
                            1024: {
                                perPage: 5,
                            },
                            1280: {
                                perPage: 6,
                            },
                        },
                    }}
                >
                    {
                        props?.data?.map((res, key) => (
                            <SplideSlide key={key}>
                                <div className="slide-item">
                                    <div data-aos="fade-left" data-aos-duration="1500" className="slide-item-mobile">
                                        <CardSecType category="movies" type="Popular" data={res} />
                                    </div>
                                    {/* <div className="slide-item-desktop">
                                    <Card category="movies" type="Popular" data={res} />
                                </div> */}
                                </div>
                            </SplideSlide>
                        ))
                    }
                </Splide>
            </div>
        </div>
    );
};

export default SpliderCard;
