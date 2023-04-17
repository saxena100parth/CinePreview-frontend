import Hero from "../hero/Hero";

const Home = ({ movies }) => {
  // console.log("movies from Home", movies);
  return <Hero movies={movies} />;
};

export default Home;
