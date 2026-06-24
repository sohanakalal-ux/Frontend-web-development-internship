const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskList =
    document.getElementById("taskList");

const themeToggle =
    document.getElementById("themeToggle");

const clock =
    document.getElementById("clock");

const date =
    document.getElementById("date");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const priority =
    document.getElementById("priority");

const searchInput =
    document.getElementById("searchInput");


// QUOTES

const quotes = [

    "Success starts with self discipline.",

    "Push yourself, because no one else will.",

    "Dream big. Work hard.",

    "Consistency creates results.",

    "Small steps every day matter."
];


// CLOCK

function updateClock() {

    const now = new Date();

    clock.innerText =
        now.toLocaleTimeString();

    date.innerText =
        now.toDateString();
}

setInterval(updateClock, 1000);

updateClock();


// RANDOM QUOTE

document.getElementById("quote").innerText =
    quotes[Math.floor(Math.random() * quotes.length)];


// ADD TASK

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTask();
    }
});


function addTask() {

    const text =
        taskInput.value.trim();

    if (text === "") {

        showToast("Please enter a task");

        return;
    }

    const li =
        document.createElement("li");

    li.classList.add("task");

    const priorityValue =
        priority.value;

    // PRIORITY CLASS

    if (priorityValue === "High") {

        li.classList.add("high");

    } else if (priorityValue === "Medium") {

        li.classList.add("medium");

    } else {

        li.classList.add("low");
    }

    li.innerHTML = `

        <div>

            <span>${text}</span>

            <small>
                (${priorityValue} Priority)
            </small>

        </div>

        <div class="task-buttons">

            <button class="complete-btn">
                ✔
            </button>

            <button class="delete-btn">
                ✖
            </button>

        </div>
    `;

    // COMPLETE

    li.querySelector(".complete-btn")
        .addEventListener("click", function () {

            li.classList.toggle("completed");

            updateProgress();

            saveTasks();

            showToast("Task Completed 🎉");

            createConfetti();
        });

    // DELETE

    li.querySelector(".delete-btn")
        .addEventListener("click", function () {

            li.remove();

            updateProgress();

            saveTasks();

            showToast("Task Deleted ❌");
        });

    taskList.appendChild(li);

    taskInput.value = "";

    updateProgress();

    saveTasks();

    showToast("Task Added Successfully ✅");
}


// PROGRESS

function updateProgress() {

    const tasks =
        document.querySelectorAll(".task");

    const completedTasks =
        document.querySelectorAll(".task.completed");

    if (tasks.length === 0) {

        progressFill.style.width = "0%";

        progressText.innerText =
            "0% Completed";

        return;
    }

    const percent =
        (completedTasks.length / tasks.length) * 100;

    progressFill.style.width =
        percent + "%";

    progressText.innerText =
        Math.round(percent) + "% Completed";
}


// DARK MODE

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.innerText = "☀";

    } else {

        themeToggle.innerText = "🌙";
    }
});


// FILTERS

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        document.querySelector(".active")
            .classList.remove("active");

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        const tasks =
            document.querySelectorAll(".task");

        tasks.forEach(task => {

            switch (filter) {

                case "completed":

                    task.style.display =
                        task.classList.contains("completed")
                            ? "flex"
                            : "none";

                    break;

                case "pending":

                    task.style.display =
                        !task.classList.contains("completed")
                            ? "flex"
                            : "none";

                    break;

                default:

                    task.style.display = "flex";
            }
        });
    });
});


// SEARCH

searchInput.addEventListener("keyup", function () {

    const value =
        searchInput.value.toLowerCase();

    const tasks =
        document.querySelectorAll(".task");

    tasks.forEach(task => {

        const text =
            task.innerText.toLowerCase();

        task.style.display =
            text.includes(value)
                ? "flex"
                : "none";
    });
});


// TOAST

function showToast(message) {

    const toast =
        document.createElement("div");

    toast.classList.add("toast");

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2000);
}


// LOCAL STORAGE

function saveTasks() {

    localStorage.setItem(
        "tasks",
        taskList.innerHTML
    );
}


function loadTasks() {

    taskList.innerHTML =
        localStorage.getItem("tasks") || "";

    reAttachEvents();
}

window.onload = loadTasks;


// REATTACH EVENTS

function reAttachEvents() {

    const tasks =
        document.querySelectorAll(".task");

    tasks.forEach(li => {

        li.querySelector(".complete-btn")
            .addEventListener("click", function () {

                li.classList.toggle("completed");

                updateProgress();

                saveTasks();
            });

        li.querySelector(".delete-btn")
            .addEventListener("click", function () {

                li.remove();

                updateProgress();

                saveTasks();
            });
    });

    updateProgress();
}


// CONFETTI

function createConfetti() {

    for (let i = 0; i < 30; i++) {

        const confetti =
            document.createElement("div");

        confetti.style.position = "fixed";

        confetti.style.width = "10px";

        confetti.style.height = "10px";

        confetti.style.background =
            `hsl(${Math.random()*360},100%,50%)`;

        confetti.style.left =
            Math.random() * window.innerWidth + "px";

        confetti.style.top = "-10px";

        confetti.style.borderRadius = "50%";

        confetti.style.zIndex = "9999";

        document.body.appendChild(confetti);

        let fall = 0;

        const interval = setInterval(() => {

            fall += 5;

            confetti.style.top =
                fall + "px";

            if (fall > window.innerHeight) {

                confetti.remove();

                clearInterval(interval);
            }

        }, 20);
    }
}