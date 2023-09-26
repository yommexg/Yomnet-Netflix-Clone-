import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";

const base_url = `https://image.tmdb.org/t/p/original`;
const APIKEY = "930fdbf6fa83313596901fb99b537605";

const baseVideoUrl = `https://api.themoviedb.org/3/movie/`;

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A set of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads and doesnt run again.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    const videoUrl = `${baseVideoUrl}/${movie.id}/videos?api_key=${APIKEY}`;
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      fetch(videoUrl)
        .then((response) => response.json())
        .then((data) => setTrailerUrl(data.results[0].key));
    }

    // console.log(videoUrl);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/** several row__poster(s) */}
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movies.id}
            className={`row__poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
