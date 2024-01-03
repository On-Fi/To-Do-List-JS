// Function to load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        const newTask = createTaskElement(task.text, task.completed);
        document.getElementById('taskList').appendChild(newTask);
    });
}

// Function to save tasks to local storage
function saveTasks() {
    const taskElements = document.querySelectorAll('#taskList li');
    const tasks = Array.from(taskElements).map(task => ({
        text: task.querySelector('span').textContent,
        completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task element
function createTaskElement(taskText, completed) {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <span>${taskText}</span>
        <button onclick="completeTask(this)" id="completeBtn">✅</button>
        <button onclick="editTask(this)" id="editBtn">✏️</button>
        <button onclick="deleteTask(this)" id="deleteBtn">❌</button>
    `;
    if (completed) {
        newTask.classList.add('completed');
    }
    return newTask;
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const newTask = createTaskElement(taskInput.value);
        taskList.appendChild(newTask);
        taskInput.value = '';
        saveTasks(); // Save tasks to local storage
    }
}

// Function to complete a task
function completeTask(button) {
    const task = button.parentElement;
    task.classList.toggle('completed');
    saveTasks(); // Save tasks to local storage
}

// Function to edit a task
function editTask(button) {
    const task = button.parentElement;
    const span = task.querySelector('span');
    const newTask = prompt('Edit task:', span.textContent);

    if (newTask !== null) {
        span.textContent = newTask;
        saveTasks(); // Save tasks to local storage
    }
}

// Function to delete a task
function deleteTask(button) {
    const task = button.parentElement;
    task.remove();
    saveTasks(); // Save tasks to local storage
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    const taskElements = document.querySelectorAll('#taskList li');
    taskElements.forEach(task => task.classList.toggle('dark-mode'));
    saveTasks(); // Save dark mode state to local storage
}

// Load tasks when the page is loaded
loadTasks();
