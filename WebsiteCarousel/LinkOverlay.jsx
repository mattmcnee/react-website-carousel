import React, { useState, useRef, useEffect } from 'react';
import externalLinkIcon from '/src/assets/icons/external-link.svg';

const LinkOverlay = ({ linkText, src }) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [expandedWidth, setExpandedWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current && textRef.current) {
            const iconWidth = 14;
            const textWidth = textRef.current.offsetWidth;
            setExpandedWidth(iconWidth + textWidth); // 10px for padding
        }
    }, [linkText]);

    const handleClick = () => {
        window.open(src, '_blank'); // Open the external link in a new tab
    };

    return (
        <div 
            className='link-overlay'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick} // Add onClick handler
            ref={containerRef}
            style={{
                width: isHovered ? `${expandedWidth}px` : 'var(--link-overlay-height)',
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
                cursor: 'pointer' // Change cursor to pointer
            }}
        >
            <div
                className="link-icon"
                style={{
                    backgroundImage: `url(${externalLinkIcon})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            />
            <div className='link-text' ref={textRef}>{linkText}</div>
        </div>
    );
};

export default LinkOverlay;
