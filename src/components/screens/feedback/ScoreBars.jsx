import classes from "./ScoreBars.module.css";
import React, { useState, useRef, useEffect } from "react";
import ScoreBarsHexLabel from "./ScoreBarsHexLabel";

const ScoreBars = ({ highlight, stats }) => {
   const barRefs = useRef([]);
   const digitRefs = useRef([]);
   const [animate, setAnimate] = useState(false);
   const [barDigitClass, setBarDigitClass] = useState([]);
   const [revealDigit, setRevealDigit] = useState([]);
   const revealTimers = useRef([]);

   useEffect(() => {
      return () => {
         revealTimers.current.forEach((timer) => {
            if (timer) clearTimeout(timer);
         });
      };
   }, []);
   

   useEffect(() => {
      const startTimer = setTimeout(() => {
         setAnimate(true);
      }, 500);
      return () => clearTimeout(startTimer);
   });
   const startRevealTimer = (index) => {
      if (!barRefs.current[index]) return;
      if (barDigitClass[index]) return;

      const width = barRefs.current[index].offsetWidth;
      const digitWidth = digitRefs.current[index].offsetWidth;

      setBarDigitClass((oldValue) => {
         const newValue = [...oldValue];
         newValue[index] = width - 15 > digitWidth ? "inside" : "outside";
         return newValue;
      });

      if (revealTimers[index]) clearTimeout(revealTimers[index]);
      revealTimers[index] = setTimeout(() => {
         setRevealDigit((oldValue) => {
            const newValue = [...oldValue];
            newValue[index] = true;
            return newValue;
         });
      }, 200);
   };

   const maxValue = Math.max(...stats.map((item) => item.value));

   const renderBar = (label, value, index) => {
      const percOfMax = animate ? (value / maxValue) * 100 : 0;
      const animationTime = percOfMax / 100;

      const digitClass = animate
         ? barDigitClass[index] === "inside"
            ? classes.rectangleValueInside
            : barDigitClass[index] === "outside" || value === 0
            ? classes.rectangleValueOutside
            : null
         : null;

      if (value === 0) {
         startRevealTimer(index);
      }

      const renderedPerc = Math.max(percOfMax, 0.8); //ensures a minimum width
      const isHighlighted = highlight === index;

      return (
         <div className={classes.barItem} key={"bar-item-" + index}>
            <div className={classes.barLabelContainer}>
               <ScoreBarsHexLabel label={label} />
            </div>
            <div className={classes.barRectContainer}>
               <div
                  ref={(ref) => (barRefs.current[index] = ref)}
                  className={`${classes.rectangle} ${isHighlighted ? classes.highlight : null}`}
                  style={{ width: renderedPerc + "%", transition: `width ${animationTime}s` }}
                  onTransitionEnd={(e) => {
                     if (e.propertyName !== "width") return;
                     if (value > 0) startRevealTimer(index);
                  }}
               >
                  <div
                     ref={(ref) => (digitRefs.current[index] = ref)}
                     className={`${classes.digit} ${digitClass} ${revealDigit[index] ? classes.opacity1 : null}`}
                  >
                     {value !== 0 && value}
                  </div>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className={classes.root}>
         {stats.map(({ label, value }, index) => {
            return renderBar(label, value, index);
         })}
      </div>
   );
};

export default ScoreBars;
