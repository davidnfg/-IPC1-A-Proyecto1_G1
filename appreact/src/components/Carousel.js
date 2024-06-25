import React from 'react'
import banner_image from "./images/banner_img.jpg"
import dolar_icon from "./images/dolar.png"
import info_icon from "./images/info.png"
import { Button } from 'react-bootstrap'

const Carousel = () => {
  return (
    <div className='hero'>
      <img src={banner_image} alt='' className='banner-img'/>
      <div className='hero-caption'>
        <p>
        Gracias a un descubrimiento, un grupo de científicos 
        y exploradores, encabezados por Cooper, se embarcan 
        en un viaje espacial para encontrar un lugar con las 
        condiciones necesarias para reemplazar a la Tierra y 
        comenzar una nueva vida allí.
        </p>
        <div className='hero-btns'>
          <Button className='btn'><img src={dolar_icon} alt=''/>Alquilar</Button>
          <Button className='btn dark-btn'><img src={info_icon} alt=''/>Información</Button>
        </div>
      </div>
    </div>
  )
}

export default Carousel

