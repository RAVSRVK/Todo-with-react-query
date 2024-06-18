import axios from "axios";

axios.defaults.baseURL = "https://todo-backend-1-emoq.onrender.com";

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const todos = await axios.get("/todos");
    return todos.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function todoChecked(id: string) {
  try {
    await axios.patch(`/todos/${id}`);
    return;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createTodo(text: string) {
  try {
    await axios.post("/todos", { text, isCompleted: false });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteTodo(id: string) {
  try {
    await axios.delete(`/todos/${id}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
