const express = require("express");
const app = express();
app.use(express.json());

let missions = [
    {
        id: "1",
        missionName: "Able 1",
        astronaut: ["Omar", "Joseph M. Acaba", "Loren Acton"],
        progress: 34,
    },
    {
        id: "2",
        missionName: "Apollo 11",
        astronaut: ["Omar", "Ali AlQarni", "Yuri Artyukhin"],
        progress: 100,
    },
    {
        id: "3",
        missionName: "Airs",
        astronaut: ["Omar"],
        progress: 90,
    }
];

let idCounter = 4; 


app.post("/missions", (req, res) => {
    const { missionName, astronaut, progress } = req.body;
    const newMission = { id: idCounter++.toString(), missionName, astronaut, progress };
    missions.push(newMission);
    res.status(201).json(newMission);
});


app.get("/missions", (req, res) => {
    res.json(missions);
});


app.get("/missions/:id", (req, res) => {
    const mission = missions.find(m => m.id === req.params.id);
    if (!mission) return res.status(404).json({ message: "Mission not found" });
    res.json(mission);
});


app.put("/missions/:id", (req, res) => {
    const mission = missions.find(m => m.id === req.params.id);
    if (!mission) return res.status(404).json({ message: "Mi