import { useState, useContext } from "react";
import classes from "./Header.module.css";
import CloseIcon from "../../assets/icons/icon-close.svg?react";
import InfoIcon from "../../assets/icons/icon-info.svg?react";
import HomeIcon from "../../assets/icons/icon-home.svg?react";
import logo from "../../assets/title-small.png";
import CustomButton from "../../shared/CustomButton";
import AspectRatioBox from "../layouts/AspectRatioBox";
import { GlobalContext } from "../../context/GlobalContext";
import buttonClasses from "../layouts/Buttons.module.css";
import { render } from "react-dom";

const Header = ({ screen, ...props }) => {
    const [showCheat, setShowCheat] = useState(false);

    const { gameWidth, gameOrientation } = useContext(GlobalContext);
    const inputNext = () => {
        if (screen.current === "game") {
            screen.ref.current.inputNext();
        }
    };

    const answerNext = () => {
        if (screen.current === "game") {
            screen.ref.current.answerNext();
        }
    };

    const answerAll = () => {
        if (screen.current === "game") {
            screen.ref.current.answerAll();
        }
    };

    const buttonStyle = {
        height: "46px",
        width: "46px",
        marginLeft: "auto",
        marginRight: "auto",
    };

    const yellowBackground = props.layoutType == "main";
    console.log("props", props.layoutType);

    const showInfo = props.layoutType == "main";
    const showHome = props.layoutType == "main";
    const showLogo = props.layoutType == "main";

    const renderMap = {
        main: () => {
            return (
                <div
                    className={`${classes.root} ${classes.yellowBackground}`}
                    style={{}}
                >
                    <div className={classes.left}>
                        {showLogo && (
                            <img
                                src={logo}
                                onClick={() => setShowCheat(!showCheat)}
                            />
                        )}
                    </div>

                    <div className={classes.right}>
                        <CustomButton
                            style={{
                                ...buttonStyle,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                            render={() => {
                                return <HomeIcon />;
                            }}
                            onClick={() => screen.change("home")}
                        />

                        <CustomButton
                            style={buttonStyle}
                            render={() => {
                                return <InfoIcon />;
                            }}
                            onClick={() => screen.change("info")}
                        />

                        <CustomButton
                            style={{ ...buttonStyle, marginRight: "10px" }}
                            render={() => {
                                return <CloseIcon />;
                            }}
                            onClick={() => screen.actions.close()}
                        />
                    </div>
                </div>
            );
        },
        stats: () => {
            return (
                <div className={`${classes.root}`} style={{}}>
                    <div className={classes.left}></div>
                    <div className={classes.right}>
                        <CustomButton
                            className={`${buttonClasses.close}`}
                            style={{ ...buttonStyle, marginRight: "10px" }}
                            render={() => {
                                return <CloseIcon />;
                            }}
                            onClick={() => screen.actions.close()}
                        />
                    </div>
                </div>
            );
        },
    };

    return renderMap[props.layoutType] && renderMap[props.layoutType]();
};

export default Header;
