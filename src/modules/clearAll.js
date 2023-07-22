import {
  tasks, updateIndexes, saveTasks,
} from './todo.js';
import renderTasks from './renderTasks.js';

const clearCompletedButton = document.querySelector('.complete');
clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  updateIndexes();
  saveTasks();
  renderTasks();
});