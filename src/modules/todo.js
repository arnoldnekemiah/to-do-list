let tasks = [];

// Function to update the indexes of tasks
const updateIndexes = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
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
  // eslint-disable-next-line no-use-before-define
  saveTasks();
  // eslint-disable-next-line no-use-before-define
  renderTasks();
};

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateIndexes();
  // eslint-disable-next-line no-use-before-define
  saveTasks();
  // eslint-disable-next-line no-use-before-define
  renderTasks();
};

// Function to edit a task
const editTask = (index, newDescription) => {
  tasks[index].description = newDescription;
  // eslint-disable-next-line no-use-before-define
  saveTasks();
  // eslint-disable-next-line no-use-before-define
  renderTasks();
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

// Function to render tasks
const renderTasks = () => {
  const taskList = document.getElementById('task-container');
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    task.index = index + 1;
    const li = document.createElement('li');
    li.classList = 'listItmes';
    const check = document.createElement('input');
    check.type = 'checkbox';
    const span = document.createElement('span');
    span.textContent = task.description;
    li.appendChild(check);
    li.appendChild(span);
    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa', 'fa-ellipsis-v');
    ellipsis.setAttribute('aria-hidden', 'true');
    li.appendChild(ellipsis);
    taskList.appendChild(li);
  });
};

export {
  addTask, deleteTask, editTask, saveTasks, loadTasks, renderTasks,
};
