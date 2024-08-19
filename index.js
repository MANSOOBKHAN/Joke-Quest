document.addEventListener('DOMContentLoaded', () => {
    const jokeElement = document.getElementById('joke');
    const topicSelect = document.getElementById('topic');
    const fetchButton = document.getElementById('fetchJoke');

    fetchButton.addEventListener('click', () => {
        const topic = topicSelect.value;
        fetch(`/joke?topic=${topic}`)
            .then(response => response.json())
            .then(data => {
                // Display the joke or an error message
                if (data.joke) {
                    jokeElement.textContent = data.joke;
                } else if (data.setup && data.punchline) {
                    jokeElement.textContent = `${data.setup} - ${data.punchline}`;
                } else {
                    jokeElement.textContent = 'No joke available for this topic';
                }
            })
            .catch(error => {
                console.error('Error fetching joke:', error);
                jokeElement.textContent = 'Failed to fetch joke';
            });
    });
});
