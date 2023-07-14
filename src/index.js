import './style.css';
import {
  addTask, loadTasks, renderTasks,
} from './modules/todo.js';

loadTasks();
// Call renderTasks to initially render tasks
renderTasks();

// Get the input from user
const input = document.getElementById('todo');
const button = document.querySelector('.enter');

// Add event listeners for adding a task
button.addEventListener('click', () => {
  const description = input.value;
  if (description.trim() !== '') {
    addTask(description);
    input.value = '';
  }
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const description = input.value;
    if (description.trim() !== '') {
      addTask(description);
      input.value = '';
    }
  }
});