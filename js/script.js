const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.todo-filter')

document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);


function addTodo(event){
    console.log('hello');
    event.preventDefault();

    // Create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");


     // Create LI
     const newTodo = document.createElement('li');
     newTodo.innerText =  todoInput.value;
     newTodo.classList.add("todo-item");
     todoDiv.appendChild(newTodo);
     saveLocalTodos(todoInput.value);

     const CompletedButton = document.createElement("button");
     CompletedButton.innerHTML = '<i class = "fas fa-check"></i>';
     CompletedButton.classList.add("complete-btn");
     todoDiv.appendChild(CompletedButton);

     const trashButton = document.createElement("button");
     trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);

     todoList.appendChild(todoDiv);

     todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0]=== 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }


        if(item.classList[0]=== 'complete-btn'){
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
}

function filterTodo(e){
    const todos = [...todoList.children];
    todos.forEach(function(todo,index){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
             case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
                    case "uncompleted":
                        if(!todo.classList.contains("completed")) {
                            todo.style.display = "flex";
                        }
                        else {
                            todo.style.display = "none";
                        }
                        break;
        }
    })
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodos(){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    
         const todoDiv = document.createElement('div');
         todoDiv.classList.add("todo");

         const newTodo = document.createElement('li');
         newTodo.innerText =  todo;
         newTodo.classList.add("todo-item");
         todoDiv.appendChild(newTodo);
    
         const CompletedButton = document.createElement("button");
         CompletedButton.innerHTML = '<i class = "fas fa-check"></i>';
         CompletedButton.classList.add("complete-btn");
         todoDiv.appendChild(CompletedButton);
    
         const trashButton = document.createElement("button");
         trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
         trashButton.classList.add("trash-btn");
         todoDiv.appendChild(trashButton);
    
         todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}