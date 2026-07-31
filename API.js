require('dotenv').config();
const express = require('express');
const app = express ();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Manager API is running');
});

// To create a new task
app.post('/tasks', (req, res) => {
    const { task }= req.body
    const newTask = {
        id : task.length + 1,
        task : task,
        completed : "pending",
    }

    if(!task){
        return 
        res.status(404).json({error: 'Task needed'})
    }else 
        task.push(newTask)
        res.status(201).json(newTask);
})

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

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

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

const PORT = process.env.PORT || 3002

app.listen(PORT, () =>{
    console.log(`ÀPI is running on PORT ${PORT}`)
});
