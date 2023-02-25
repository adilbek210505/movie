import React, {useContext, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../img/Rectangle.svg"
import {BsSearch} from "react-icons/bs";
import {LanguageContext} from "../../context";

const Header = ({changeTheme, mode}) => {

    const navigate = useNavigate()

    const {setLan} = useContext(LanguageContext)

    const inputRef = useRef(null)

    const getSelectValue = (e) => setLan(e.target.value)

    const [value, setValue] = useState("")

    const getValue = (e) => {
       switch (e.key) {
           case "Enter" : handleClick(value)
               break;
           case "Delete" : inputRef.current.value = ""
       }
    }
    const handleClick = (name) => {
        if (value !== "") {
            navigate(`/movies/search-result/${name}`)
            inputRef.current.value = ""
        }
    }

    return (
        <div id="Header">
            <div className="container">
                <div className="header">
                    <NavLink to={"/home"}>
                        <img src={logo} alt=""/>
                    </NavLink>
                    <div style={{display: "flex"}}>
                        <input ref={inputRef} className="header--input" onKeyDown={e => getValue(e)}
                               onChange={(e) => setValue(e.target.value)} type="text" placeholder="search"/>
                        <button className="header--btn" onClick={() => handleClick(value)}><BsSearch/></button>
                    </div>
                    <div className="header--link">
                        <NavLink className="header--link--a" to={"/home"}>topMovie</NavLink>
                        <NavLink className="header--link--a" to={"/Popular"}>Popular</NavLink>
                        <NavLink className="header--link--a" to={"/Upcoming"}>Upcoming</NavLink>
                        <button onClick={() => changeTheme(mode)} className="header--link--button">{mode ? "write" : "black"}</button>

                        <select name="" id="" onChange={getSelectValue} className="sel">
                            <option value="en-US">En</option>
                            <option value="ru-RU">ru</option>
                            <option value="tr-TR">Tr</option>
                            <option value="fr-FR">Fr</option>
                            <option value="kz-KZ">kz</option>
                            <option value="">or</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;