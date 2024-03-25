import ReactDOM from "react-dom";

const Portal = ({ id, children }) => {
   const portalRoot = document.getElementById(id);
   if (!portalRoot) return null; //console.error(`portal id: "${id}" not found`);
   return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
