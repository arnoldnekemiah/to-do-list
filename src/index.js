import './style.css';

// Array object of tasks
const tasks = [
  {
    description: 'Play Chess',
    completed: false,
    index: 1,
  },
  {
    description: 'Sleep',
    completed: false,
    index: 2,
  },
  {
    description: 'Code',
    completed: false,
    index: 3,
  },
];

const rendertasks = () => {
  const taskList = document.getElementById('task-container');
  taskList.innerHTML = '';
  // sort tasks by index
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
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

window.addEventListener('load', rendertasks);