const getScores = (data) => {
   const solved = Object.keys(data.success).length;
   const played = solved + Object.keys(data.incomplete).length;

   const streak = Object.keys(data.success).reduce((acc, curr) => {
      if (acc === 0) return 1;
      if (parseInt(curr) === acc + 1) return acc + 1;
      return acc;
   }, 0);

   const pangrams = Object.keys(data.success).reduce((acc, curr) => {
      //const word = data.success[curr].answer
      const words = data.success[curr].correct;
      for (let word of words) {
         const uniqueLetters = new Set(word.word);
         if (uniqueLetters === 7) return acc + 1;
      }
      return acc;
   }, 0);

   const avgScore =
      Object.keys(data.success).reduce((acc, curr) => {
         return acc + data.success[curr].score;
      }, 0) / solved;

   const roundedAverage = Math.round(avgScore * 10) / 10;

   const highScore = Object.keys(data.success).reduce((acc, curr) => {
      return Math.max(acc, data.success[curr].score);
   }, 0);

   return [played, solved, streak, pangrams, roundedAverage, highScore];
};

export default getScores;
