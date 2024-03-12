# DCO Developer - Coding Challenge Solution

## Task
Create a banner which features a product carousel accompanied by relevant titles.

The creative will start with the first product and title. After 1.5 seconds, the subsequent product and title will fade in. This pattern continues for all 4 products before looping. The animation should be executed using GSAP.

The carousel should auto-play upon loading. If the user interacts with the arrows, they will control the image transitions (images will fade in and out). Interaction with the arrows should also update the product title accordingly. 

## Approach to the solution
Using both HTML and CSS, I first created the skeleton of the banner making sure to include everything apart from the dynamic pieces of content.

Within `scripts.js`, I then defined a products array where each entry is an object with the data pertaining to each product. My rationale behind this was the array would make it simplier to dynamically create and animate over products within the banner. Using the products array, I looped over each product and created an element for both the banner image and product title and appended both elements to their respective containers. I also, adjusted the z-index of each image and title for layering purposes.

Once all the dynamic elements had been created and inserted into the DOM, I created a GSAP timeline `tl` and specified a repeat option of `-1` which allows the animation to loop infinitely. For each product image and product title pair, I added a fade-out transition with a duration of `1.5` seconds and used the `onStart` callback option to update the "Shop Now" href to reflect the slug of the product currently being animated over. I also added a fade-in transition for the first product `tl.to([images[0], productTitles[0]], { opacity: 1 }, '-=0.5')` to account for emptiness after a full timeline cycle.

Following this, I added click event listeners to both the previous and next buttons which would allow users to navigate between products. When either button is clicked the timeline is paused in its current state, the new index is calculated, the timeline progress is updated and the resumption of the timeline is debounced using `setResumeTimeout`.

## Setup
1. Clone this repository by running `git clone https://github.com/Hakeem0598/dco-coding-challenge.git`
2. Open it in your code editor
3. Run `npm i`
4. Run `npm start`

This will run a local server on port 3000 and surface the banner at the endpoint:
- http://localhost:3000
