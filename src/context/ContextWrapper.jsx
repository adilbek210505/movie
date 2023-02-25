import React, {useState} from 'react';
import {LanguageContext} from "./index";

const ContextWrapper = ({children}) => {
    const [lan, setLan] = useState("en-US" )
    return (
        <LanguageContext.Provider value={{lan,setLan}}>
            {children}
        </LanguageContext.Provider>

    );
};

export default ContextWrapper;