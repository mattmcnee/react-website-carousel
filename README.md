# react-website-carousel

Displays a carousel with a central editable iframe and smaller iframes on either side that move to the centre when clicked.

A live demo is available at [acyleris.com](https://acyleris.com) in the portfolio section.

This builds on the slider provided by [react-slick](https://www.npmjs.com/package/react-slick), adding custom animations and ease of use.

### Usage
Download or clone the repository and add the WebsiteCarousel folder to your project. Import the Carousel file from the WebsiteCarousel folder
```
import Carousel from '.../WebsiteCarousel/Carousel';
```
Define the sources for the carousel to use
```
const sources = [
    { url: "https://example.com", name: "Example Website 1" },
]
```
Add the Carousel to the JSX
```
<Carousel sources={sources}/>
```