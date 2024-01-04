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

        // Automatically select the input field after adding a task
        taskInput.focus();
    }
}

// Function to complete a task
function completeTask(button) {
    const task = button.parentElement;
    task.classList.add('completed');
    alert("Good Job! :)");

    // Disable the button
    button.disabled = true;
    saveTasks(); // Save tasks to local storage
}

// Function to edit a task
function editTask(button) {
    const task = button.parentElement;

    // Check if the task is completed
    if (task.classList.contains('completed')) {
        button.disabled = true; // Task is completed, exit the function (disable the editing button)
        return;
    }

    const span = task.querySelector('span');
    const newTask = prompt('Edit this task:', span.textContent);

    if (newTask !== null) {
        span.textContent = newTask;
        saveTasks(); // Save tasks to local storage
    }
}

// Function to delete a task
function deleteTask(button) {
    const task = button.parentElement;
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    
    if (confirmDelete) {
        task.remove();
        saveTasks(); // Save tasks to local storage
    }
}
// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const container = document.querySelector('.container');
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');

    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        // Dark mode is enabled, change button text to moon
        toggleDarkModeButton.textContent = '🌝';
    } else {
        // Dark mode is disabled, change button text to sun
        toggleDarkModeButton.textContent = '🌚';
    }

    const taskElements = document.querySelectorAll('#taskList li');
    taskElements.forEach(task => task.classList.toggle('dark-mode'));

    saveTasks(); // Save dark mode state to local storage
}

// Load tasks when the page is loaded
loadTasks();

// Select the task input field on page load
window.onload = function() {
    const taskInput = document.getElementById('taskInput');
    taskInput.focus();
};
