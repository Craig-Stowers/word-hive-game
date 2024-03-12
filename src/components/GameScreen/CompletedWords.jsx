import classes from "./CompletedWords.module.css";
import HoneyWrapper from "./HoneyWrapper";

function extendArray(arr, desiredLength) {
   const newArr = [...arr];
   while (newArr.length < desiredLength) {
      newArr.push(undefined); // Push empty values (undefined) into the array
   }
   return newArr;
}
function splitArrayIntoChunks(array, chunkSize) {
   const chunks = [];

   for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize)); // Push a slice of the original array into the chunks array
   }

   return chunks;
}

const CompletedWords = ({ words }) => {
   const honeyObjects = extendArray(words, 12);
   const honeyObjectsChunks = splitArrayIntoChunks(honeyObjects, 4);

   return (
      <div className={classes.root}>
         {honeyObjectsChunks.map((chunk) => {
            return (
               <div className={classes.row}>
                  {chunk.map((word) => {
                     return (
                        <div className={classes.honeyWrapper}>
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
