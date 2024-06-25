
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './CarouselImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './images/imagen1.png'; // Asegúrate de usar las rutas correctas
import image2 from './images/imagen2.jpg';
import image3 from './images/imagen3.jpg';

function IndividualIntervalsExample() {
  return (
    <Carousel>
      <Carousel.Item interval={5000}>
        <ExampleCarouselImage text="First slide" image={image1} />
        <Carousel.Caption>
          
          <p className='slidecolor'>YA DISPONIBLE</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <ExampleCarouselImage text="Second slide" image={image2} />
        <Carousel.Caption >
          <h3 className='slidecolor'>YA DISPONIBLE</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <ExampleCarouselImage text="Third slide" image={image3} />
        <Carousel.Caption>
          <h3 className='slidecolor'>PROXIMAMENTE</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;
