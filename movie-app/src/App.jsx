import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import './App.css';

const API_KEY = '402b5eb4';
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('Avengers');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${BASE_URL}s=${query}&page=${currentPage}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError('No movies found.');
      }
    } catch (err) {
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`${BASE_URL}i=${imdbID}`);
      const data = await response.json();
      setMovieDetails(data);
      setModalIsOpen(true);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchMovies();
  };

  return (
    <div className="app">
      <Navbar />
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onMovieClick={fetchMovieDetails} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
      <MovieModal isOpen={modalIsOpen} movieDetails={movieDetails} onRequestClose={() => setModalIsOpen(false)} />
    </div>
  );
};

export default App;
