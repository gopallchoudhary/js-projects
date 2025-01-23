document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input")
    const addTaskButton = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    tasks.forEach(task => {
        renderTasks(task)
    });

    //? add todo button function
    function addTodo() {
        let taskText = todoInput.value.trim()
        if(taskText == "") return

        const newTask = {
            id: Date.now, 
            text: taskText,
            completed: false
        }

        tasks.push(newTask)
        saveTasks()
        renderTasks(newTask)
        todoInput.value = ""
        console.log(tasks);
        
    }

    //? add task click
    addTaskButton.addEventListener("click", addTodo)


    //? Render tasks
    function renderTasks(task) {
        const li = document.createElement("li")
        li.innerHTML = `
            <span>${task.text}</span>
            <button>delete</button>`
        
        if(task.completed) li.classList.add("completed")

        li.addEventListener("click", (e) => {
            if(e.target.tagName == "BUTTON") return
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTasks()
        })

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTasks()
        })

        todoList.appendChild(li)
    }


    //? get local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }







})