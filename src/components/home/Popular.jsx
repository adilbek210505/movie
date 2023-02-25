import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {APIKEY} from "../lib/Export";
import ExEl from "../Ex-el";
import {LanguageContext} from "../../context";

const Popular = () => {

    const {lan} = useContext(LanguageContext)

    const [total , setTotal] = useState(1)

    const [currenPage,setCurrenPage] = useState(1)

    const [popular, setPopular] = useState([])

    const getPopular = async () => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lan}&page=${currenPage}`)
            const {data} = await url
            setTotal(data.total_pages)
            await setPopular(data.results)
        } catch (e) {
            console.log("Error",e)
        }
    }
    useEffect(() => {
        getPopular()
    }, [lan, currenPage])
    return (
        <div id="popular">
            <div className="container">
                <div className="popular">
                    <div className="popular--btn">
                        <button style={{visibility: currenPage === 1 ? "hidden" : "visible"}} onClick={() => setCurrenPage(currenPage -1)}>prev</button>
                        <button style={{visibility: currenPage === total ? "hidden" : "visible"}} onClick={() => setCurrenPage(currenPage +1)}>next</button>
                    </div>
                    <div className="popular--block">
                        {
                            popular.map(el => (
                                <ExEl el={el}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popular;

