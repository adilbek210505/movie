import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../lib/Export";
import {NavLink, useParams} from "react-router-dom";
import ExEl from "../Ex-el";
import server from "../img/server-404.jpg"
import {LanguageContext} from "../../context";


const SearchResult = () => {

    const [result, setResult] = useState([])

    const [stotal, setTotel] = useState(1)

    const [creaetPage, setCreatePage] = useState(1)

    const {lan} = useContext(LanguageContext)

    const {movieName} = useParams()

    const getResults = async (ApiKey, name) => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${name}&page=${creaetPage}&language=${lan}`)
            const {data} = await url
            await setResult(data.results)
            setTotel(data.total_pages)
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    useEffect(() => {
        getResults(APIKEY, movieName)
    }, [movieName, creaetPage, lan])


    return (
        <div id="Movie">
            <div className="container">
                {
                    result.length ?
                        <div className="movie">
                            {
                                result.map(el => (
                                    <div>
                                        <ExEl el={el}/>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div>
                            <NavLink to={"/home"}>
                                <img src={server} className="image" alt="" style={{width: "100%", height: "100%"}}/>
                            </NavLink>
                        </div>
                }
                <div className="movie--btn">
                    <button style={{visibility: creaetPage === 1 ? "hidden" : "visible"}}
                            onClick={() => setCreatePage(creaetPage - 1)}>prev
                    </button>
                    <button style={{visibility: creaetPage === stotal ? "hidden" : "visible"}}
                            onClick={() => setCreatePage(creaetPage
                                + 1)}>next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;