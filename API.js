require('dotenv').config();
const express = require('express');
const app = express ();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Manager API is running');
});


// Get all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks); // Send array as JSON
});

//Get single task
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({error: "Task not found"});
    };
    res.json(task)
});

const PORT = process.env.PORT || 3002

app.listen(PORT, () =>{
    console.log(`ÀPI is running on PORT ${PORT}`)
});
