require('dotenv').config();
const express = require('express');
const app = express ();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Manager API is running');
});


// To update an existing task
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  // this would show the data in the console
  console.log("Task updated:", { id, title, description });
  res.json({ id, title, description });
});

// To update an existing Status
app.patch("/tasks/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  
  const task = tasks.find( (t) => t.id === id)

  if (!task) {
    return res.status(400).json({ error: "Task not found" });
  }else if (!status){
    return res.status(400).json({ error: "Status is required" });
  }else
    // this would show the data in the console
    console.log("Task status updated:", { id, status });
    res.json({ id, status });
});

// Toggle Status
app.patch("/tasks/:id/toggle", (req, res) => {
  const { id } = req.params;

  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // this will toggle the status of the task between 'pending' and 'completed'
  task.status = task.status === 'pending' ? 'completed' : 'pending';

  // this would show the data in the console
  console.log("Task toggled:", { task });
  res.json({ task });
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
