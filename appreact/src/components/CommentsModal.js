import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './styles/ComentsModal.css';

const CommentsModal = ({ show, handleClose, title }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '' && username.trim() !== '') {
      setComments([...comments, { text: newComment, user: username }]);
      setNewComment('');
      setUsername('');
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <Modal show={show} onHide={handleClose} contentClassName="comments-modal">
      <Modal.Header closeButton className="comments-modal-header">
        <Modal.Title>Comentarios de {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="comments-modal-body">
        <ul className="list-group list-group-flush">
          {comments.map((comment, index) => (
            <li key={index} className="list-group-item">
              <strong>{comment.user}:</strong> {comment.text}
              <button className="btn btn-danger btn-sm float-right" onClick={() => handleDeleteComment(index)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            className="form-control mt-2"
            rows="3"
            placeholder="Añadir un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button className="btn btn-primary mt-2" onClick={handleAddComment}>Añadir Comentario</button>
        </div>
      </Modal.Body>
      <Modal.Footer className="comments-modal-footer">
        <Button  className="btn btn-primary mt-2" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
