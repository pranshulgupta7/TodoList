let todos = [];
let todolist;
let todoinput;

$(document).ready(function () {
    let btnadd = $('#btn-add')
    todolist = $('#todo-list')
    let btndelete = $('#btn-delete')

    todoinput = $('#todo-input')
    refreshTodos(true)

    btnadd.click(function () {
        addItemInTodoList()
    })

    todoinput.keypress(function(event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                addItemInTodoList()
            }
    });

    btndelete.click(function () {
        todos = todos.filter((todo) =>  !todo.done)
        refreshTodos()
    })
})

function refreshTodos(firstPageLoad = false) {
    if(!firstPageLoad){
        savedTodos()
    }
    todolist.empty()
    retrieveTodos()
    for (i in todos) {
        let todoItem = createTodoItem(+i)
        todolist.append(todoItem)
    }
}

function addItemInTodoList() {
    if(todoinput.val() == "") {
        window.alert("Please enter ToDo first !")
    }
    else{
        addTodo(todoinput.val())
        todoinput.val("")
    }
}


function retrieveTodos () {
    let savedTodos = localStorage.getItem("todos")
    if(savedTodos){
        todos = JSON.parse(savedTodos)
    }
}

function moveUp (todoId) {
    if((todoId - 1) >= 0) {
        todos.splice(todoId-1,0,todos.splice(todoId,1)[0]);
        refreshTodos();
    }
}

function moveDown (todoId) {
    todos.splice(todoId+1,0,todos.splice(todoId,1)[0]);
    refreshTodos();
}

function remove (todoId) {
    todos.splice(todoId,1);
    refreshTodos();
}

function createTodoItem (i){
         
        let checkboxdiv = $('<div class="col-2 text-center"></div>')

        let iconup = $('<div class = "col-1" ><i class="fas fa-chevron-up moveicon"></i></div>').click(()=>{
            moveUp(i)
        })
        let icondown = $('<div class="col-1"><i class="fas fa-chevron-down moveicon"></i></div>').click(() => {
            moveDown(i)
        })
        let removeicon = $('<div class = "col-1"><i class="fas fa-times delete"></i></div>').click(() => {
            remove(i)
        })

        let contentdiv = $(`<div class="col">${todos[i].task}</div>`)
        let parentdiv = $('<div class = "row"></div>')

        let check = $('<input type="checkbox" class="checkbox">').click(function () {
            todos[i].done = !todos[i].done;
            refreshTodos();
        })
        if(todos[i].done){
            parentdiv.css("text-decoration", "line-through")
            check.prop("checked",true)
        }

        parentdiv.append(checkboxdiv.append(check)).append(contentdiv).append(iconup).append(icondown).append(removeicon)

        let todoItem = $('<li class = "list-group-item"></li>')

        todoItem.append(parentdiv)
        return todoItem;

}

function savedTodos() {
    localStorage.setItem("todos",JSON.stringify(todos))
}

function addTodo(task) {
    todos.push({
        task: task,
        doe: false
    })
    refreshTodos()
}
