const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // Ensure you have node-fetch version 2

const app = express();
const PORT = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to get a joke from the JokeAPI based on the topic
app.get('/joke', async (req, res) => {
    const topic = req.query.topic || 'Programming'; // Default to 'Programming' if no topic is provided
    try {
        const response = await fetch(`https://v2.jokeapi.dev/joke/${topic}?type=single`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const joke = await response.json();
        if (joke.error) {
            res.status(404).json({ error: 'Joke not found' });
        } else {
            res.json(joke);
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Failed to fetch joke' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
