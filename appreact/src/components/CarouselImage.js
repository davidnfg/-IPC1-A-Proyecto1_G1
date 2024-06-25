
import React from 'react';

const ExampleCarouselImage = ({ text, image }) => {
  return (
    <div>
      <img
        className="d-block w-100"
        src={image}
        alt={text}
      />
    </div>
  );
};

export default ExampleCarouselImage;
