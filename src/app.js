const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasksData = { tasks: [] };

// Read tasks from file and parse to JSON
fs.readFile('./tasks.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    tasksData = JSON.parse(data);
  }
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasksData.tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasksData.tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasksData.tasks.length + 1,
    description: req.body.description,
    flag: false
  };
  tasksData.tasks.push(newTask);
  const data = JSON.stringify(tasksData, null, 2);
  fs.writeFile('./tasks.json', data, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to create task' });
    }
    console.log("Created the task successfully")
    res.status(201).json(newTask);
  });
});

// Update an existing task
app.put('/tasks/:id', (req, res) => {
  const task = tasksData.tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.description = req.body.description || task.description;
  task.flag = req.body.flag || task.flag;
  const data = JSON.stringify(tasksData, null, 2);
  fs.writeFile('./tasks.json', data, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update task' });
    }
    console.log("Updated the task successfully")
    res.json(task);
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasksData.tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasksData.tasks.splice(taskIndex, 1);
  const data = JSON.stringify(tasksData, null, 2);
  fs.writeFile('./tasks.json', data, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete task' });
    }
    console.log("Deleted the task successfully")
    res.json({ message: 'Task deleted' });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Task Maanger API Running`));

