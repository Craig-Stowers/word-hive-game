import React, { useState, useEffect } from "react";

export default function useResizeObserver(ref) {
   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
   useEffect(() => {
      if (ref.current) {
         const observeTarget = ref.current;
         const resizeObserver = new ResizeObserver((entries) => {
            console.log("resizing from ratio");
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
   }, [ref]);
   return [dimensions.width, dimensions.height];
}
