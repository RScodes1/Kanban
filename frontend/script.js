let kanbanContainer = document.getElementById("kanban-container");
let addBoardBtn = document.getElementById("add-board-btn");
let modal = document.getElementById("modal");
let closeBtn = document.getElementsByClassName("close")[0];

addBoardBtn.onclick = function() {
  let board = createBoard();
  kanbanContainer.appendChild(board);
};

closeBtn.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function createBoard() {
  let board = document.createElement("div");
  board.classList.add("board");

  let todoColumn = createColumn("Todo");
  let doingColumn = createColumn("Doing");
  let doneColumn = createColumn("Done");

  board.appendChild(todoColumn);
  board.appendChild(doingColumn);
  board.appendChild(doneColumn);

  let addTaskBtn = document.createElement("button");
  addTaskBtn.innerText = "Add New Task";
  addTaskBtn.onclick = function() {
    modal.style.display = "block";
  };

  board.appendChild(addTaskBtn);

  return board;
}

function createColumn(title) {
  let column = document.createElement("div");
  column.classList.add("column");
  
  let header = document.createElement("h2");
  header.innerText = title;
  column.appendChild(header);

  let tasks = document.createElement("div");
  tasks.classList.add("tasks");
  column.appendChild(tasks);

  return column;
}

document.getElementById("create-task-btn").onclick = function() {
  let taskName = document.getElementById("task-name").value;
  let description = document.getElementById("description").value;
  let subtasks = Array.from(document.getElementsByClassName("subtask-input")).map(input => input.value);
  let status = document.getElementById("status").value;

  let task = document.createElement("div");
  task.classList.add("task");
  task.innerHTML = `
    <h3>${taskName}</h3>
    <p>${description}</p>
    <ul>${subtasks.map(subtask => `<li>${subtask}</li>`).join("")}</ul>
  `;

  let tasksContainer;
  switch(status) {
    case "todo":
      tasksContainer = document.querySelector(".board .column:nth-child(1) .tasks");
      break;
    case "doing":
      tasksContainer = document.querySelector(".board .column:nth-child(2) .tasks");
      break;
    case "done":
      tasksContainer = document.querySelector(".board .column:nth-child(3) .tasks");
      break;
    default:
      break;
  }

  tasksContainer.appendChild(task);
  modal.style.display = "none";
};

document.getElementById("add-subtask-btn").onclick = function() {
  let subtasksContainer = document.getElementById("subtasks-container");
  let subtaskInput = document.createElement("input");
  subtaskInput.type = "text";
  subtaskInput.classList.add("subtask-input");
  subtasksContainer.appendChild(subtaskInput);
};

// Function to open task modal

function openTaskModal(taskElement) {
    let taskName = taskElement.querySelector("h3").innerText;
    let description = taskElement.querySelector("p").innerText;
    let subtasks = Array.from(taskElement.querySelectorAll("ul li")).map(li => li.innerText);
    let status = taskElement.parentNode.querySelector("h2").innerText.toLowerCase();
  
    document.getElementById("modal-task-name").innerText = taskName;
    document.getElementById("modal-description").innerText = description;
  
    let subtasksContainer = document.getElementById("modal-subtasks-container");
    subtasksContainer.innerHTML = "";
    subtasks.forEach(subtask => {
      let subtaskDiv = document.createElement("div");
      subtaskDiv.innerHTML = `
        <label>
          <input type="checkbox" ${subtask.includes("completed") ? "checked" : ""}> ${subtask.replace("completed", "")}
        </label>
      `;
      subtasksContainer.appendChild(subtaskDiv);
    });
  
    let statusSelect = document.getElementById("modal-status");
    statusSelect.value = status;
  
    modal.style.display = "block";
  
    document.getElementById("update-task-btn").onclick = function() {
      let newStatus = statusSelect.value;
      let newSubtasks = Array.from(subtasksContainer.querySelectorAll("input")).map(input => {
        return input.checked ? input.nextSibling.textContent.trim() + " completed" : input.nextSibling.textContent.trim();
      });
  
      let newTasksContainer;
      switch(newStatus) {
        case "todo":
          newTasksContainer = document.querySelector(".board .column:nth-child(1) .tasks");
          break;
        case "doing":
          newTasksContainer = document.querySelector(".board .column:nth-child(2) .tasks");
          break;
        case "done":
          newTasksContainer = document.querySelector(".board .column:nth-child(3) .tasks");
          break;
        default:
          break;
      }
  
      let newTask = document.createElement("div");
      newTask.classList.add("task");
      newTask.innerHTML = `
        <h3>${taskName}</h3>
        <p>${description}</p>
        <ul>${newSubtasks.map(subtask => `<li>${subtask}</li>`).join("")}</ul>
      `;
  
      newTasksContainer.appendChild(newTask);
      taskElement.remove();
      modal.style.display = "none";
    };
  }
  
  // Add onclick event to each task
  document.querySelectorAll(".task").forEach(task => {
    task.onclick = function() {
      openTaskModal(task);
    };
  });
  

  const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});

signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(signinForm);
  const userData = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});

