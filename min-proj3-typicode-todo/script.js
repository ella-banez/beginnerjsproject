const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

//DOM Element
const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoItem = document.getElementsByClassName('todo');
const inputField = document.getElementById('add-task');

//Audio
const addAudio = document.getElementById('audio-add');
const completeAudio = document.getElementById('audio-complete');
const deleteAudio = document.getElementById('audio-delete');


const getTodos = () => {
  fetch(apiUrl + '?_limit=10')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((todo) => addTodoToDOM(todo));
  });
  console.log(completeAudio);
  console.log(deleteAudio);
};

const addTodoToDOM = (todo) => {
  //Create todo div
  const div = document.createElement('div');
  div.classList.add ('todo');

  //Create checkbox icon
  const checkIcon = document.createElement('i');
  checkIcon.classList.add('fa-regular', 'fa-circle-check');

  //Create delete icon
  const delIcon = document.createElement('i');
  delIcon.classList.add('fa-solid','fa-trash-can');

  //Add to DOM
  div.appendChild(checkIcon);
  div.appendChild(document.createTextNode(todo.title));
  div.appendChild(delIcon);
 
  // todoList.appendChild(div);
  todoList.insertBefore(div, todoList.firstElementChild);
};

const createTodo = (e) => {
  e.preventDefault();

  const newTodo = inputField.value;

  if (newTodo !== ''){
    
    const task = {
      title: newTodo,
      compeleted: false,
    };
    
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => addTodoToDOM(data));
      
      setTimeout(function() {
        addAudio.play();
      }, 1000)
        
        
      
  } else {
    alert("Please add a task!");
  }

  todoForm.reset(); 
  inputField.focus();

};



const toggleCompleted = (e) => {
  
  if (e.target.classList.contains('todo')){
    e.target.classList.toggle('done');
    e.target.firstElementChild.classList.toggle('fa-solid');
    e.target.firstElementChild.classList.toggle('fa-regular');

    updateTodo(e.target.dataset.id, e.target.classList.contains('done'));

  } else if (e.target.classList.contains('fa-circle-check')){
    e.target.classList.toggle('fa-solid');
    e.target.classList.toggle('fa-regular');
    e.target.parentElement.classList.toggle('done');
  
    updateTodo(e.target.parentElement.dataset.id, e.target.parentElement.classList.contains('done'));
  }
  
};

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const deleteTodo = (e) => {
    const id = e.target.parentElement.dataset.id;
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
    .then((res) => res.json())
    .then(() => e.target.parentElement.remove());

    
};

function onClickTodo(e) {

  if (e.target.classList.contains('fa-trash-can')) {
    deleteTodo(e);
    deleteAudio.play();
  } else {
    toggleCompleted(e);
    completeAudio.play();
    
  }
}

const init = () => {
  document.addEventListener('DOMContentLoaded', getTodos);
  todoForm.addEventListener('submit', createTodo);
  todoList.addEventListener('click', onClickTodo);
};

init();
