const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

const currentDayMonth = document.querySelector(".currentDayMonth");
const currentYearCompleted = document.querySelector(".currentYear");

const currentDate = new Date();
const currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const body = document.querySelector('body');
const darkMode = document.querySelector(".buttonDark");
const iconMode = document.querySelector(".iconMode");

switch (currentMonth) {
    case 1:
        currentMonth = ('Janeiro');
        break;
    case 2:
        currentMonth = ('Fevereiro');
        break;
    case 1:
        currentMonth = ('Março');
        break;
    case 1:
        currentMonth = ('Abril');
        break;

    case 5:
        currentMonth = ('Maio');
        break;
    case 6:
        currentMonth = ('Junho');
        break;
    case 7:
        currentMonth = ('Julho');
        break;
    case 8:
        currentMonth = ('Agosto');
        break;
    case 9:
        currentMonth = ('Setembro');
        break;
    case 10:
        currentMonth = ('Outubro');
        break;
    case 11:
        currentMonth = ('Novembro');
        break;
    case 12:
        currentMonth = ('Dezembro');
        break;
}

currentDayMonth.innerHTML = `${currentDay} de ${currentMonth}`;
currentYearCompleted.innerHTML = `${currentYear}`;

const onDarkMode = () => {
    body.classList.toggle("darkMode");
    iconMode.classList.toggle("fa-moon")
    iconMode.classList.toggle("fa-sun")
}

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash");
    deleteItem.classList.add("delete-task-button");

    deleteItem.addEventListener("click", () =>
        handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();
};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [...tasks].map((task) => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");

        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

    if (!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");

        const taskContent = document.createElement("p");
        taskContent.innerText = task.description;

        if (task.isCompleted) {
            taskContent.classList.add("completed");
        }

        taskContent.addEventListener("click", () => handleClick(taskContent));

        const deleteItem = document.createElement("i");
        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash");
        deleteItem.classList.add("delete-task-button");

        deleteItem.addEventListener("click", () =>
            handleDeleteClick(taskItemContainer, taskContent)
        );

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);

        tasksContainer.appendChild(taskItemContainer);
    }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());
