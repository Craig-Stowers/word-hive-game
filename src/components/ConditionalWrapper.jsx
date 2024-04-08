import React from "react";

const ConditionalWrapper = ({ condition, children, ...props }) => {
   if (condition) {
      // Return with additional wrapping component or logic
      return (
         <div className="additional-wrapper" {...props}>
            {children}
         </div>
      );
   }
   return children;
};

export default ConditionalWrapper;
