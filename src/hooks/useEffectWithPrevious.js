import { useEffect, useRef } from "react";

function useEffectWithPrevious(effectCallback, dependency) {
   const previousDependency = useRef(dependency);

   useEffect(() => {
      // Call the effect callback with the current and previous value of the dependency
      effectCallback(previousDependency.current);

      // Update the previous value of the dependency after the effect has run
      previousDependency.current = dependency;
   }, [dependency, effectCallback]);
}

export default useEffectWithPrevious;
