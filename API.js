require('dotenv').config();
const express = require('express');
const app = express ();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Manager API is running');
});

const PORT = process.env.PORT || 3002

app.listen(PORT, () =>{
    console.log(`ÀPI is running on PORT ${PORT}`)
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ message: `Task with ID ${id} not found` });
    }

    res.status(204).send(); // Silent success
});
