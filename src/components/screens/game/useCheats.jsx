const useCheats = ({ getters, setters }) => {
   const methods = {
      inputNext() {
         setters.setAnswer(() => {
            const filtered = getters.availableAnswers.filter((answer) => !getters.correctWords.includes(answer));
            return filtered[Math.floor(Math.random() * filtered.length)];
         });
      },
      answerNext() {
         setters.setCorrectWords((oldValue) => {
            if (oldValue.length >= 12) return oldValue;
            const filtered = getters.availableAnswers.filter((answer) => !oldValue.includes(answer));
            return [...oldValue, filtered[Math.floor(Math.random() * filtered.length)]];
         });
      },
      answerAll() {
         setters.setCorrectWords((oldValue) => {
            if (oldValue.length >= 12) return oldValue;
            const filtered = getters.availableAnswers.filter((answer) => !oldValue.includes(answer));
            const batchAnswers = [];
            let index = 0;
            while (batchAnswers.length < 12 - oldValue.length) {
               batchAnswers.push(filtered[index]);
               index++;
            }
            return [...oldValue, ...batchAnswers];
         });
      },
   };

   return methods;
};

export default useCheats;
