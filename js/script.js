const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')
const toolBar = document.querySelector('#toolbar')
const filterSelect = document.querySelector('#filter-select')
const searchInput = document.querySelector('#search-input')
const searchForm = document.querySelector('#search-form')


let oldInputValue;

// ---------- FUNÇÕES ----------

const saveTodo = (text) => {
    const todo = document.createElement('div')
    todo.classList.add('todo')
    todo.classList.add('all')

    const title = document.createElement('h3')
    title.innerText = text
    todo.appendChild(title)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-todo')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    todoInput.value = ''
    todoInput.focus()

    doneBtn.addEventListener('click', e => {
        todo.classList.toggle('done')
        todo.classList.toggle('todo')
    })

    editBtn.addEventListener('click', e => {
        toggleForms()
        let todoValue = todo.firstElementChild.innerText;
        editInput.value = todoValue
        oldInputValue = todoValue
    })

    deleteBtn.addEventListener('click', e => {
        const targetElement = e.target
        targetElement.parentNode.remove()
    })
}

const toggleForms = () => {
    todoForm.classList.toggle('hide')
    editForm.classList.toggle('hide')
}

const updateTodo = (newText) => {
    const list = document.querySelectorAll('.todo')
    list.forEach(element => {
        let todoTitle = element.querySelector('h3')

        if (todoTitle.innerText == oldInputValue) {
            todoTitle.innerText = newText
        }
    })
}

const todoFilter = () => {
    const filter = filterSelect.value
    const todoItens = document.querySelectorAll('.all')

    todoItens.forEach(element => {
        if (element.classList.contains(filter)) {
            element.style.display = 'flex'
        } else {
            element.style.display = 'none'
        }
    })
    console.log(filter)
}

const filterInput = () => {
    if (searchInput) {
        let elementList = document.querySelectorAll('h3')
        elementList.forEach((element) => {
            elementList = element.innerText.toLowerCase()
            let filterText = searchInput.value.toLowerCase()
            if (!elementList.includes(filterText)) {
                element.parentElement.style.display = 'none'
            } else {
                element.parentElement.style.display = 'flex'
            }
        })
        return
    }
}

// ---------- EVENTOS ----------
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = todoInput.value
    if (inputValue) {
        saveTodo(inputValue)
        return;
    }
    alert('Insira uma tarefa')

})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const editInputValue = editInput.value
    if (editInputValue) {
        updateTodo(editInputValue)

    }
    toggleForms()
})

filterSelect.addEventListener('change', todoFilter)


searchInput.addEventListener('input', filterInput)

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchInput.value = ''
})