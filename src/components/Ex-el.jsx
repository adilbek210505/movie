import React from 'react';
import {AiOutlineStar} from "react-icons/ai";
import {Link} from "react-router-dom";

const ExEl = ({el}) => {

    return (
        <div className="card">
            <Link to={`/movies/movie-info/${el.id}`}>
                <img className="image" src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${el.poster_path}`} alt=""/>
            </Link>
            <h3>{el.title}</h3>
            <h4>{el.vote_average}</h4>
            <div className="popular--block--star">
                <AiOutlineStar/>
                <AiOutlineStar/>
                <AiOutlineStar/>
                <AiOutlineStar/>
                <AiOutlineStar/>
            </div>
        </div>
    )
};

export default ExEl;