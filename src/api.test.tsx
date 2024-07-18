import axios from "axios";
import { createTodo, deleteTodo, fetchTodos, todoChecked } from "./api";

const mockTodos = [
  { id: "1", text: "Buy groceries", isCompleted: false },
  { id: "2", text: "Finish report", isCompleted: true },
];

jest.mock("axios");

test("Test to get all todos", async () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockTodos });
  const todos = await fetchTodos();
  expect(todos).toHaveLength(2);
});

test("todoChecked updates todo completion status", async () => {
  const id = "123";
  (axios.get as jest.Mock).mockResolvedValueOnce({});

  await todoChecked(id);

  expect(axios.patch).toHaveBeenCalledWith(`/todos/${id}`); // Assert request URL
});

test("todoChecked throws error on network failure", async () => {
  const id = "456";
  (axios.patch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

  expect.assertions(1);
  await expect(todoChecked(id)).rejects.toThrowError("Network error");
});

// How to check total length after adding a testcase
test("createTodo creates a new todo", async () => {
  const newTodoText = "Write unit tests";
  (axios.post as jest.Mock).mockResolvedValueOnce({});

  await createTodo(newTodoText);

  expect(axios.post).toHaveBeenCalledWith("/todos", {
    text: newTodoText,
    isCompleted: false,
  });
});

test("todo error while create todo", async () => {
  const newTodo = "Something";
  (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
  expect.assertions(1);
  await expect(createTodo(newTodo)).rejects.toThrowError("Network error");
});

test("deleteTodo deletes a todo", async () => {
  const id = "789";
  (axios.delete as jest.Mock).mockResolvedValueOnce({});

  await deleteTodo(id);

  expect(axios.delete).toHaveBeenCalledWith(`/todos/${id}`);
});

test("Delete todo failed", async () => {
  const id = "1";
  (axios.delete as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

  await expect(deleteTodo(id)).rejects.toThrowError("Network Error");
});
