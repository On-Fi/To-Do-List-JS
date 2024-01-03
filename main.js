// add a task Function
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${taskInput.value}</span>
            <button onclick="completeTask(this)">Complete</button>
        `;
        taskList.appendChild(newTask);
        taskInput.value = '';
    }
}

// tick task function
function completeTask(button) {
    const task = button.parentElement;
    task.classList.toggle('completed');
}
