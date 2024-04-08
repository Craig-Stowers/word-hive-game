import classes from "./CompletedWords.module.css";
import HoneyWrapper from "./HoneyWrapper";
import { extendArray, splitArrayIntoChunks } from "../../../helpers/arrayHelpers";

const CompletedWords = ({ words, letterOrder, bonusLetter, columns = 4, rowClass = "" }) => {
   const honeyObjects = extendArray(words, 12);
   const honeyObjectsChunks = splitArrayIntoChunks(honeyObjects, columns);

   return (
      <div className={classes.root}>
         {honeyObjectsChunks.map((chunk, i) => {
            return (
               <div className={`${classes.row} ${rowClass}`} key={"honey-row" + i}>
                  {chunk.map((word, i) => {
                     // console.log("Render for word", i, word);
                     return (
                        <div className={classes.honeyWrapper} key={"honey-column" + i}>
                           <HoneyWrapper answer={word} letterOrder={letterOrder} bonusLetter={bonusLetter} />
                        </div>
                     );
                  })}
               </div>
            );
         })}
      </div>
   );
};

export default CompletedWords;
