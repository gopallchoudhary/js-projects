function addTodoHandler(event) {
    if(todo.value) {
        if(event.type === "click" || (event.type == "keypress" && event.key == "Enter")) {
            const li = document.createElement("li")
            const btn = document.createElement("button")
            btn.innerHTML = "Delete"
            li.innerHTML = todo.value
            todoArray.push({todo: todo.value})
            li.appendChild(btn)
            todoList.appendChild(li)
            todo.value = null
            console.log(todoArray)
        }
    }
}