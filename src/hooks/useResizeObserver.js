import React, { useState, useEffect } from "react";

export default function useResizeObserver(ref, deps = [], key) {
   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
   useEffect(() => {
      // console.log("SETUP OBSERVER", key);
      if (ref.current) {
         //console.log("ADD LISTENER FOR KEY", key);
         const observeTarget = ref.current;
         const resizeObserver = new ResizeObserver((entries) => {
            // if (key) console.log("resizing", key);
            if (!Array.isArray(entries) || !entries.length) {
               return;
            }
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
         });

         resizeObserver.observe(observeTarget);
         // Cleanup on component unmount
         return () => resizeObserver.unobserve(observeTarget);
      }
   }, [ref, ref.current, ...deps]);
   return [dimensions.width, dimensions.height];
}
