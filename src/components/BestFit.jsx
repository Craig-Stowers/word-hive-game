import React, { useRef, useEffect, cloneElement, useState } from "react";
import useResizeObserver from "../hooks/useResizeObserver";

const BestFit = ({
    width,
    height,
    children,
    maxScale,
    style,
    ratioBreakPoints,
    onScaleChange,
    onContainerResize = null,
    active = true,
}) => {
    const outerRef = useRef(null);
    const innerRef = useRef(null);
    const childRef = useRef(null);

    const [dimensions, setDimensions] = useState({
        width: width,
        height: height,
    });
    const [testWidth, testHeight] = useResizeObserver(outerRef);

    // Ensure that there is only one child
    const child = React.Children.only(children);

    // Clone the child and attach the ref
    const childWithRef = cloneElement(child, {
        style: { ...child.props.style },
        // style: { ...child.props.style, height: height + "px", width: width + "px" },
    });

    // const handleResizeTest = () => {
    //    if (outerRef.current) {
    //       const element = outerRef.current;
    //       const containerWidth = element.offsetWidth;
    //       const containerHeight = element.offsetHeight;
    //       const containerRatio = containerWidth / containerHeight;

    //       let adaptWidth = width;
    //       let adaptHeight = height;
    //       if (ratioBreakPoints && containerRatio > ratioKeys[0]) {
    //          adaptWidth = ratioBreakPoints[ratioKeys[0]].width;
    //          adaptHeight = ratioBreakPoints[ratioKeys[0]].height;
    //       }

    //       setDimensions({ width: adaptWidth, height: adaptHeight });

    //       const childRatio = adaptWidth / adaptHeight;
    //       const fitWidth = childRatio > containerRatio;
    //       const scaleFactor = Math.min(maxScale, fitWidth ? containerWidth / adaptWidth : containerHeight / adaptHeight);
    //       innerRef.current.style.transform = `scale(${scaleFactor}) translate(-50%, -50%)`;
    //    }
    // };

    useEffect(() => {
        if (onContainerResize) {
            onContainerResize({ width: testWidth, height: testHeight });
        }
    }, [testWidth, testHeight]);

    useEffect(() => {
        if (!active) {
            innerRef.current.style.transform = `scale(1) translate(-50%, -50%)`;
            setDimensions({ width: testWidth, height: testHeight });
            return;
        }
        if (!outerRef.current) return;

        let adaptWidth = width;
        let adaptHeight = height;
        setDimensions({ width: adaptWidth, height: adaptHeight });
        const containerRatio = testWidth / testHeight;
        const childRatio = adaptWidth / adaptHeight;
        const fitWidth = childRatio > containerRatio;
        const scaleFactor = Math.min(
            maxScale,
            fitWidth ? testWidth / adaptWidth : testHeight / adaptHeight
        );

        if (onScaleChange) {
            onScaleChange({ scaleFactor, adaptWidth, adaptHeight });
        }

        //console.log("new OBS scale", scaleFactor);
        innerRef.current.style.transform = `scale(${scaleFactor}) translate(-50%, -50%)`;

        // const repaintTimer = setTimeout(() => {
        innerRef.current.style.display = "none";
        innerRef.current.offsetHeight; // force repaint
        innerRef.current.style.display = "";
        // innerRef.current.style.transform = `scale(${scaleFactor}) translate(-50%, -50%)`;
        // }, 10);
        //  return () => clearTimeout(repaintTimer);
    }, [testWidth, testHeight, active]);

    // useEffect(() => {
    //    const ratioKeys =
    //       ratioBreakPoints &&
    //       Object.keys(ratioBreakPoints)
    //          .map((value) => Number(value))
    //          .sort((a, b) => a - b);

    //    const handleResize = () => {
    //       if (outerRef.current) {
    //          const element = outerRef.current;
    //          const containerWidth = element.offsetWidth;
    //          const containerHeight = element.offsetHeight;
    //          const containerRatio = containerWidth / containerHeight;

    //          let adaptWidth = width;
    //          let adaptHeight = height;
    //          if (ratioBreakPoints && containerRatio > ratioKeys[0]) {
    //             adaptWidth = ratioBreakPoints[ratioKeys[0]].width;
    //             adaptHeight = ratioBreakPoints[ratioKeys[0]].height;
    //          }

    //          setDimensions({ width: adaptWidth, height: adaptHeight });

    //          const childRatio = adaptWidth / adaptHeight;
    //          const fitWidth = childRatio > containerRatio;
    //          const scaleFactor = Math.min(
    //             maxScale,
    //             fitWidth ? containerWidth / adaptWidth : containerHeight / adaptHeight
    //          );
    //          innerRef.current.style.transform = `scale(${scaleFactor}) translate(-50%, -50%)`;
    //       }
    //    };

    //    window.addEventListener("resize", handleResize);
    //    handleResize();
    //    setTimeout(() => {
    //       handleResize();
    //    }, 100);
    //    return () => window.removeEventListener("resize", handleResize);
    // }, [width, height]);

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
        height: dimensions.height + "px",
        width: dimensions.width + "px",
    };

    return (
        <div style={outerStyle} ref={outerRef}>
            <div ref={innerRef} style={innerStyle}>
                {childWithRef}
            </div>
        </div>
    );
};

export default BestFit;
