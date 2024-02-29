document.addEventListener("DOMContentLoaded", function () {
  function fetchAndRenderTodos() {
    fetch("http://localhost:3000/api/todos")
      .then((response) => response.json())
      .then((data) => {
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = "";
        data.forEach((todo) => {
          const listItem = document.createElement("li");
          listItem.classList.add("todo-item");
          if (todo.completed) {
            listItem.classList.add("completed");
          }
          listItem.innerHTML = `
                        <h3>${todo.title}</h3>
                        <p>${todo.description}</p>
                        <div class="todo-item-actions">
                            <button class="complete-btn" data-id="${todo._id}">Complete</button>
                            <button class="delete-btn" data-id="${todo._id}">Delete</button>
                        </div>
                    `;
          todoList.appendChild(listItem);
        });
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }

  fetchAndRenderTodos();

  const todoForm = document.getElementById("todoForm");
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Extracting values from form input fields
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    // Creating an object with title and description
    const todoData = {
      title: title,
      description: description,
    };

    fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(todoData), // Convert object to JSON string
    })
      .then((response) => response.json())
      .then((data) => {
        fetchAndRenderTodos();
        todoForm.reset();
      })
      .catch((error) => console.error("Error adding todo:", error));
  });

  const todoList = document.getElementById("todoList");
  todoList.addEventListener("click", function (event) {
    if (event.target.classList.contains("complete-btn")) {
      const todoId = event.target.getAttribute("data-id");
      fetch(`http://localhost:3000/api/todos/${todoId}/complete`, {
        method: "PUT",
      })
        .then((response) => {
          if (response.ok) {
            fetchAndRenderTodos();
          } else {
            console.error("Failed to complete todo");
          }
        })
        .catch((error) => console.error("Error completing todo:", error));
    } else if (event.target.classList.contains("delete-btn")) {
      const todoId = event.target.getAttribute("data-id");
      fetch(`http://localhost:3000/api/todos/${todoId}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchAndRenderTodos();
          } else {
            console.error("Failed to delete todo");
          }
        })
        .catch((error) => console.error("Error deleting todo:", error));
    }
  });
});
