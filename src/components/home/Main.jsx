import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../lib/Export";
import ExEl from "../Ex-el";
import {LanguageContext} from "../../context";

const Main = () => {

    const [top,setTop] = useState([])

    const {lan} = useContext(LanguageContext)

    const getTop = async () => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=${lan}&page=1`)
            const {data} = await url
            await setTop(data.results)
        } catch (e) {
            return e
        }
    }
    useEffect(() => {
        getTop()
    },[lan])

    console.log(top)

    return (
        <div id="Main">
            <div className="container">
                <div className="main">
                    {
                        top.map(el => (
                          <ExEl el={el}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;