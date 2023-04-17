import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from "react";

const Reviews = () => {
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    axios
      .get(
        `https://cinepreviewbackend-production.up.railway.app/api/v1/movies/${movieId}`
      )
      .then((res) => setMovie(res.data))
      .then(() => setReviews(movie.reviews));
  }, [movieId]);
  console.log("reviews", reviews);
  console.log("movie", movie);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await axios.post(
        "https://cinepreviewbackend-production.up.railway.app/api/v1/reviews",
        {
          reviewBody: rev.value,
          imdbId: movieId,
        }
      );

      const updatedReviews = [...reviews, { body: rev.value }];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r) => {
            return (
              <>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
