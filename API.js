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

const PORT = process.env.PORT || 3002

app.listen(PORT, () =>{
    console.log(`ÀPI is running on PORT ${PORT}`)
});
