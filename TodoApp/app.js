const createTodo = (id, done, save, value) => {
    var _id = id;
    var _done = !!done;
    const todosCont = document.getElementById("todos-container");

    if (id === null) {
        _id = uuidv4();
    }

    const todoComp = document.createElement("li");
    todoComp.id = _id;
    todoComp.classList.add("todo");

    if (_done) {
        todoComp.classList.add("dim");
    }

    const todoText = document.createElement("h3");
    todoText.innerText = value;
    todoText.classList.add("todo-text");

    if (_done) {
        todoText.classList.add("done");
    }

    const todoTextBullet = document.createElement('span')
    todoTextBullet.innerText = "➤"

    todoComp.appendChild(todoTextBullet)
    todoComp.appendChild(todoText);
    todosCont.appendChild(todoComp);

    if (save) {
        console.log("SAVE-TODO");
        saveTodo(_id, _done, value);
    }

    todoComp.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
            if (_done) {
                todoComp.classList.add("dim");
                todoText.classList.add("done");
                console.log("MARK-DONE");
            }
            if (!_done) {
                todoComp.classList.remove("dim");
                todoText.classList.remove("done");
                console.log("MARK-UNDONE");
            }
            updateDone(_id, _done);
            _done = !_done;
        } else if (e.button === 2) {
            deleteTodo(_id);
            todoComp.remove();
            console.log("DELETE-TODO");
        }
    });

    todoComp.addEventListener("contextmenu", (e) => e.preventDefault());

    console.log({ _id, value, done });
};

const saveTodo = (id, done, value) => {
    var todos = JSON.parse(localStorage.getItem("todos"));

    todos.push({ id: id, done: done, value: value });

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateDone = (id, done) => {
    var todos = JSON.parse(localStorage.getItem("todos"));
    var _todo;
    const check = (todo) => {
        if (todo.id !== id) {
            return true
        } else {
            _todo = todo
        }
    };
    console.log(_todo)
    todos = todos.filter(check);
    console.log(todos)
    todos.push({..._todo, done: done })


    localStorage.setItem("todos", JSON.stringify(todos));
};

const deleteTodo = (id) => {
    var todos = JSON.parse(localStorage.getItem("todos"));
    const check = (todo) => {
        if (todo.id !== id) {
            return true;
        }
    };

    todos = todos.filter(check);
    console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos));
};

const setupStorage = () => {
    if (!localStorage.getItem("todos")) {
        localStorage.setItem("todos", JSON.stringify([]));
    }
};

const fetchTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    for (let todo of todos) {
        createTodo(todo.id, todo.done, false, todo.value);
    }
};

window.onload = () => {
    const taskInput = document.getElementById("todo-input");
    const addTask = document.getElementById("add-btn");

    addTask.addEventListener("click", () => {
        createTodo(null, false, true, taskInput.value);
        taskInput.value = ""
    });

    setupStorage();
    fetchTodos();
};