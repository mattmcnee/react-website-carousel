import React, { useEffect, useRef, useState } from 'react';

const EmbeddedSite = ({ src, zoom = 0.8, setCssHeight, title }) => {
    // initialise zoom effects
    const inverseZoom = 1 / zoom;
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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

        const resizeObserver = new ResizeObserver(() => {
            updateDimensions();
        });

        if (parentRef.current) {
            resizeObserver.observe(parentRef.current);
        }

        return () => {
            if (parentRef.current) {
                resizeObserver.unobserve(parentRef.current);
            }
            resizeObserver.disconnect();
        };
    }, [inverseZoom]);

    return (
        <div ref={parentRef} className="iframe-container">
            <iframe
                src={src}
                width={`${dimensions.width}px`}
                height={`${dimensions.height}px`}
                title={title}
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "0 0",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
                }}
                loading="lazy"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default EmbeddedSite;
