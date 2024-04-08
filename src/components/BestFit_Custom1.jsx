import React, { useRef, useEffect, cloneElement } from "react";

const BestFitCustom_1 = ({ width, height, children, maxScale, style }) => {
   const outerRef = useRef(null);
   const innerRef = useRef(null);
   const childRef = useRef(null);

   // Ensure that there is only one child
   const child = React.Children.only(children);

   

   // Clone the child and attach the ref
   const childWithRef = cloneElement(child, {
      style: { ...child.props.style, height: height + "px", width: width + "px" },
   });

   useEffect(() => {
      const handleResize = () => {
         if (outerRef.current) {
            const element = outerRef.current;
            const containerWidth = element.offsetWidth;
            const containerHeight = element.offsetHeight;
            const containerRatio = containerWidth / containerHeight;
            const childRatio = width / height;
            const fitWidth = childRatio > containerRatio;
            const scaleFactor = Math.min(maxScale, fitWidth ? containerWidth / width : containerHeight / height);
            innerRef.current.style.transform = `scale(${scaleFactor}) translate(-50%, -50%)`;
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
      overflow: "hidden",
   };

   const innerStyle = {
      position: "absolute",
      transformOrigin: "top left",
      left: "50%",
      top: "50%",
      height: height + "px",
      width: width + "px",
   };

   return (
      <div style={outerStyle} ref={outerRef}>
         <div ref={innerRef} style={innerStyle}>
            {childWithRef}
         </div>
      </div>
   );
};

export default BestFitCustom_1;
