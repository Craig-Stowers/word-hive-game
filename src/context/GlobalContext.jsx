// GlobalContext.js
import React, { createContext, useState } from "react";

// Create a context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
    // Define shared state variables
    const [gameWidth, setGameWidth] = useState(0);
    const [gameOrientation, setGameOrientation] = useState("landscape");
    const [gameScreen, setGameScreen] = useState("home");

    return (
        <GlobalContext.Provider
            value={{
                gameScreen,
                setGameScreen,
                gameWidth,
                setGameWidth,
                gameOrientation,
                setGameOrientation,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
