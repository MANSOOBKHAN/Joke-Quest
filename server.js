const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, )));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'C:\Users\sarosh mansoob khan\Desktop\intershala assignment\index.html'));
});

// API endpoint to get a joke
app.get('/api/generate-comedy', async (req, res) => {
    const topic = req.query.topic;

    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any', {
            params: {
                type: 'single',
                contains: topic
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch joke' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
