import React, { useState, useEffect, useRef } from "react";

// Higher Order Component
function withSizeObserver(WrappedComponent) {
   return (props) => {
      const containerRef = useRef(null);
      const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

      useEffect(() => {
         if (containerRef.current) {
            const observeTarget = containerRef.current;
            const resizeObserver = new ResizeObserver((entries) => {
               console.log("resizing");
               if (!Array.isArray(entries) || !entries.length) {
                  return;
               }

               const { width, height } = entries[0].contentRect;
               setDimensions({ width, height });
            });

            resizeObserver.observe(observeTarget);

            const mutationObserver = new MutationObserver(() => {
               console.log("observe!!! scale");
               // this.calculateScale();
               //this.notify();
            });
            mutationObserver.observe(observeTarget, { attributes: true, attributeFilter: ["style"] });

            // Cleanup on component unmount
            return () => resizeObserver.unobserve(observeTarget);
         }
      }, [containerRef]);

      return (
         <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
            <WrappedComponent {...props} size={dimensions} />
         </div>
      );
   };
}

export default withSizeObserver;
