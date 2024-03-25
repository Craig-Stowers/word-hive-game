import Header from "../shared/Header";
const WithHeader = ({ children, ...props }) => {
   return (
      <div style={{ display: "flex", flexDirection: "column" }}>
         <Header {...props} />
         {children}
      </div>
   );
};

export default WithHeader;
