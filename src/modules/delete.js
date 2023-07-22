import { tasks, updateIndexes, saveTasks } from './todo.js';

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateIndexes();
  saveTasks();
};

export default deleteTask;