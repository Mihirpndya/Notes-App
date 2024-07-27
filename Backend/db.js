//mongodb+srv://mihir_pandya:XVEOLFJe623HVE0u@cluster0.jyjb85p.mongodb.net/
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mihir_pandya:q7YFKX2j0rXWqNvP@cluster0.jyjb85p.mongodb.net/todo",
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo: todo,
};
