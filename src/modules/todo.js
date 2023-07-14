let tasks = [];

// Function to update the indexes of tasks
const updateIndexes = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

// Function to save tasks in local storage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to load tasks from local storage
const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  return tasks;
};

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateIndexes();
  saveTasks();
};

// Function to edit a task
const editTask = (index, newDescription) => {
  tasks[index].description = newDescription;
  saveTasks();
  // eslint-disable-next-line no-use-before-define
  renderTasks();
};
// Function to render tasks
const renderTasks = () => {
  const taskList = document.getElementById('task-container');
  taskList.innerHTML = '';

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

    span.addEventListener('click', () => {
      if (task.completed) {
        return; // to skip editing if task is checked
      }

      // Create input field for editing
      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.description;

      input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default behavior of the Enter key
          const newDescription = input.value.trim();
          if (newDescription !== '') {
            try {
              editTask(index, newDescription);
              span.textContent = newDescription;
              li.replaceChild(span, input); // Replace span with input
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('Error occurred while editing task:', error);
            }
          }
        }
      });

      input.addEventListener('blur', () => {
        const newDescription = input.value.trim();
        if (newDescription !== '') {
          editTask(index, newDescription);
          span.textContent = newDescription;
          li.replaceChild(taskDiv, input);
        }
      });

      li.replaceChild(input, span);
      input.focus();
    });

    li.appendChild(check);
    li.appendChild(taskDiv);
    li.appendChild(span);

    taskList.appendChild(li);
  });
};

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

export {
  addTask,
  deleteTask,
  editTask,
  loadTasks,
  renderTasks,
};