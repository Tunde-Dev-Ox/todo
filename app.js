const form = document.querySelector('.input-wrapper');
const formInput = document.querySelector('.todo-input');
const todoContainer = document.querySelector('.todo-wrapper');
const deleteTask = document.querySelector('.todo-wrapper button');
const statusWrapper = document.querySelector('.status-wrapper');
const total = document.querySelector('#total');
const remaining = document.querySelector('#remaining');
const completed = document.querySelector('#completed');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

if (localStorage.getItem('tasks')) {
    tasks.map(element => {
        statusWrapper.classList.add('display');
        createTask(element);
        countTask(tasks);
    });
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = formInput.value;
    if (!input.trim()) {
        return; 
    } 
    let task = {
        name: input,
        id: new Date().getTime(),
        isComplete: false,
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTask(task);
    countTask(tasks);
    formInput.value = " ";
});


function createTask(t)  {
    const task = document.createElement('li');
    task.classList.add('todo');
    task.setAttribute('id', t.id);
    if(t.isComplete) {
        task.classList.add('complete');
    }
    const taskElement = `
    <div class="todo-innerwrapper">
        <div class="task-input-wrapper">
            <input type="checkbox" name="select-task" id="${t.id}" class="task-input" ${t.isComplete ? 'checked' : ''}>
            <p class="task-text" contenteditable="">${t.name}</p>
        </div>
        <button type="button" title="delete ${t.name}">
        ✖
        </button>
    </div>`;
    task.innerHTML = taskElement;
    todoContainer.appendChild(task);
    statusWrapper.classList.add('display');

    const checkBox =task.querySelector('.task-input');
    checkBox.addEventListener('change', (e) => {
        const clickedBox = e.currentTarget;
        if(clickedBox.id === clickedBox.closest('li').id) {
            clickedBox.closest('li').classList.toggle('complete');
            const taskIndex = tasks.findIndex(function(task) {
                return task.id == clickedBox.closest('li').id;
            })
            // taskIndex.isComplete === true;
            tasks[taskIndex].isComplete = clickedBox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        countTask(tasks)
    })

    const deleteTask = task.querySelector('button');
    deleteTask.addEventListener('click', (e) => {
        const clickedDel = e.currentTarget;
        const taskId = tasks.findIndex(function(task) {
            return task.id == clickedDel.closest('li').id;
        })
        if(taskId != -1) {
            tasks.splice(taskId, 1);
            clickedDel.closest('li').remove();
            countTask(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    })
}

 
function countTask(t) {
    const totalTask = t.length;
    total.textContent = totalTask;
    const completedTask = t.filter(task => task.isComplete).length;
    completed.textContent = completedTask;
    const remainingTask = totalTask - completedTask;
    remaining.textContent = remainingTask;
}

