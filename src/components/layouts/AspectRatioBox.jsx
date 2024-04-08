import React, { useState, useEffect, useRef } from "react";

const AspectRatioBox = ({ ratio, children, style, className, height = null, width = "100%" }) => {
   const [boxHeight, setBoxHeight] = useState(height || 0);
   const [boxWidth, setWidth] = useState(width);
   const ref = useRef(null);

   const sizeToHeight = height !== null;

   const updateDimensions = () => {
      if (ref.current) {
         if (sizeToHeight) {
            const currHeight = ref.current.offsetHeight;
            const newWidth = currHeight * ratio;
            setWidth(newWidth);
            return;
         }
         const currWidth = ref.current.offsetWidth;
         const newHeight = currWidth / ratio;
         setBoxHeight(newHeight);
      }
   };

   useEffect(() => {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);

      const timer = setTimeout(() => {
         updateDimensions();
      }, 400);

      return () => {
         clearTimeout(timer);
         window.removeEventListener("resize", updateDimensions);
      };
   }, [ratio]); // Recalculate when the ratio changes

   const styleHeight = sizeToHeight ? height : `${boxHeight}px`;
   const styleWidth = sizeToHeight ? `${boxWidth}px` : "100%";

   return (
      <div
         ref={ref}
         style={{ width: styleWidth, height: styleHeight, overflow: "hidden", ...style }}
         className={className}
      >
         {children}
      </div>
   );
};

export default AspectRatioBox;
