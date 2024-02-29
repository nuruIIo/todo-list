const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodoById);
router.delete("/:id", todoController.deleteTodoById);
router.put("/:id/complete", todoController.completeTodo);

module.exports = router;
