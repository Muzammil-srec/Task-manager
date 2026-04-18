document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    createTask(taskText, false);
    saveTask(taskText, false);

    input.value = "";
}

function createTask(text, completed) {
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="${completed ? 'completed' : ''}">${text}</span>
        <input type="text" class="edit-input" style="display:none;" />
        <div>
            <button onclick="toggleComplete(this)">✔️</button>
            <button onclick="startEdit(this)">✏️</button>
            <button onclick="saveEdit(this)" style="display:none;">💾</button>
            <button onclick="deleteTask(this)">🗑️</button>
        </div>
    `;

    document.getElementById("taskList").appendChild(li);
}
function startEdit(btn) {
    let li = btn.parentElement.parentElement;

    let span = li.querySelector("span");
    let input = li.querySelector(".edit-input");
    let saveBtn = li.querySelector("button:nth-child(3)");

    input.value = span.innerText;

    span.style.display = "none";
    input.style.display = "inline";

    btn.style.display = "none";      // hide edit
    saveBtn.style.display = "inline"; // show save

    input.focus();
}

function saveEdit(btn) {
    let li = btn.parentElement.parentElement;

    let span = li.querySelector("span");
    let input = li.querySelector(".edit-input");
    let editBtn = li.querySelector("button:nth-child(2)");

    span.innerText = input.value;

    span.style.display = "inline";
    input.style.display = "none";

    btn.style.display = "none";      // hide save
    editBtn.style.display = "inline"; // show edit

    updateStorage();
}
function deleteTask(btn) {
    let li = btn.parentElement.parentElement; // go to <li>
    let text = li.querySelector("span").innerText;

    li.remove(); // remove full task

    removeTaskFromStorage(text);
}
function toggleComplete(btn) {
    let li = btn.parentElement.parentElement;
    let span = li.querySelector("span");

    span.classList.toggle("completed");

    updateStorage();
}
function saveTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
}

function removeTaskFromStorage(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
    let allTasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").innerText;
        let completed = li.querySelector("span").classList.contains("completed");
        allTasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}