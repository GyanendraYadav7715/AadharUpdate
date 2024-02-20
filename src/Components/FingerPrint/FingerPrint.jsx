import React from 'react';
import './Box.css';
import finger from "../../../public/finger.jpg"

const Box = () => {
  return (
    <div className="box">
      <img className='box-img' src={finger} alt="Box" />
      <button  className='Box-button'>click</button>
    </div>
  );
};

export default Box;