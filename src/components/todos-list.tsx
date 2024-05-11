import { Todo } from "../api";

type TodosListProps = {
  todos: Todo[] | undefined;
  onDelete: (id: string) => void;
  onUpdateTodo: (id: string) => void;
};

export function TodosList({ todos, onDelete, onUpdateTodo }: TodosListProps) {
  if (todos && todos.length > 0) {
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="checkbox-container">
              <input
                className="checkbox"
                type="checkbox"
                id={todo.id}
                name={todo.id}
                checked={todo.isCompleted}
                onClick={() => onUpdateTodo(todo.id)}
              />
              <label
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
                htmlFor={todo.id}
              >
                {todo.text}
              </label>
            </div>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="empty">
      <p>No todo items found</p>
    </div>
  );
}
