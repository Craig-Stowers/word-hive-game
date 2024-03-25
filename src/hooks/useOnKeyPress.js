import { useEffect } from "react";

const useOnKeyPress = (callback, deps, keys = [], keyCodes = []) => {
   useEffect(() => {
      const handleKeyPress = (event) => {
         //  const
         if (keys.includes(event.key) || keyCodes.includes(event.keyCode)) {
            callback(event.key);
         }
      };
      document.addEventListener("keydown", handleKeyPress);
      return () => {
         document.removeEventListener("keydown", handleKeyPress);
      };
   }, [callback, ...deps, keys, keyCodes]);
};

export default useOnKeyPress;
