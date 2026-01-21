
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === "") {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;
    li.style.userSelect = "none"; 

    const span = document.createElement("span");
    span.textContent = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
    inputBox.focus();
}


addBtn.addEventListener("click", addTask);
addBtn.addEventListener("touchstart", addTask); 


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        
        if (e.target.classList.contains("checked")) {
            if (typeof confetti === "function") {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#582c58', '#A376A2', '#ffffff']
                });
            }
        }

        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


listContainer.addEventListener("touchstart", function (e) {
    if (e.target.tagName === "LI" || e.target.tagName === "SPAN") {
        e.target.click();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}


function showTask() {
    const data = localStorage.getItem("data");
    if (data) {
        listContainer.innerHTML = data;
    }
}

document.addEventListener("DOMContentLoaded", showTask);
