import Honey from "../../assets/honey.svg?react";
import classes from "./HoneyWrapper.module.css";

const HoneyWrapper = ({ word }) => {
   return (
      <div className={classes.root}>
         <div style={{ paddingLeft: "30px", paddingRight: "30px", opacity: word ? 1 : 0.5 }}>
            <Honey />
         </div>

         <div className={classes.word} style={{ visibility: word ? "visible" : "hidden" }}>
            {word ? word.toLowerCase() : "empty"}
         </div>
      </div>
   );
};
export default HoneyWrapper;
