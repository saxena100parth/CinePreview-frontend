import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
// import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notFound/NotFound";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  // const [singleMovie, setSingleMovie] = useState();

  // const getMovieData = (movieId) => {
  //   axios
  //     .get(
  //       `https://cinepreviewbackend-production.up.railway.app/api/v1/movies/${movieId}`
  //     )
  //     .then((res) => setMovie(res.data));
  //   // setMovie(singleMovie);
  //   setReviews(movie.reviews);
  // };

  useEffect(() => {
    // getMovies();
    axios
      .get("https://cinepreviewbackend-production.up.railway.app/api/v1/movies")
      .then((res) => setMovies(res.data));
  }, [setMovies]);
  console.log("data", movies);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies} />}></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
            <Route path="/Reviews/:movieId" element={<Reviews />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
