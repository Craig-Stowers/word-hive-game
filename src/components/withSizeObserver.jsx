import React, { useState, useEffect, useRef } from "react";

function withSizeObserver(WrappedComponent) {
    return (props) => {
        const containerRef = useRef(null);
        const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

        useEffect(() => {
            if (!containerRef.current) return;

            const observeTarget = containerRef.current;

            // Setup ResizeObserver
            const resizeObserver = new ResizeObserver((entries) => {
                if (!Array.isArray(entries) || !entries.length) return;
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height });
            });

            // Setup MutationObserver
            const mutationObserver = new MutationObserver(() => {
                // Placeholder for your mutation handling
            });

            resizeObserver.observe(observeTarget);
            mutationObserver.observe(observeTarget, {
                attributes: true,
                attributeFilter: ["style"],
            });

            // Cleanup function
            return () => {
                resizeObserver.unobserve(observeTarget);
                mutationObserver.disconnect(); // Properly cleanup the MutationObserver
            };
        }, [containerRef]);

        return (
            <div
                ref={containerRef}
                style={{ width: "100%", height: "100%", position: "relative" }}
            >
                <WrappedComponent {...props} size={dimensions} />
            </div>
        );
    };
}

export default withSizeObserver;
