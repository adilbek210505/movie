import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BrowserRouter} from "react-router-dom";
import ContextWrapper from "./context/ContextWrapper";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ContextWrapper>
                <App/>
            </ContextWrapper>
        </BrowserRouter>
    </React.StrictMode>
)
