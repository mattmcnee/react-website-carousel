import React, { useRef, useState, useEffect, useMemo } from 'react';
import EmbeddedSite from './EmbeddedSite';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./WebsiteCarousel.css";
import LinkOverlay from './LinkOverlay';

const defaultSources = [
    { url: "https://example.com/1", name: "Example Website 1" },
    { url: "https://example.com/2", name: "Example Website 2" },
    { url: "https://example.com/3", name: "Example Website 3" }
];

// Use as <Carousel sources={sources}/>
// Define sources in the same way as defaultSources above

const Carousel = ({sources = defaultSources}) => {
    const carouselRef = useRef(null);
    const [cssHeight, setCssHeight] = useState(200);

    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(1);

    // Handle slide change
    const handleBeforeChange = (oldIndex, newIndex) => {
        const nextIndex = (newIndex + 1) % sources.length; // Calculate next index
        setActiveIndex(nextIndex);
    };

    const handleNextSlide = () => {
        sliderRef.current.slickNext();
    };
    
    const handlePrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const handleOverlayClick = (index) => {
        const totalItems = sources.length;
        const nextIndex = (activeIndex + 1) % totalItems;
        const prevIndex = (activeIndex - 1 + totalItems) % totalItems;
    
        if (index === nextIndex) {
            handleNextSlide();
        } else if (index === prevIndex) {
            handlePrevSlide();
        }
    };
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: handleBeforeChange,
        arrows: false,
    };

    return (
        <>
            <div className="carousel-container" ref={carouselRef} style={{'--dynamic-height': `${cssHeight + 20}px`}}>
                <Slider ref={sliderRef} {...settings}>
                    {sources.map((source, index) => {
                        return (
                            <div key={index} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                                <EmbeddedSite
                                    src={source.url}
                                    zoom={0.3}
                                    setCssHeight={setCssHeight}
                                    title={source.name}
                                />
                                {index !== activeIndex && (
                                    <div
                                        className='overlay'
                                        onClick={() => handleOverlayClick(index)}
                                    ></div>
                                )}
                                {index === activeIndex && (
                                    <LinkOverlay linkText={source.name} src={source.url}/>
                                )}
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </>
    );
};

export default Carousel;