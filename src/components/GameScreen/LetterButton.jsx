import hexBack from "./../../assets/hex-back.svg";
import hexBorder from "./../../assets/hex-border.svg";
import hexShine from "./../../assets/hex-shine.svg";
import Hex from "./../../assets/hex-all.svg?react";
import classes from "./LetterButton.module.css";

const heightRatio = 559 / 646;
const LetterButton = ({ width = 200, onClick, children, className = "" }) => {
   const height = width * heightRatio;

   const svgStyle = {
      position: "absolute",
      width: width,
      height: height,
      top: 0,
      left: 0,
   };

   return (
      <div className={`${classes.root} ${className}`} style={{ position: "relative", width, height }}>
         <svg style={svgStyle} onClick={onClick}>
            <Hex />
            {/* <image href={hexAll} style={{ width, height }} />; */}
         </svg>
         <div
            style={{
               color: "black",
               position: "absolute",
               left: "50%",
               top: "50%",
               transform: "translate(-50%, -50%)",
               fontSize: "27px",
               pointerEvents: "none",
            }}
         >
            {children}
         </div>
      </div>
   );
};

export default LetterButton;
