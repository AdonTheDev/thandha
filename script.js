// Get form inputs from URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        dob: params.get('dob')
    };
}

// Generate random 10-digit number
function generateRandomNumber() {
    return Math.floor(1000000000000 + Math.random() * 9000000000000); // Ensure 10 digits
}

// Create image with background and text
function createImage(name, dob, randomNumber) {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Create a new image object
    const backgroundImage = new Image();
    backgroundImage.src = 'background.png'; // Path to your image

    // Wait for the image to load
    backgroundImage.onload = function () {
        // Draw the background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Set font
        ctx.font = '22px "Roboto Mono", monospace';
        ctx.textAlign = 'left'; // Align text to the left

        // Draw text with center alignment
        ctx.fillStyle = '#fff'; // White color
        ctx.fillText(`NAME: ${name}`, 50, 180);
        ctx.fillText(`DOB: ${dob}`, 50, 220);
        ctx.fillText(`${randomNumber}`, 172, 260);

        // Append canvas to container
        document.getElementById('imageContainer').appendChild(canvas);
    };
}

// Handle page load
if (window.location.pathname.includes('page2.html')) {
    const params = getUrlParams();
    const randomNumber = generateRandomNumber();
    createImage(params.name, params.dob, randomNumber);
}

// Handle image download
document.getElementById('downloadButton').addEventListener('click', function () {
    const canvas = document.querySelector('#imageContainer canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${getUrlParams().name || 'image'}'s_N-word_pass.png`; // Dynamic filename
        link.click();
    } else {
        console.error('No canvas found to download.');
    }
});

document.getElementById('backToIndexButton').addEventListener('click', function () {
    window.location.href = 'index.html'; // Change to your index page path
});