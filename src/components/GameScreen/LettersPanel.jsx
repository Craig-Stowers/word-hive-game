import { useEffect, useRef } from "react";
import useEffectWithPrevious from "../../hooks/useEffectWithPrevious";
import LetterButton from "./LetterButton";
import classes from "./LetterButton.module.css";

const hexButtonWidth = 110;
const heightRatio = 559 / 646;
const hexButtonHeight = hexButtonWidth * heightRatio;
const hexButtonGap = 6;
const leftRightOffset = 0.74;

const LettersPanel = ({ letters, center, onLetterClick, bonusLetter, answer }) => {
   const letterRefs = useRef({});
   const row1Top = `calc(50% - ${hexButtonHeight + hexButtonGap}px)`;
   const row2Top = `calc(50% - ${hexButtonHeight * 0.5 + hexButtonGap * 0.5}px)`;
   const row3Top = `50%`;
   const row4Top = `calc(50% + ${hexButtonHeight * 0.5 + hexButtonGap * 0.5}px)`;
   const row5Top = `calc(50% + ${hexButtonHeight + hexButtonGap}px)`;
   const col1Left = `calc(50% - ${hexButtonWidth * leftRightOffset + hexButtonGap}px)`;
   const col2Left = `50%`;
   const col3Left = `calc(50% + ${hexButtonWidth * leftRightOffset + hexButtonGap}px)`;

   const basicStyle = {
      position: "absolute",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
   };
   const letterObjects = [
      { char: center, style: { ...basicStyle, top: row3Top, left: col2Left }, class: classes.middle },
      { char: letters[0], style: { ...basicStyle, top: row1Top, left: col2Left }, class: classes.default },
      { char: letters[1], style: { ...basicStyle, top: row2Top, left: col3Left }, class: classes.default },
      { char: letters[2], style: { ...basicStyle, top: row4Top, left: col3Left }, class: classes.default },
      { char: letters[3], style: { ...basicStyle, top: row5Top, left: col2Left }, class: classes.default },
      { char: letters[4], style: { ...basicStyle, top: row4Top, left: col1Left }, class: classes.default },
      { char: letters[5], style: { ...basicStyle, top: row2Top, left: col1Left }, class: classes.default },
   ];

   const extendedLetterObjects = letterObjects.map((el) => {
      const baseClass = el.char === bonusLetter ? classes.bonus : el.class;

      return { ...el, class: baseClass };
   });

   useEffectWithPrevious(
      (oldDep) => {
         if (answer.length > oldDep[0].length) {
            const newLetter = answer[answer.length - 1];
            if (letterRefs.current[newLetter]) {
               letterRefs.current[newLetter].shake();
            }
         }
      },
      [answer, center]
   );

   return (
      <div style={{ width: "340px", height: "340px", backgroundColor: "black", position: "relative" }}>
         {extendedLetterObjects.map((el, index) => {
            return (
               <div style={el.style}>
                  <LetterButton
                     width={hexButtonWidth}
                     onClick={() => onLetterClick(el.char)}
                     className={el.class}
                     ref={(ref) => (letterRefs.current[el.char] = ref)}
                  >
                     {el.char}
                  </LetterButton>
               </div>
            );
         })}
      </div>
   );
};

export default LettersPanel;
