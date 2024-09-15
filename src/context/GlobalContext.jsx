// GlobalContext.js
import React, { createContext, useState } from "react";

// Create a context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
    // Define shared state variables
    const [gameWidth, setGameWidth] = useState(0);

    console.log("gameWidth", gameWidth);

    return (
        <GlobalContext.Provider
            value={{
                gameWidth,
                setGameWidth,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
