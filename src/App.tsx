import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { NewTodo } from "./components/new-todo";
import { TodosList } from "./components/todos-list";

import { fetchTodos, deleteTodo, todoChecked } from "./api";

export function App() {
  const queryClient = useQueryClient();
  const { status, data, error } = useQuery("todos", fetchTodos);

  const { mutate } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const { mutate: updateTodo } = useMutation(todoChecked, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  if (status === "loading") {
    return <div className="loader">Loading...</div>;
  }

  if (status === "error") {
    return <div className="error">{`Error: ${error}`}</div>;
  }

  const handleOutsideClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <div onClick={handleOutsideClick} className="">
      <h1>React Query Todo Example</h1>

      <NewTodo />

      <TodosList
        todos={data}
        onUpdateTodo={(todoId: string) => {
          updateTodo(todoId);
        }}
        onDelete={(todoId: string) => {
          mutate(todoId);
        }}
      />
    </div>
  );
}
