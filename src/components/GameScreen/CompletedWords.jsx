import Honey from "../../assets/honey.svg?react";
import classes from "./CompletedWords.module.css";

const CompletedWords = () => {
   return (
      <div className={classes.root}>
         <div className={classes.row}>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
         </div>
         <div className={classes.row}>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
         </div>
         <div className={classes.row}>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
            <div className={classes.honeyWrapper}>
               <Honey />
            </div>
         </div>
      </div>
   );
};

export default CompletedWords;
