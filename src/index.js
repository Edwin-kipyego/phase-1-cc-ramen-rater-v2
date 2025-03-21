// Define the base URL for the API
const baseUrl = 'http://localhost:3000';

// Function to handle the display of ramen details when an image is clicked
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');
  const ramenImage = document.querySelector('.detail-image');
  const ramenName = document.querySelector('.name');
  const ramenRestaurant = document.querySelector('.restaurant');
  
  ramenImage.src = ramen.image || 'assets/default-ramen.jpg';
  ramenImage.alt = ramen.name;
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

// Function to fetch and display all ramen images on page load
const displayRamens = () => {
  fetch(`${baseUrl}/ramens`) // Use the baseUrl to construct the full URL
    .then(response => response.json()) // Convert response to JSON
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = ''; // Clear existing images

      // Loop through each ramen and create img elements
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image || 'assets/default-ramen.jpg';
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen)); // Attach click event
        ramenMenu.appendChild(img);
        console.log(ramen);
      });

      // Show details for the first ramen when the page loads
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch(error => console.error('Error fetching ramen data:', error));
};

// Function to handle form submission to add a new ramen
const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  
  newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission (page reload)

    // Get form input values
    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image_url = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    // Create a new ramen object
    const newRamen = { name, restaurant, image, rating, comment };

    // Append the new ramen to the ramen menu
    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen)); // Handle click event
    ramenMenu.appendChild(img);

    // Clear the form inputs
    newRamenForm.reset();
  });
};

// Main function to initialize the app
const main = () => {
  displayRamens(); // Display all ramen images on page load
  addSubmitListener(); // Add event listener for form submission
};

// Run the main function when the page is loaded
document.addEventListener('DOMContentLoaded', main);

