const Todo = require("../models/todo");

async function getTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getTodoById(req, res) {
  res.json(res.todo);
}

async function createTodo(req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateTodoById(req, res) {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }
  if (req.body.description != null) {
    res.todo.description = req.body.description;
  }
  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteTodoById(req, res) {
  const todoId = req.params.id;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function completeTodo(req, res) {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.completed = true;

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Error completing todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
  completeTodo
};
