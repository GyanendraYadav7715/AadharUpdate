import React from 'react';
import './Box.css';

const Box = ({ Src, buttonText }) => {
  return (
    <div className="box">
      <img className='box-img' src={Src} alt="Box" />
      <button  className='Box-button'>{buttonText}</button>
    </div>
  );
};

export default Box;