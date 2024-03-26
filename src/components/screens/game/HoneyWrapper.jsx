import Honey from "../../../assets/honey.svg?react";
import Grid from "../../../assets/comb-grid.svg?react";

import classes from "./HoneyWrapper.module.css";

const HoneyWrapper = ({ word }) => {
   return (
      <div className={classes.root}>
         <div className={classes.testclass} style={{ opacity: word ? 1 : 1 }}>
            <Honey />
            <div className={classes.gridWrap}>
               <Grid />
            </div>
         </div>

         <div className={classes.wordContainer}>
            <div className={classes.word} style={{ visibility: word ? "visible" : "hidden" }}>
               {word ? word.toLowerCase() : "empty"}
            </div>
         </div>
      </div>
   );
};
export default HoneyWrapper;
