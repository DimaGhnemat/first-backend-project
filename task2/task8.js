const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

app.post('/games', async (req, res) => {
    const { title, genre, condition } = req.body;
    if (!title || !genre || !condition) {
        return res.status(400).json({ message: 'Title, genre, and condition are required' });
    }
    const newGame = await prisma.game.create({ data: { title, genre, condition } });
    res.status(201).json(newGame);
});

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany();
    res.json(games);
});

app.get('/games/:id', async (req, res) => {
    const { id } = req.params;
    const game = await prisma.game.findUnique({ where: { id: parseInt(id) } });
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
});

app.put('/games/:id', async (req, res) => {
    const { id } = req.params;
    const { title, genre, condition } = req.body;
    const updatedGame = await prisma.game.update({
        where: { id: parseInt(id) },
        data: { title, genre, condition },
    });
    res.json(updatedGame);
});

app.delete('/games/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.game.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Game deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
