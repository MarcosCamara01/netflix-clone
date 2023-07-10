import axios from './axios';
import React, { useEffect, useState } from 'react';
import "../styles/Row.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from 'react-responsive';

export const Row = ({ title, fetchUrl }) => {

    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/w200/";

    const isDesktop = useMediaQuery({ minWidth: 1300 });
    const isDesktopSmall = useMediaQuery({ minWidth: 1023, maxWidth: 1300 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isTabletMini = useMediaQuery({ minWidth: 600, maxWidth: 768 });
    const isMobile = useMediaQuery({ maxWidth: 600 });

    const settings = {
        dots: false,
        infinite: false,
        adaptiveWidth: false,
        spaceBetween: 50,
        speed: 300,
    };

    if (isDesktop) {
        settings.slidesToShow = 9;
        settings.slidesToScroll = 8;
    }

    if (isDesktopSmall) {
        settings.slidesToShow = 5;
        settings.slidesToScroll = 4;
    }

    if (isTablet) {
        settings.slidesToShow = 4;
        settings.slidesToScroll = 3;
        settings.draggable = false;
    }

    if (isTabletMini) {
        settings.slidesToShow = 3;
        settings.slidesToScroll = 2;
        settings.draggable = false;
    }

    if (isMobile) {
        settings.slidesToShow = 2;
        settings.slidesToScroll = 2;
        settings.draggable = false;
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies([...request.data.results, request.data.results[0]]);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    console.log(movies)

    return (
        <div className='row'>
            <h2>{title}</h2>
            <Slider {...settings}>
                {movies.map((movie, index) =>
                    movie.poster_path && (
                        <img
                            className="row__poster"
                            key={index}
                            src={`${base_url}${movie.poster_path}`}
                            alt={movie.name}
                        />
                    )
                )}
            </Slider>
        </div>
    );
}
