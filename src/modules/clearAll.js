import {
  tasks, updateIndexes, saveTasks, renderTasks,
} from './todo.js';

const clearCompletedButton = document.querySelector('.complete');
clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  updateIndexes();
  saveTasks();
  renderTasks();
});