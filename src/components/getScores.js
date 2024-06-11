function longestStreak(arr) {
   if (arr.length === 0) {
      return 0;
   }

   // Sort the array
   arr.sort((a, b) => a - b);

   let maxStreak = 1;
   let currentStreak = 1;

   // Iterate through the sorted array to find the longest consecutive sequence
   for (let i = 1; i < arr.length; i++) {
      if (arr[i] === arr[i - 1] + 1) {
         // Continue the streak
         currentStreak++;
      } else if (arr[i] !== arr[i - 1]) {
         // Only reset if we encounter a non-duplicate, non-consecutive number
         maxStreak = Math.max(maxStreak, currentStreak);
         currentStreak = 1;
      }
   }

   // Compare the last streak
   maxStreak = Math.max(maxStreak, currentStreak);

   return maxStreak;
}

const getScores = (data) => {
   const solved = Object.keys(data.success).length;
   const played = solved + Object.keys(data.incomplete).length;

   const completedChallenges = Object.keys(data.success).map((key) => {
      return parseInt(key);
   });

   const streak = longestStreak(completedChallenges);

   const pangrams = Object.keys(data.success).reduce((acc, curr) => {
      //const word = data.success[curr].answer
      const words = data.success[curr].correct;
      for (let word of words) {
         console.log("test word", word);
         const uniqueLetters = new Set(word.word);
         console.log("unique letters", uniqueLetters);
         console.log("unique letters length", uniqueLetters.length);
         if (uniqueLetters.size === 7) return acc + 1;
      }
      return acc;
   }, 0);

   console.log("completedChallenges", completedChallenges);

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
