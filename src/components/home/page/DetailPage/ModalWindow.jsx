import React, {useState} from 'react';

const ModalWindow = ({detail}) => {
    const [modal, setModal] = useState(false)
    return (
        <>
            <div onClick={() => setModal(!modal)} className="detail-page--image">
                <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${detail.poster_path}`} width={300} alt=""/>
            </div>

            <div onClick={() => setModal(false)} style={{display: modal ? "block" : "none"}} className="blur--modal"></div>

            <div style={{transform: modal ? "scale(1.1)" : "scale(0)"}} id="ModalWindow">
                <div className="modal">
                    <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${detail.poster_path}`} width={300} alt=""/>
                    <div className="modal--desc">
                        <div onClick={() => setModal(false)} className="modal--desc--close"><span>&times;</span></div>
                        <h3>{detail.title}</h3>
                        <h1>{detail.tagline}</h1>
                        <p>{detail.overview}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalWindow;