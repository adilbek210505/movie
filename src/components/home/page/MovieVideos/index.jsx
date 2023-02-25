import React, {useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../../lib/Export";
import Slider from "react-slick";


const MovieVideos = ({movieId}) => {

    const [videos, setVideos] = useState([])


    const getVideos = async (id, apiKey) => {
        const url = await axios(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`)
        const {data} = await url
        await setVideos(data.results)
    }


    useEffect(() => {
        getVideos(movieId, APIKEY)
    }, [])
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div id="Video">
            <div className="container">
                <div className="video">
                    <Slider {...settings}>
                        {
                            videos.map(el => (
                                <div className="videos">
                                    <iframe width="320" height="215" src={`https://www.youtube.com/embed/${el.key}`}
                                            title="Beckz, Ulukmanapo - О тебе (Lyric Video)" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen></iframe>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default MovieVideos;
//