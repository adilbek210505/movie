import './App.scss';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {Route, Routes} from "react-router-dom";
import Main from "./components/home/Main";
import Popular from "./components/home/Popular";
import Upcoming from "./components/home/Upcoming";
import DetailPage from "./components/home/page/DetailPage/DetailPage";
import DetailsActors from "./components/home/page/DetailsActors";
import {useState} from "react";
import SearchResult from "./components/SearchResult";


function App() {

    const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode")) || false)

    const changeTheme = (mode) => {
        setMode(!mode)
        localStorage.setItem("mode", JSON.stringify(!mode))
    }


    return (
        <div className="App" style={{
            color: mode ? "white" : "",
            background: mode ? "black" : ""

        }}>
            <Header changeTheme={changeTheme} mode={mode}/>
            <Routes>
                <Route path={"/home"} element={<Main/>}/>
                <Route path={"/Popular"} element={<Popular/>}/>
                <Route path={"/Upcoming"} element={<Upcoming/>}/>
                <Route path={"/movies/movie-info/:movieId"} element={<DetailPage/>}/>
                <Route path={"/detail/profil/:peopleId"} element={<DetailsActors/>}/>
                <Route path={"/movies/search-result/:movieName"} element={<SearchResult/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
