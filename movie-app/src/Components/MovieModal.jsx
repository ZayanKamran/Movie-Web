import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MovieModal = ({ isOpen, movieDetails, onRequestClose }) => {
  if (!movieDetails) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>{movieDetails.Title}</h2>
      <img
        src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/200'}
        alt={movieDetails.Title}
      />
      <p>{movieDetails.Plot}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default MovieModal;
