import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
import YouTube from "react-youtube";

const APIKEY = "930fdbf6fa83313596901fb99b537605";

const baseVideoUrl = `https://api.themoviedb.org/3/movie/`;

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handlePlayButton = (movie) => {
    const videoUrl = `${baseVideoUrl}/${movie.id}/videos?api_key=${APIKEY}`;
    document.addEventListener("keydown", function (e) {
      if ((e.key = " ")) {
        setTrailerUrl(" ");
      }
    });
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      fetch(videoUrl)
        .then((response) => response.json())
        .then((data) => setTrailerUrl(data.results[0].key));
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",

        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
      }}
    >
      <div className="banner__movie">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/*div > Two Buttons */}
        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => handlePlayButton(movie)}
          >
            PLay/Stop
          </button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie.overview, 150)}</h1>

        <div className="banner__fadeBottom"></div>
      </div>
    </header>
  );
}

export default Banner;
