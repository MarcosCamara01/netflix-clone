import axios from './axios';
import React, { useEffect, useState } from 'react';
import "../styles/Banner.css";
import requests from './Requests';
import { useMediaQuery } from 'react-responsive';
import { BsPlayFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

export const Banner = () => {

    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 600 });

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                const randomMovieIndex = Math.floor(Math.random() * request.data.results.length);
                const movie = request.data.results[randomMovieIndex];
                setMovie(movie);
                return request;
            } catch (error) {
                console.error(error);
                const fallbackRequest = await axios.get(requests.fetchTrending);
                const randomFallbackIndex = Math.floor(Math.random() * fallbackRequest.data.results.length);
                const fallbackMovie = fallbackRequest.data.results[randomFallbackIndex];
                setMovie(fallbackMovie);
            }
        }

        fetchData();
    }, [error]);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

    return (
        <header
            className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://image.tmdb.org/t/p/${isMobile ? "w500" : "original"}/${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}

        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {truncate(movie?.title || movie?.name || movie?.original_name, isMobile ? 15 : 30)}
                </h1>
                <p className='banner__description'>
                    {truncate(movie?.overview,300)}
                </p>
                <div className="banner__buttons">
                    <button className='banner__button'><div className='button-box'><BsPlayFill />Play</div></button>
                    <button className='banner__button'><div className='button-box'><IoMdAdd />My List</div></button>
                </div>
            </div>
            <div className='banner__effect' />
        </header>
    );
};
