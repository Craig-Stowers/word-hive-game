import { useMemo } from "react";
// import Honey from "../../../assets/honey-empty.svg?react";
import filledJar from "../../../assets/jar-filled.png";
import emptyJar from "../../../assets/jar-empty.png";
import Grid from "../../../assets/comb-grid.svg?react";
import classes from "./HoneyWrapper.module.css";

const HoneyWrapper = ({ answer }) => {
   // const revealClasses = [classes.show1, classes.show2, classes.show3, classes.show4, classes.show5, classes.show6, classes.show7, classes.show8, classes.show9, classes.show10, classes.show11, classes.show12]

   const revealClasses = useMemo(() => {
      if (!answer) return [];

      const wordLetters = answer.word.split("");
      const letterArr = answer.letterOrder.split("");
      const revealClasses = [];
      for (let i = 0; i < letterArr.length; i++) {
         //  console.log("compare", wordLetters, letterArr[i]);
         if (wordLetters.includes(letterArr[i].toLowerCase())) {
            const isBonus = letterArr[i].toLowerCase() === answer.bonusLetter.toLowerCase();
            revealClasses.push(classes[`${isBonus ? "bonus" : "show"}${i + 1}`]);
         }
      }
      return revealClasses;
   }, [answer]);

   return (
      <div className={classes.root}>
         <div className={classes.testclass} style={{ opacity: answer ? 1 : 1 }}>
            <img src={answer ? filledJar : emptyJar} />
            {/* <Honey /> */}
            <div className={`${classes.gridWrap} ${revealClasses.join(" ")}`}>
               <Grid />
            </div>
         </div>

         <div className={classes.wordContainer}>
            <div className={classes.word} style={{ visibility: answer ? "visible" : "hidden" }}>
               {answer ? answer.word.toLowerCase() : "empty"}
            </div>
         </div>
      </div>
   );
};
export default HoneyWrapper;
