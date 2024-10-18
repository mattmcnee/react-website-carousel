import React, { useEffect, useRef, useState } from 'react';

const EmbeddedSite = ({ width, height, src, zoom = 0.8, setCssHeight }) => {
    const inverseZoom = 1 / zoom;

    // Ensure the width and height don't fall below 300px after scaling
    const adjustedWidth = Math.max(width * inverseZoom, 300);
    const adjustedHeight = Math.max(height * inverseZoom, 300);

    // State for dimensions
    const [dimensions, setDimensions] = useState({ width: adjustedWidth, height: adjustedHeight });
    const parentRef = useRef(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (parentRef.current) {
                const pageAspectRatio = window.innerWidth / window.innerHeight;
                const carouselWidth = parentRef.current.offsetWidth;
                const carouselHeight = carouselWidth / pageAspectRatio;

                setDimensions({
                    width: Math.max(carouselWidth * inverseZoom, 200),
                    height: Math.max(carouselHeight * inverseZoom, 200)
                });

                setCssHeight(carouselHeight * 2);
            }
        };

        updateDimensions();

        // Use ResizeObserver to observe changes to the parent container's size
        const resizeObserver = new ResizeObserver(() => {
            updateDimensions();
        });

        if (parentRef.current) {
            resizeObserver.observe(parentRef.current);
        }

        // Clean up the observer on unmount
        return () => {
            if (parentRef.current) {
                resizeObserver.unobserve(parentRef.current);
            }
            resizeObserver.disconnect();
        };
    }, [inverseZoom]);

    // Calculate negative margins to counteract the scaling effect
    const negativeMarginX = (dimensions.width * (zoom - 1)) / 2;
    const negativeMarginY = (dimensions.height * (zoom - 1)) / 2;

    return (
        <div ref={parentRef} className="iframe-container">
            <iframe
                src={src}
                width={`${dimensions.width}px`} // Set the width based on adjusted dimensions
                height={`${dimensions.height}px`} // Set the height based on adjusted dimensions
                title="Embedded Content"
                style={{
                    transform: `scale(${zoom})`, // Scale the content
                    transformOrigin: "0 0",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
                    marginLeft: `-${negativeMarginX}px`, // Adjust margins
                    marginTop: `-${negativeMarginY}px`, // Adjust margins
                }}
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default EmbeddedSite;
