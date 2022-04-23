import React, {createContext, useState} from "react";

export const StateContext = createContext()

const StateContextProvider = (props) => {
    const [reloading, setReloading] = useState(false)
    return (
        <React.Fragment>
            <StateContext.Provider value={{reloading, setReloading}}> 
                {props.children}
            </StateContext.Provider>
        </React.Fragment>
    )
}

export default StateContextProvider;