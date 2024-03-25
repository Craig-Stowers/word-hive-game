import { useEffect, useState } from "react";

function useTextFileLoader(filePath) {
   const [fileContent, setFileContent] = useState(null);

   useEffect(() => {
      if (!filePath) return;
      fetch(filePath)
         .then((response) => response.text())
         .then((contents) => {
            if (filePath.endsWith(".json")) {
               setFileContent(JSON.parse(contents));
            } else {
               setFileContent(contents);
            }
         })
         .catch((error) => console.error("Error:", error));
   }, [filePath]);

   return fileContent;
}

export default useTextFileLoader;
