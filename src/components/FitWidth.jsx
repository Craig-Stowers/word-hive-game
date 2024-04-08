import React, { useRef, useEffect, cloneElement, useState } from "react";

const FitWidth = ({ width, height, children, maxScale, style }) => {
   const outerRef = useRef(null);
   const innerRef = useRef(null);

   const [dimensions, setDimensions] = useState({ width: width, height: height });

   // Ensure that there is only one child
   const child = React.Children.only(children);

   // Clone the child and attach the ref
   const childWithRef = cloneElement(child, {
      style: { ...child.props.style },
      // style: { ...child.props.style, height: height + "px", width: width + "px" },
   });

   useEffect(() => {
      const handleResize = () => {
         if (outerRef.current) {
            const element = outerRef.current;
            const containerWidth = element.offsetWidth;

            let adaptWidth = width;
            const innerRatio = width / height;
            const adaptHeight = adaptWidth / innerRatio;

            setDimensions({ width: adaptWidth, height: adaptHeight });

            const scaleFactor = Math.min(maxScale, containerWidth / adaptWidth);
            innerRef.current.style.transform = `scale(${scaleFactor}) translate(-50%, -100%)`;
         }
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const outerStyle = {
      ...style,
      position: "relative",
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
   };

   const innerStyle = {
      position: "absolute",
      transformOrigin: "top left",
      left: "50%",
      top: "100%",
      height: dimensions.height + "px",
      width: dimensions.width + "px",
      backgroundColor: "blue",
   };

   return (
      <div style={outerStyle} ref={outerRef}>
         <div ref={innerRef} style={innerStyle}>
            {childWithRef}
         </div>
      </div>
   );
};

export default FitWidth;
