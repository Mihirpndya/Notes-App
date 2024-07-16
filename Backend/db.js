//mongodb+srv://mihir_pandya:XVEOLFJe623HVE0u@cluster0.jyjb85p.mongodb.net/
const mongoose = require("mongoose");

mongoose.connect(
  "DB connection link here",
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
