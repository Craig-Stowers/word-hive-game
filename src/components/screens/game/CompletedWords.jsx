import classes from "./CompletedWords.module.css";
import HoneyWrapper from "./HoneyWrapper";
import { extendArray, splitArrayIntoChunks } from "../../../helpers/arrayHelpers";

const CompletedWords = ({ words }) => {
   const honeyObjects = extendArray(words, 12);
   const honeyObjectsChunks = splitArrayIntoChunks(honeyObjects, 4);

   return (
      <div className={classes.root}>
         {honeyObjectsChunks.map((chunk, i) => {
            return (
               <div className={classes.row} key={"honey-row" + i}>
                  {chunk.map((word, i) => {
                     return (
                        <div className={classes.honeyWrapper} key={"honey-column" + i}>
                           <HoneyWrapper word={word} />
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
