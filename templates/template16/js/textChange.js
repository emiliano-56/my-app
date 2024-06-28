document.addEventListener('DOMContentLoaded', function () {
    const dynamicWords = ["Unforgettable", "Possible", "Memorable", "Extraordinary", "Remarkable", "Spectacular"]; // Array of words to alternate

    let index = 0; // Initial index of the dynamicWords array
    const dynamicWordElement = document.getElementById('change'); // <i> element for dynamic word

    setInterval(function () {
        // Update <i> element text content with current word
        dynamicWordElement.textContent = dynamicWords[index];

        // Increment index for next word (loop through dynamicWords array)
        index = (index + 1) % dynamicWords.length;
    }, 3000); // Interval in milliseconds (2000ms = 2 seconds)
});