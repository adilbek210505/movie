import React, {useContext, useEffect, useState} from 'react';
import Slider from "react-slick";
import image from "../../img/images.png"
import {Link} from "react-router-dom";
import axios from "axios";
import {APIKEY} from "../../lib/Export";
import {LanguageContext} from "../../../context";

const Cast = ({movieId}) => {
    const  {lan} = useContext(LanguageContext)

    const [cast,setCast] = useState([])

    const getCast = async (id, apiKey) => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=${lan}`)
            const {data} = await url
            await setCast(data.cast)
        } catch (e) {
            console.log("Error: " , e)
        }
    }

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
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

    useEffect(() => {
        getCast(movieId,APIKEY)
    },[])

    return (
       <div id="Cast">
           <div className="container">
               <Slider {...settings}>
                   {
                       cast.map(el => (
                         <Link to={`/detail/profil/${el.id}`}>
                             <div className="cast-card">
                                 {
                                     el.profile_path ? <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${el.profile_path}`} alt=""/> : <img src={image} width={150}  height={180} alt="img"/>
                                 }
                                 <p>{el.name}</p>
                             </div>
                         </Link>
                       ))
                   }
               </Slider>

           </div>
       </div>
    );
};

export default Cast;