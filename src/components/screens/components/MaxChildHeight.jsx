import React, { useEffect, useRef, useState } from "react";

const MaxChildHeight = ({ children, ...props }) => {
   const childRefs = useRef([]);
   const [maxHeight, setMaxHeight] = useState(0);

   useEffect(() => {
      const heights = childRefs.current.map((ref) => ref?.current.offsetHeight || 0);
      //  console.log("HEIGHTS", heights);
      setMaxHeight(Math.max(...heights));
   }, [children]); // Depend on children, so this runs when they change

   // Assign a ref to each child
   const clonedChildren = React.Children.map(children, (child, index) => {
      // Extend the childRefs array as needed
      if (!childRefs.current[index]) {
         childRefs.current[index] = React.createRef();
      }

      return React.cloneElement(child, { ref: childRefs.current[index] });
   });

   const { style, ...rest } = props;

   return (
      <div style={{ ...style, height: maxHeight + "px" }} {...rest}>
         {clonedChildren}
      </div>
   );
};

export default MaxChildHeight;
