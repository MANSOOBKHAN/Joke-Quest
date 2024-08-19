document.getElementById('comedy-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const input = document.getElementById('input').value; // Get user input
    const resultDiv = document.getElementById('result'); // Where we’ll display the joke

    try {
        // Fetch a joke from JokeAPI
        const response = await fetch(`/api/generate-comedy?topic=${encodeURIComponent(input)}`);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the JSON data

        // Display the joke
        if (data.joke) {
            resultDiv.textContent = data.joke;
        } else {
            resultDiv.textContent = 'No joke found for this topic.';
        }
    } catch (error) {
        // Handle errors
        resultDiv.textContent = 'Failed to fetch joke. Please try again.';
    }
});
