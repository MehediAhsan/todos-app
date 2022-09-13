const addTodo = () => {
    const todoText = document.getElementById('todo-text');
    const value = todoText.value;
    todoText.value = '';
    if(value === ''){
        alert('Enter a todo');
        return;
    }
    const previousTodos = JSON.parse(localStorage.getItem('Todos'));
    if(!previousTodos){
        const todos = [
            {
                title:value
            }
        ];
        localStorage.setItem('Todos', JSON.stringify(todos));
    }
    else{
        const todos = [
            ...previousTodos,
            {
                title:value
            }
        ];
        localStorage.setItem('Todos', JSON.stringify(todos));
    }
    displayTodos();
}

const displayTodos = () => {
    const allTodos = JSON.parse(localStorage.getItem('Todos'));
    const ul = document.getElementById('todo-list');
    ul.innerHTML = "";
    allTodos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class = "flex justify-between">
        <span class="text-xl">${todo.title}</span>
        <button onclick="removeItem()" title="Add Todo">
            <i class="fa-solid fa-xmark text-2xl text-red-500"></i>
        </button>
        </div>
        `
        ul.appendChild(li);
    });
}

const clearAllTodo = () => {
    localStorage.removeItem('Todos');
    displayTodos();
}

const removeItem = () =>{
    const text = event.target.parentNode.parentNode.children[0].innerText;
    const allTodos = JSON.parse(localStorage.getItem('Todos'));
    const remainingTodos = allTodos.filter(todo => todo.title !== text);
    const todosStringified = JSON.stringify(remainingTodos);
    localStorage.setItem('Todos',todosStringified);
    displayTodos();
}

displayTodos();