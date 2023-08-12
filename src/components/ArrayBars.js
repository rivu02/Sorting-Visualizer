import React from 'react';
import './ArrayBars.css';

const ArrayBars = ({ array }) => {
  const calculateBarHeight = (value) => {
    return value + 'px';
  };

  return (
    <div className="array-bars-container">
      {array.map((value, index) => (
        <div
          key={index}
          className="array-bar"
          style={{ height: calculateBarHeight(value) }}
        ></div>
      ))}
    </div>
  );
};

export default ArrayBars;
