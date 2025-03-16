const express = require('express');
const app = express();
app.use(express.json());

let missions = [];
let idCounter = 1;

// Create a new space mission
app.post('/missions', (req, res) => {
    const { name, status } = req.body;
    const newMission = { id: idCounter++, name, status: status || 'Planned' };
    missions.push(newMission);
    res.status(201).json(newMission);
});

// Retrieve all missions
app.get('/missions', (req, res) => {
    res.json(missions);
});

// Retrieve a specific mission by ID
app.get('/missions/:id', (req, res) => {
    const mission = missions.find(m => m.id === parseInt(req.params.id));
    if (!mission) return res.status(404).json({ message: 'Mission not found' });
    res.json(mission);
});

// Update mission status
app.put('/missions/:id', (req, res) => {
    const mission = missions.find(m => m.id === parseInt(req.params.id));
    if (!mission) return res.status(404).json({ message: 'Mission not found' });
    mission.status = req.body.status || mission.status;
    res.json(mission);
});

// Cancel a mission
app.delete('/missions/:id', (req, res) => {
    missions = missions.filter(m => m.id !== parseInt(req.params.id));
    res.json({ message: 'Mission canceled' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});