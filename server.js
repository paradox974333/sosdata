// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// In-memory store for SOS requests
let sosRequests = [];

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint to receive SOS data
app.post('/api/sos', (req, res) => {
  const { userId, latitude, longitude } = req.body;
  // Store SOS request with timestamp
  sosRequests.push({ userId, latitude, longitude, timestamp: new Date() });
  res.status(200).send('SOS received');
});

// Endpoint to get latest SOS data
app.get('/api/sos', (req, res) => {
  if (sosRequests.length === 0) {
    return res.status(404).json({ message: 'No SOS data found' });
  }

  // Sort SOS requests by timestamp to get the latest
  sosRequests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const latestSOS = sosRequests[0];
  res.status(200).json(latestSOS);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
