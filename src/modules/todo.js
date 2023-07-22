// eslint-disable-next-line import/no-mutable-exports
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

export {
  tasks,
  updateIndexes,
  saveTasks,
  loadTasks,
};
