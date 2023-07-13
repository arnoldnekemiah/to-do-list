import './style.css';
import { renderTasks, loadTasks } from './modules/todo.js';

loadTasks();
// Call renderTasks to initially render tasks
renderTasks();