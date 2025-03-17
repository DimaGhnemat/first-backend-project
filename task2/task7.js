const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let scores = [];
let counter = 1;

app.post('/scores', (req, res) => {
    const { player, score } = req.body;
    if (!player || score === undefined) {
        return res.status(400).json({ message: 'Player name and score are required' });
    }
    const newScore = { id: counter++, player, score };
    scores.push(newScore);
    res.status(201).json({ message: 'Score added successfully', score: newScore });
});

app.get('/scores', (req, res) => {
    const sortedScores = scores.sort((a, b) => b.score - a.score);
    res.json(sortedScores);
});

app.delete('/scores/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = scores.length;
    scores = scores.filter(score => score.id !== parseInt(id));
    if (scores.length === initialLength) {
        return res.status(404).json({ message: 'Score not found' });
    }
    res.json({ message: 'Score deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
