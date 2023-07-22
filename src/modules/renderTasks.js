import { tasks, saveTasks } from './todo.js';
import deleteTask from './delete.js';

const renderTasks = () => {
  const taskList = document.getElementById('task-container');
  taskList.innerHTML = '';

  // Function to edit a task
  const editTask = (index, newDescription) => {
    tasks[index].description = newDescription;
    saveTasks();
    renderTasks();
  };
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    task.index = index + 1;
    const li = document.createElement('li');
    li.classList = 'listItems';

    // Create checkbox
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.completed;
    check.addEventListener('change', () => {
      task.completed = check.checked;
      saveTasks();
      renderTasks();
    });
    check.classList.add('checker');

    // Create div for task description and icons
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-info');

    if (task.completed) {
      // Task is checked, replace ellipsis with trash icon
      const trash = document.createElement('i');
      trash.classList.add('fas', 'fa-trash');
      trash.addEventListener('click', () => {
        deleteTask(index);
        saveTasks();
        renderTasks();
      });

      taskDiv.appendChild(trash);
    } else {
      // Task is not checked, show ellipsis icon
      const ellipsis = document.createElement('i');
      ellipsis.classList.add('fas', 'fa-ellipsis-v');
      ellipsis.setAttribute('aria-hidden', 'true');

      taskDiv.appendChild(ellipsis);
    }

    // Create task description span
    const span = document.createElement('span');
    span.textContent = task.description;

    // Create input field for editing
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.description;
    input.style.display = 'none';

    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior of the Enter key
        const newDescription = input.value.trim();
        if (newDescription !== '') {
          editTask(index, newDescription);
          span.textContent = newDescription;
          input.style.display = 'none';
          span.style.display = 'block';// Replace span with input
        }
      }
    });

    span.addEventListener('click', () => {
      if (task.completed) {
        return; // to skip editing if task is checked
      }
      input.style.display = 'block';
      span.style.display = 'none';

      input.focus();
    });

    li.appendChild(check);
    li.appendChild(taskDiv);
    li.appendChild(span);
    li.appendChild(input);

    taskList.appendChild(li);
  });
};

export default renderTasks;