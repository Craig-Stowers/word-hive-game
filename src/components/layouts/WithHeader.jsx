import React, { useContext } from "react";
import Header from "../shared/Header";
import BestFit from "../BestFit";
import { GlobalContext } from "../../context/GlobalContext";
const WithHeader = ({ children, ...props }) => {
    const { gameWidth, gameOrientation, setGameOrientation } =
        useContext(GlobalContext);

    const onContainerResize = ({ width, height }) => {
        if (width > height) {
            setGameOrientation("landscape");
        }
        if (width < height) setGameOrientation("portrait");
    };

    console.log("gameOrientation", gameOrientation);

    return (
        <>
            <BestFit
                width={900}
                height={622}
                maxScale={1.4}
                onContainerResize={onContainerResize}
                active={gameOrientation === "landscape"}
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Header {...props} />
                    <div style={{ flexGrow: 1, overflow: "hidden" }}>
                        {children}
                    </div>
                </div>
            </BestFit>
        </>
    );
};

export default WithHeader;
