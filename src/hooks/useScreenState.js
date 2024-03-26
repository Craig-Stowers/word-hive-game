import { useEffect, useState } from "react";
import useThrottleEffect from "./useThrottleEffect";

export default function useScreenState(screen, stateKey, initialState) {
   const [value, setValue] = useState(() => {
      console.log("init state", screen, screen.state[stateKey]);
      return screen.state[stateKey] || initialState;
   });

   useThrottleEffect(
      () => {
         screen.setState(screen.current, stateKey, value);
      },
      5000,
      [value]
   );

   return [value, setValue];
}
