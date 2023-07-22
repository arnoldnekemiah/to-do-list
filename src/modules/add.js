import { tasks, saveTasks } from './todo.js';
import renderTasks from './renderTasks.js';

// Function to add a new task
const addTask = (description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
};

export default addTask;