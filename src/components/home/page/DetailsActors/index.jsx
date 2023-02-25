import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../../lib/Export";
import {NavLink, useParams} from "react-router-dom";
import Slider from "react-slick";
import {LanguageContext} from "../../../../context";



const DetailsActors = () => {

    const {lan} = useContext(LanguageContext)

    const [actor, setActor] = useState({})

    const [movieCredits, setMovieCredits] = useState([])

    const [viewMore, setViewMore] = useState(400)

    const {peopleId} = useParams()

    const toggleViewMore = (text) => {
        setViewMore(viewMore === 400 ? text.length : 400)
    }

    const {biography, birthday, name, profile_path, place_of_birth } = actor

    const getDetailActor = async (id, ApiKey) => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/person/${id}?api_key=${ApiKey}&language=${lan}`)
            const {data} = await url
            await setActor(data)
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    const getMovieCredits = async (id, ApiKey) => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${ApiKey}&language=${lan}`)
            const {data} = await  url
            await setMovieCredits(data.cast)
        } catch (e) {
            console.log("Erroe: " , e)
        }
    }

    useEffect(() => {
        getDetailActor(peopleId, APIKEY)
        getMovieCredits(peopleId,APIKEY)
    }, [lan])

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
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
        <div id="Actors">
            <div className="container">
                <div className="actors">
                    <div className="actors--block">
                        <div>
                            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${profile_path}`} alt=""/>
                        </div>
                        <div className="actors--block--des">
                            <h1>{name}</h1>
                            <h3>{place_of_birth}</h3>
                            <h3>{birthday}</h3>
                            <p><h3>Биография:</h3> {birthday ? biography.slice(0, viewMore) : biography}</p>
                            {biography ? biography.length ? <span onClick={() => toggleViewMore(biography)} style={{
                                color: "blue",
                                cursor: "grab"
                            }}>{viewMore === 400 ? "читать..." : "Закрыть!"}</span> : "" : ""}
                        </div>
                    </div>
                </div>

                <Slider {...settings}>
                    {
                        movieCredits.map(el => (
                            <div>
                                <NavLink to={`/movies/movie-info/${el.id}`}><img src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${el.poster_path}`} alt=""/></NavLink>
                                <h3 style={{color:"white"}}>{el.title}</h3>
                            </div>
                        ))
                    }
                </Slider>

            </div>
        </div>
    );
};

export default DetailsActors;
//