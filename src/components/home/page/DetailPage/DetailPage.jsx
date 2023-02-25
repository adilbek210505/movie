import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {APIKEY} from "../../../lib/Export";
import Cast from "../Cast";
import {LanguageContext} from "../../../../context";
import MovieVideos from "../MovieVideos";
import ModalWindow   from "./ModalWindow";

const DetailPage = () => {
    const [detail, setDetail] = useState({})
    const {movieId} = useParams()
    const {lan} = useContext(LanguageContext)
    const getDetail = async (id) => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=${lan}`)
            const {data} = await url
            await setDetail(data)
        } catch (e) {
            console.log("Error...", e)
        }
    }
    const {release_date, title, backdrop_path, overview, runtime, vote_average} = detail

    useEffect(() => {
        getDetail(movieId)
    }, [lan])


    return (
        <>
            <div id="Detail-page" style={{
                background: `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}") no-repeat left/cover`
            }}>
                <div className="container">
                    <div className="detail-page">
                        <ModalWindow detail={detail}/>
                        <div className="detail-page--text">
                            <h1>{title} ({release_date ? release_date.slice(0, 4) : ""})</h1>
                            <p>{overview}</p>
                            <div className="vote">
                                <h1>{Math.round(vote_average * 10)}%</h1>
                            </div>
                            <h4>{Math.floor(runtime / 60)}h {runtime % 60} min</h4>
                        </div>
                    </div>
                </div>
            </div>
            <Cast movieId={movieId}/>
            <MovieVideos movieId={movieId}/>
        </>
    );

};

export default DetailPage;
// detail => https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US