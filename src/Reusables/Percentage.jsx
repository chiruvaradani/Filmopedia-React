import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularPercentage = (props) => {
    const percentage = Math.floor(props.data*10)

    // console.log(percentage);
  return (
    <div style={{ width: '40px' }} className='m-0 p-0'>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={10}
        styles={buildStyles({
          textSize: '25px',
          
          textColor: '#ffffff',
          pathColor: `#00ffcd`,
          trailColor: '#004985',
        })}
      />
    </div>
  );
};

export default CircularPercentage;
