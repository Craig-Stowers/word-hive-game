import { useState } from "react";
import classes from "./Header.module.css";
import CloseIcon from "../../assets/icons/icon-close.svg?react";
import InfoIcon from "../../assets/icons/icon-info.svg?react";
import HomeIcon from "../../assets/icons/icon-home.svg?react";
import logo from "../../assets/title-small.png";
import CustomButton from "../../shared/CustomButton";
import AspectRatioBox from "../layouts/AspectRatioBox";

const Header = ({ screen, ...props }) => {
   const [showCheat, setShowCheat] = useState(false);

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
      width: "29%",
      height: "100%",
      marginLeft: "auto",
      marginRight: "auto",
   };

   return (
      <div className={classes.root}>
         <AspectRatioBox ratio={6.5} className={classes.dynamicBar}>
            <div className={classes.left}>
               <img src={logo} onClick={() => setShowCheat(!showCheat)} />
               {showCheat && (
                  <div>
                     <button onClick={inputNext}>[input next]</button>
                     {/* <button onClick={answerNext}>[answer next]</button>
                     <button onClick={answerAll}>[answer all]</button> */}
                  </div>
               )}
            </div>

            <div className={classes.right}>
               <AspectRatioBox
                  ratio={3.5}
                  height={"100%"}
                  className={classes.buttonRatioBox}
                  style={{ marginLeft: "auto", paddingRight: "2%", paddingLeft: "10px" }}
               >
                  <CustomButton
                     style={{ ...buttonStyle, marginLeft: "auto", marginRight: "auto" }}
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
                     style={{ ...buttonStyle, marginRight: "1.5%" }}
                     render={() => {
                        return <CloseIcon />;
                     }}
                     onClick={() => screen.actions.close()}
                  />
               </AspectRatioBox>
            </div>
         </AspectRatioBox>
      </div>
   );
};

export default Header;
