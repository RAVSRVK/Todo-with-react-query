const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8000;

let todos = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = req.body;
  const newTodo = {
    id: uuidv4(),
    text: todo.text,
    isCompleted: todo.isCompleted,
  };
  console.log(newTodo);
  todos.push(newTodo);

  res.send("Todo is added to the database");
});

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;

  todos = todos.filter((todo) => todo.id !== todoId);

  res.send("Todo is deleted");
});

app.patch("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  todos = todos?.map((ele) => {
    if (ele?.id === todoId) {
      return { ...ele, isCompleted: !ele?.isCompleted };
    }
    return ele;
  });

  res.send("Todo is updated");
});

app.listen(port, () => console.log(`The app is listening on a port ${port}!`));
