import React, {useState} from 'react'
import Swal from 'sweetalert2';
import CommentsModal from './CommentsModal';
import "./styles/FlipCard.css"



const FlipCard = ({ image, title, description, btn1, btn2 }) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => setShowComments(true);
  const handleCloseComments = () => setShowComments(false);

  const handleRent = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pelicula alquilada, puedes revisar en Alquileres',
      showConfirmButton: false,
      timer: 3000
    });
  };

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={image} alt={title} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="flip-card-back">
          <h3>{title}</h3>
          <p>{description}</p>
          <button className="btn btn-outline-light action-button" onClick={handleRent}>{btn1}</button>
          <button className="btn btn-outline-light action-button" onClick={handleShowComments}>{btn2}</button>
        </div>
      </div>
      <CommentsModal show={showComments} handleClose={handleCloseComments} title={title} />
    </div>
  );
};

export default FlipCard;