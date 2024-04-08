import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from "react";

import Hex from "../../../assets/hex-all.svg?react";
import classes from "./LetterButton.module.css";

const heightRatio = 559 / 646;
const LetterButton = forwardRef(({ width = 200, onClick, children, className = "" }, parentRef) => {
   const [animation, setAnimation] = useState("resting");
   const animationTimer = useRef(null);
   const height = width * heightRatio;

   const svgStyle = {
      position: "absolute",
      width: width,
      height: height,
      top: 0,
      left: 0,
   };

   useEffect(() => {
      return () => {
         clearTimeout(animationTimer.current);
      };
   }, []);

   useImperativeHandle(parentRef, () => ({
      // Expose the internal DOM ref

      // You can also expose additional methods
      shake: () => {
         clearTimeout(animationTimer.current);
         if (animation === "grow-shrink") {
            setAnimation("resting");

            animationTimer.current = setTimeout(() => {
               setAnimation("grow-shrink");
               animationTimer.current = setTimeout(() => {
                  setAnimation("resting");
               }, 1000 * 0.2);
            }, 10);

            return;
         }

         setAnimation("grow-shrink");
         animationTimer.current = setTimeout(() => {
            setAnimation("resting");
         }, 200);
      },
   }));

   return (
      <div
         className={`${classes.root} ${className} ${classes[animation]}`}
         style={{ position: "relative", width, height }}
      >
         <svg
            style={svgStyle}
            onClick={onClick}
            onTouchEnd={(event) => {
               event.preventDefault();
               event.stopPropagation();
               onClick(event);
            }}
         >
            <Hex />
            {/* <image href={hexAll} style={{ width, height }} />; */}
         </svg>
         <div
            style={{
               position: "absolute",
               left: "50%",
               top: "50%",
               transform: "translate(-50%, -50%)",
               pointerEvents: "none",
            }}
         >
            {children}
         </div>
      </div>
   );
});

export default LetterButton;
