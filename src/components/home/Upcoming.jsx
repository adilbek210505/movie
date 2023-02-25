import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../lib/Export";
import ExEl from "../Ex-el";
import {LanguageContext} from "../../context";

const Upcoming = () => {

    const {lan} = useContext(LanguageContext)

    const [upcoming, setUpcoming] = useState([])

    const getUpcoming = async (apiKey) => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=${lan}&page=2`)
            const {data} = await url
            await setUpcoming(data.results)
        } catch (e) {
            console.log("Error..", e)
        }
    }
    useEffect(() => {
        getUpcoming(APIKEY)
    }, [lan])


    return (
        <div id="Upcoming">
            <div className="container">
                <div className="upcoming">
                    {
                        upcoming.map(el => (
                            <div className="upcoming--block">
                            <ExEl el={el}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Upcoming;
//