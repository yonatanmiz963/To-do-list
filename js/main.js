'use strict';

function onInit() {
    console.log('Hi');
    renderTodos();
}

function renderEmptyMsg() {
    var strHTML = '';
    switch (gFilterBy) {
        case 'all':
            strHTML = `No todos`;
            break;
        case 'active':
            strHTML = `No Active Todos`;
            break;
        case 'done':
            strHTML = `No Done Todos`;
            break;
    }
    document.querySelector('.todo-list').innerHTML = strHTML;
}

function renderTodos() {
    var todos = getTodosForDisplay();
    if (!todos.length) {
        renderEmptyMsg()

    } else {

        var strHTMLs = todos.map(function(todo) {
            var className = (todo.isDone) ? 'done' : '';
            return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt} 
            (${todo.importance})
            ${todo.createdAt} 
            <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
            </li>`
        })

        // console.log('strHTMLs', strHTMLs)
        document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    }

    document.querySelector('.total-todos').innerText = getTodosCount();
    document.querySelector('.active-todos').innerText = getActiveTodosCount();
}

function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();

    var confirmDelete = confirm('Delete this Todo?');
    if (!confirmDelete) return;

    //model
    removeTodo(todoId);
    //dom
    renderTodos();
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos();

}

function onAddTodo(ev) {
    ev.preventDefault();
    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    var txt = elTodoTxt.value;
    var importance = getImportance();
    if (!txt || !importance) return;
    console.log('Adding todo:', txt);
    addTodo(txt, importance);
    elTodoTxt.value = ''
    renderTodos();
}

function onSetFilter() {
    var elFilterBy = document.querySelector('select[name=filterBy]');
    var filterBy = elFilterBy.value;
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function getImportance() {
    var elImportance = document.querySelector('input[name=importance]');
    return elImportance.value;
}

function onSortBy() {
    var elSortBy = document.querySelector('select[name=sortBy]');
    var sortBy = elSortBy.value;
    setSortBy(sortBy);
    renderTodos();

}