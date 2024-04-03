import classes from "./CompletedWords.module.css";
import HoneyWrapper from "./HoneyWrapper";
import { extendArray, splitArrayIntoChunks } from "../../../helpers/arrayHelpers";

const CompletedWords = ({ words, letterOrder, bonusLetter }) => {
   const honeyObjects = extendArray(words, 12);
   const honeyObjectsChunks = splitArrayIntoChunks(honeyObjects, 4);

   return (
      <div className={classes.root}>
         <div>letter order: {letterOrder}</div>
         {honeyObjectsChunks.map((chunk, i) => {
            return (
               <div className={classes.row} key={"honey-row" + i}>
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
