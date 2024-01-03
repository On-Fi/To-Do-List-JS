// add a task Function
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${taskInput.value}</span>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="editTask(this)">Edit</button>
        `;
        taskList.appendChild(newTask);
        taskInput.value = '';
    }
}

// tick a task function
function completeTask(button) {
    const task = button.parentElement;
    task.classList.toggle('completed');
}

// edit a task fuction
function editTask(button) {
    const task = button.parentElement;
    const span = task.querySelector('span');
    const newTask = prompt('Edit task:', span.textContent);

    if (newTask !== null) {
        span.textContent = newTask;
    }
}
