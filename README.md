# react-website-carousel

Displays a carousel with a central editable iframe and smaller iframes on either side that move to the centre when clicked.

A live demo is avaiable at [https://acyleris.com](acyleris.com) in the portfolio section.

This builds on the slider provided by [https://www.npmjs.com/package/react-slick](react-slick), adding custom animations and ease of use.

### Usage
```
import Carousel from '.../WebsiteCarousel/Carousel';
```
```
const sources = [
    { url: "https://example.com", name: "Example Website 1" },
]
```
```
<Carousel sources={sources}/>
```