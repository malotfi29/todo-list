// let todos = [];
let filterValue = "all";
let editId=0;
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
const backdrop = document.querySelector(".backdrop");
const editTodo = document.querySelector(".edit-todo");
const editInput = document.querySelector(".edit-todo__input");
const editBtn = document.querySelector(".edit-btn");
const editClose = document.querySelector(".close-edit");
const editForm = document.querySelector(".edit-todo__form");

//Evants
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
editClose.addEventListener("click", () => {
  editTodo.classList.add("hidden");
  backdrop.classList.add("hidden");
});
editForm.addEventListener("submit", editedTodo);

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodo(todos);
});

//functions
function addNewTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return null;
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  saveTodo(newTodo);
  filterTodos();
}

function createTodo(todos) {
  let result = "";
  // let todos=getAllTodos();

  todos.forEach((todo) => {
    result += `<li class="todo">
        <p class="todo__title ${todo.isCompleted && "completed"}">${
      todo.title
    }</p>
        <span class="todo__createdAt">${new Date(
          todo.createdAt
        ).toLocaleDateString("fa-IR")}</span>
        <button class="todo__edit" data-todo-id=${todo.id}>
        <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="todo__check" data-todo-id=${todo.id}>
          <i class="far fa-check-square"></i>
        </button>
        <button class="todo__remove" data-todo-id=${todo.id}>
          <i class="far fa-trash-alt"></i>
        </button>
        
      </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";
  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((checkBtn) =>
    checkBtn.addEventListener("click", checkTodo)
  );

  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((removeBtn) =>
    removeBtn.addEventListener("click", removeTodo)
  );
  const dropBtns = [...document.querySelectorAll(".todo__edit")];
  dropBtns.forEach((dropBtn) => {
    dropBtn.addEventListener("click", dropTodo);
  });
}

function filterTodos(e) {
  // const filter = e.target.value;
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      createTodo(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((todo) => todo.isCompleted);
      createTodo(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((todo) => !todo.isCompleted);
      createTodo(filteredTodos);
      break;
    }
    default:
      createTodo(todos);
  }
}

function removeTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}
function dropTodo(e) {
  const todos = getAllTodos();
  editTodo.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  editId = Number(e.target.dataset.todoId);
  const todo = todos.
  find((t) => t.id === editId);
  
  editInput.value=todo.title;
  
}
function editedTodo(){
  const todos = getAllTodos();
  const todo = todos.
  find((t) => t.id === editId);
  
  todo.title = editInput.value;
  saveAllTodos(todos);
  filterTodos();
}

//LOCAL STORAGE

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
