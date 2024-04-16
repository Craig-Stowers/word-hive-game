import { useState, useRef, useEffect } from "react";

const getDefaultScreenKey = (screenMaps) => {
   return Object.keys(screenMaps).find((key) => screenMaps[key].default);
};
const wrapFunctions = (obj, additionalProps) => {
   const wrappedObject = {};

   Object.keys(obj).forEach((key) => {
      const originalFunction = obj[key];
      if (typeof originalFunction === "function") {
         wrappedObject[key] = (...args) => {
            // console.log(`Calling ${key} with additional props:`, additionalProps);
            return originalFunction(...args, additionalProps);
         };
      } else {
         // If it's not a function, just copy the value
         wrappedObject[key] = originalFunction;
      }
   });

   return wrappedObject;
};

function isForwardRefComponent(component) {
   return component && component.$$typeof === Symbol.for("react.forward_ref");
}

const copyValue = (value) => {
   if (Array.isArray(value)) {
      console.log("copied array", value);
      return [...value]; // Copy array
   } else if (typeof value === "string") {
      return String(value); // Copy string
   }
   // Add more conditions if you need to handle other types (objects, etc.)
   return value;
};

const ScreenManager = ({ screenMaps, initialScreen = null, globalData }) => {
   const [current, setCurrent] = useState(initialScreen || getDefaultScreenKey(screenMaps));

   const [history, setHistory] = useState([]);
   const screenRef = useRef(null);
   const [refIsSet, setRefIsSet] = useState(false);

   const [screenStates, setScreenStates] = useState(() => {
      const states = {};
      Object.keys(screenMaps).forEach((key) => {
         states[key] = {};
      });
      return states;
   });

   useEffect(() => {
      console.log("all screen stored states", screenStates);
   }, [screenStates]);

   const handleScreenChange = (key) => {
      setHistory((history) => [...history, current]);
      setCurrent(key);
   };
   const handleBack = () => {
      const lastScreen = history[history.length - 1];
      handleScreenChange(lastScreen);
   };

   const handleStoreScreenState = (screenKey, stateKey, value) => {
      console.log("handleStoreScreenState", screenKey, stateKey, value);
      setScreenStates((oldValue) => {
         console.log("setScreenStates - OLD", oldValue);
         const newValue = {
            ...oldValue,
            [screenKey]: {
               ...oldValue[screenKey],
               [stateKey]: copyValue(value),
            },
         };
         console.log("setScreenStates - NEW", newValue);
         return newValue;
      });
   };
   const currentScreenConfig = screenMaps[current] || {};
   const ScreenComponent = currentScreenConfig.component ? currentScreenConfig.component : null;
   const wrappers = currentScreenConfig.wrappers || [];

   //  console.log("screenRef", screenRef.current);

   const passProps = {
      change: handleScreenChange,
      back: handleBack,
      history,
      current,
      state: screenStates[current],
      setState: handleStoreScreenState,
      ref: screenRef,
      globalState: screenStates,
      globalData,

      //having trouble with direct provision of screenRef.current, as sometimes the ref is attached after these props have been handed on.
      //TODO possibly trigger an assign of new methods inside the ref attach below
   };

   console.log("global data screens", globalData);

   // console.log("passProps", passProps);

   const extendedCustomActions = wrapFunctions(currentScreenConfig.actions || {}, passProps);

   const screenManagerProps = {
      ...passProps,
      actions: extendedCustomActions,
   };

   const wrapComponent = (component, wrappers) => {
      return wrappers.reduceRight((acc, wrapper) => {
         const WrapperComponent = wrapper.component;
         const wrapperProps = {
            ...wrapper.props,
            screen: { ...screenManagerProps },
         };
         return <WrapperComponent {...wrapperProps}>{acc}</WrapperComponent>;
      }, component);
   };

   const setRef = (node) => {
      screenRef.current = node;
      // setRefIsSet(!!node); // Update state based on whether the node is null
   };

   if (!ScreenComponent) return null;

   const canAcceptRef = isForwardRefComponent(ScreenComponent);

   const screenComponentProps = canAcceptRef
      ? { ref: setRef, screen: { ...screenManagerProps } }
      : { screen: { ...screenManagerProps } };

   const renderedScreen = wrapComponent(<ScreenComponent {...screenComponentProps} />, wrappers);

   return (
      <>
         <div style={{ transform: "translateX(0%)", width: "100%", height: "100%" }}>{renderedScreen}</div>
      </>
   );
};

export default ScreenManager;
