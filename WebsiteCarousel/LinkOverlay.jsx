import React, { useState, useRef, useEffect } from 'react';
import externalLinkIcon from '/src/assets/icons/external-link.svg';

const LinkOverlay = ({ linkText, src }) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [expandedWidth, setExpandedWidth] = useState(0);

    // calculate width of text to expand to
    useEffect(() => {
        if (containerRef.current && textRef.current) {
            const iconWidth = 14;
            const textWidth = textRef.current.offsetWidth;
            setExpandedWidth(iconWidth + textWidth);
        }
    }, [linkText]);

    // open external links in new tab
    const handleClick = () => {
        if (isHovered) {
            window.open(src, '_blank');
        } else {
            setIsHovered(true);
        }
        
    };

    return (
        <div 
            className='link-overlay'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            ref={containerRef}
            style={{
                width: isHovered ? `${expandedWidth}px` : 'var(--link-overlay-height)',
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
