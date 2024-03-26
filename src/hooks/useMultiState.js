import { useState, useMemo } from "react";

export const useMultiState = (...states) => {
   const [s1, set1] = useState(null);
   const [s2, set2] = useState(null);
   const [s3, set3] = useState(null);
   const [s4, set4] = useState(null);
   const [s5, set5] = useState(null);

   const getters = [s1, s2, s3, s4, s5];

   const mapSetters = useMemo(() => {
      const setters = [set1, set2, set3, set4, set5];
      const map = {};
      for (let i = 0; i < states.length; i++) {
         map["set" + states[i]] = setters[i];
      }
      return map;
   }, []);

   const mapGetters = useMemo(() => {
      const map = {};
      for (let i = 0; i < states.length; i++) {
         map[states[i]] = getters[i];
      }
      return map;
   }, [...getters]);

   return { ...mapGetters, ...mapSetters };
};
