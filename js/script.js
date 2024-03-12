'use strict';

// Define an array of product objects
const products = [
	{
		title: 'Mini Alexa in Amethyst',
		src: 'assets/mini-alexa@2x.png',
		alt: 'Mini Alexa in Amethyst',
		slug: 'mini-alex-in-amethyst',
		width: 490,
		height: 300,
	},
	{
		title: 'Medium Lily in Sapphire',
		src: 'assets/lily@2x.png',
		alt: 'Medium Lily in Sapphire',
		slug: 'medium-lily-in-sapphire',
		width: 525,
		height: 300,
	},
	{
		title: 'Micro Bags',
		src: 'assets/micro-bags@2x.png',
		alt: 'Micro Bags',
		slug: 'micro-bags',
		width: 453,
		height: 300,
	},
	{
		title: 'Small Check Merino Wool Scarf',
		src: 'assets/mens-scarf-and-briefcase@2x.png',
		alt: 'Small Check Merino Wool Scarf',
		slug: 'small-check-merino-wool-scarf',
		width: 444,
		height: 300,
	},
];

// Duration for the fade animation
const DURATION = 1.5;

// Execute the code when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
	// Retrieve DOM elements
	const shopNowButton = document.querySelector('.cta-button');
	const prevButton = document.querySelector('.arrow.previous');
	const nextButton = document.querySelector('.arrow.next');
	const imagesContainer = document.querySelector('.banner-images');
	const titlesContainer = document.querySelector('.product-titles');

	const productCount = products.length;

	// Dynamically create banner images and titles for each product and append them to their containers
	for (let i = 0; i < productCount; i++) {
		// Calculate the z-index for layering
		const zIndex = productCount - i;

		// Extract product details
		const { title, src, alt, width, height } = products[i];

		// Create image element
		const img = document.createElement('img');
		img.src = src;
		img.alt = alt;
		img.width = width;
		img.height = height;
		img.style.zIndex = zIndex;
		img.classList.add('banner-image');

		// Create product title element
		const productTitle = document.createElement('h2');
		productTitle.textContent = title;
		productTitle.style.zIndex = zIndex;
		productTitle.classList.add('product-title');

		// Append elements to containers
		imagesContainer.appendChild(img);
		titlesContainer.appendChild(productTitle);
	}

	// Select all banner images and product titles previously created
	const images = document.querySelectorAll('.banner-image');
	const productTitles = document.querySelectorAll('.product-title');

	// Create a GSAP timeline for the fade animation
	const tl = gsap.timeline({ repeat: -1 });

	// Iterate over images and titles, adding them to the timeline
	images.forEach((image, index) => {
		tl.to(
			// Add both image and title to the timeline
			[image, productTitles[index]],
			{
				opacity: 0,
				onStart() {
					// Update the "shop now" link href based on the current product displayed
					const currentIndex = (index + 1) % productCount;
					shopNowButton.href = `/product/${products[currentIndex].slug}`;
				},
			},
			`+=${DURATION}`
		);
	});

	// Fade in the first image and title once the animation loop completes
	tl.to([images[0], productTitles[0]], { opacity: 1 }, '-=0.5');

	// Function to show prev product
	function showPrevious() {
		tl.pause();
		const currentIndex = Math.floor(tl.progress() * productCount);
		const newIndex = (currentIndex - 1 + productCount) % productCount;
		tl.progress(newIndex / productCount);
		setResumeTimeout();
	}

	// Function to show next product
	function showNext() {
		tl.pause();
		const currentIndex = Math.floor(tl.progress() * productCount);
		const newIndex = (currentIndex + 1) % productCount;
		tl.progress(newIndex / productCount);
		setResumeTimeout();
	}

	// Timeout variable for debouncing
	let resumeTimeout;

	// Debounce the resumption of the timeline when the prev or next button is clicked
	function setResumeTimeout() {
		clearTimeout(resumeTimeout);
		resumeTimeout = setTimeout(() => {
			tl.resume();
		}, DURATION * 1000);
	}

	// Add event listeners to the prev and next navigation buttons
	prevButton.addEventListener('click', showPrevious);
	nextButton.addEventListener('click', showNext);
});
