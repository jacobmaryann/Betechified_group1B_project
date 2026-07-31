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

//in memory task array
let tasks = [
  { id: 1, title: 'Go groceries shopping', description: 'bread, eggs, tomatoes', status: 'Completed' },
  { id: 2, title: 'Prepare dinner', description: 'Rice, Stew, Turkey', status: 'Pending' },
];

app.get('/', (req, res) => {
    res.send('Task Manager API is running');
});

// To create new task
app.post('/tasks', (req, res) => {
    const {title} = req.body
    if (!title) {
        return res.status(400).json({error: "Title is required"});// Validation
    };
    const newTask = {id: tasks.length +1, ...req.body};
    tasks.push(newTask);
    res.status(201).json(newTask);
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
