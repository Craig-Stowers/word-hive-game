import { useEffect, useRef, useState } from "react";
import classes from "./HoneycombBackground.module.css";
import Hex from "../assets/hex-panel.svg?react";
import Cover from "./Cover";

const rows = 17;
const columns = 6;
const ratio = 646 / 559;

const containerWidth = 1000;
const containerHeight = containerWidth / ratio;

const horSpacing = containerWidth / (columns + 1.75);
const vertSpacing = horSpacing / ratio;
const gap = horSpacing * 0.05;

const HoneycombBackground = () => {
   const timersRef = useRef([]);
   const [animations, setAnimations] = useState(() => {
      let arr = [];
      for (let i = 0; i < rows; i++) {
         if (!arr[i]) arr[i] = [];
         for (let j = 0; j < columns; j++) {
            arr[i][j] = "out";
         }
      }
      return arr;
   });

   const cleanup = () => {
      const timers = timersRef.current;
      for (let i = 0; i < rows; i++) {
         for (let j = 0; j < columns; j++) {
            if (timers[i] && timers[i][j]) {
               clearTimeout(timers[i][j]);
            }
         }
      }
   };

   useEffect(() => {
      const startTimer = (row, column) => {
         const timers = timersRef.current;
         if (!timers[row]) timers[row] = [];

         const delay = Math.random() * 900 + 50;

         timers[row][column] = setTimeout(() => {
            setAnimations((oldValue) => {
               const newValue = [...oldValue];
               newValue[row] = [...oldValue[row]];
               newValue[row][column] = "in";
               return newValue;
            });
         }, delay);
      };

      console.log("add timers");

      for (let i = 0; i < rows; i++) {
         for (let j = 0; j < columns; j++) {
            startTimer(i, j);
         }
      }
      return () => cleanup();
   }, []);

   const renderHex = (left, top, show) => {
      return (
         <div
            style={{
               width: horSpacing - gap + "px",
               height: vertSpacing - gap + "px",
               position: "absolute",
               left,
               top,
               transition: "opacity 1s",
               opacity: show ? 1 : 0,
               pointerEvents: "none",
               overflow: "hidden",
            }}
         >
            <Hex />
         </div>
      );
   };

   const loopHex = () => {
      const elements = [];
      for (let i = 0; i < rows; i++) {
         for (let j = 0; j < columns; j++) {
            const isOffset = i % 2 === 0;
            const left = gap * 0.5 + (isOffset ? j - 0.5 : j) * (horSpacing + horSpacing * 0.5) + "px";
            const top = (i - 1.25) * 0.5 * vertSpacing + "px";
            const showComb = animations[i][j] === "in";
            elements.push(renderHex(left, top, showComb));
         }
      }
      return elements;
   };

   const containerStyle = {
      width: containerWidth + "px",
      height: containerHeight + "px",
      position: "relative",
      border: "1px solid red",
      overflow: "hidden",
   };

   return (
      <div className={classes.root}>
         <Cover width={containerWidth} height={containerHeight} minScale={0.8}>
            <div style={containerStyle}>{loopHex()}</div>
         </Cover>
      </div>
   );
};
export default HoneycombBackground;
