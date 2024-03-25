import { useState } from "react";
import classes from "./Header.module.css";
import CloseIcon from "../../assets/icons/icon-close.svg?react";
import InfoIcon from "../../assets/icons/icon-info.svg?react";
import HomeIcon from "../../assets/icons/icon-home.svg?react";
import logo from "../../assets/title-small.png";
import CustomButton from "../../shared/CustomButton";

const Header = ({ screen, ...props }) => {
   const [showCheat, setShowCheat] = useState(true);
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
      width: "48px",
      height: "48px",
      marginLeft: "6px",
   };

   return (
      <div className={classes.root}>
         <div className={classes.left}>
            <img src={logo} onClick={() => setShowCheat(!showCheat)} />
            {showCheat && (
               <div>
                  <button onClick={answerNext}>[answer next]</button>
                  <button onClick={answerAll}>answer all]</button>
               </div>
            )}
         </div>

         <div className={classes.right}>
            <CustomButton
               style={buttonStyle}
               render={() => {
                  return <HomeIcon />;
               }}
               onClick={() => screen.change("home")}
            />
            {screen.current !== "info" && (
               <CustomButton
                  style={buttonStyle}
                  render={() => {
                     return <InfoIcon />;
                  }}
                  onClick={() => screen.change("info")}
               />
            )}

            <CustomButton
               style={buttonStyle}
               render={() => {
                  return <CloseIcon />;
               }}
               onClick={() => screen.actions.close()}
            />
         </div>
      </div>
   );
};

export default Header;
