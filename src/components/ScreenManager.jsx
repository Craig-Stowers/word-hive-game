import { useState, useRef } from "react";

const getDefaultScreenKey = (screenMaps) => {
   return Object.keys(screenMaps).find((key) => screenMaps[key].default);
};
const wrapFunctions = (obj, additionalProps) => {
   const wrappedObject = {};

   Object.keys(obj).forEach((key) => {
      const originalFunction = obj[key];
      if (typeof originalFunction === "function") {
         wrappedObject[key] = (...args) => {
            console.log(`Calling ${key} with additional props:`, additionalProps);
            return originalFunction(...args, additionalProps);
         };
      } else {
         // If it's not a function, just copy the value
         wrappedObject[key] = originalFunction;
      }
   });

   return wrappedObject;
};

const ScreenManager = ({ screenMaps, initialScreen = null }) => {
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

   const handleScreenChange = (key) => {
      setHistory((history) => [...history, current]);
      setCurrent(key);
   };
   const handleBack = () => {
      const lastScreen = history[history.length - 1];
      handleScreenChange(lastScreen);
   };

   const handleStoreScreenState = (screenKey, stateKey, value) => {
      setScreenStates((oldValue) => {
         const newValue = {
            ...oldValue,
            [screenKey]: {
               ...screenStates[screenKey],
               [stateKey]: value,
            },
         };
         console.log("change state", newValue);
         return newValue;
      });
   };
   const currentScreenConfig = screenMaps[current] || {};
   const ScreenComponent = currentScreenConfig.component ? currentScreenConfig.component : null;
   const wrappers = currentScreenConfig.wrappers || [];

   console.log("screenRef", screenRef.current);

   const passProps = {
      change: handleScreenChange,
      back: handleBack,
      history,
      current,
      state: screenStates[current],
      setState: handleStoreScreenState,
      test: () => {
         console.log("test", screenRef);
      },
      ref: screenRef,

      //having trouble with direct provision of screenRef.current, as sometimes the ref is attached after these props have been handed on.
      //TODO possibly trigger an assign of new methods inside the ref attach below
   };

   console.log("passProps", passProps);

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

   const renderedScreen = wrapComponent(<ScreenComponent ref={setRef} screen={{ ...screenManagerProps }} />, wrappers);

   return renderedScreen;
};

export default ScreenManager;
