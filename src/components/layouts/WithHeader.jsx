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

    const alignScreenTop = props.layoutType === "stats";

    //  console.log("gameOrientation", gameOrientation);

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
                    className={"orientation-" + gameOrientation}
                >
                    <Header {...props} />

                    {alignScreenTop ? (
                        <div
                            style={{
                                flexGrow: 1,
                                width: "100%",
                                height: "100%",
                                top: "0px",
                                position: "absolute",
                            }}
                        >
                            {children}
                        </div>
                    ) : (
                        <div style={{ flexGrow: 1 }}>{children}</div>
                    )}
                </div>
            </BestFit>
        </>
    );
};

export default WithHeader;
