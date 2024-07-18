import { fireEvent, render, screen } from "@testing-library/react";
import { TodosList } from "./todos-list";
import { Todo } from "../api";

const mockTodos = [
  { id: "1", text: "Buy groceries", isCompleted: false },
  { id: "2", text: "Finish report", isCompleted: true },
];

const TodoRender = ({ todos }: { todos: Todo[] | [] | undefined }) => (
  <TodosList todos={todos} onUpdateTodo={jest.fn()} onDelete={jest.fn()} />
);

test("Testing initial render", () => {
  render(<TodoRender todos={[]} />);
  const noItemsText = screen.getByText(/No todo items found/i);
  expect(noItemsText).toBeInTheDocument();
  //   screen.debug(listElements);
  //   expect(listElements).toHaveLength(2);
});

test("When 2 items available", () => {
  render(
    <TodosList
      todos={mockTodos}
      onUpdateTodo={jest.fn()}
      onDelete={jest.fn()}
    />
  );
  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(2);
});

// test("Handles todo completion toggle", () => {
//   const mockOnUpdateTodo = jest.fn().mockImplementation((id) => {
//     return mockTodos.map((ele) => {
//       if (ele.id === id) {
//         return { ...ele, isCompleted: !ele.isCompleted };
//       } else {
//         return ele;
//       }
//     });
//   });
//   render(
//     <TodosList
//       todos={mockTodos}
//       onDelete={() => {}}
//       onUpdateTodo={mockOnUpdateTodo}
//     />
//   );

//   const checkbox = screen.getByText(/buy/i);
//   fireEvent.click(checkbox);
//   console.log(checkbox);

//     expect(checkbox).toMatchObject({
//       id: "1",
//       text: "Buy groceries",
//       isCompleted: true,
//     });

//   //   expect(mockOnUpdateTodo(mockTodos[0].id))
//   //   expect(mockOnUpdateTodo(mockTodos[0].id)).toHaveBeenCalledWith(
//   //     mockTodos[0].id
//   //   );
//   //   expect(mockOnUpdateTodo)
// });

test("Handles todo completion toggle", () => {
  const mockOnUpdateTodo = jest.fn();

  render(
    <TodosList
      todos={mockTodos}
      onDelete={() => {}}
      onUpdateTodo={mockOnUpdateTodo}
    />
  );

  const checkbox = screen.getByLabelText(/Buy groceries/i);
  fireEvent.click(checkbox);

  expect(mockOnUpdateTodo).toHaveBeenCalled();

  //   ///////////////////////////////////////need confirmation
  const updatedTodo = mockTodos.find((todo) => todo.id === "1");
  if (updatedTodo) {
    updatedTodo.isCompleted = !updatedTodo.isCompleted;
  }

  // You can also mock the new state of the component if needed
  expect(updatedTodo).toMatchObject({
    id: "1",
    text: "Buy groceries",
    isCompleted: true,
  });
});

test("handle onDelete", () => {
  const onDelete = jest.fn();
  render(
    <TodosList todos={mockTodos} onDelete={onDelete} onUpdateTodo={() => {}} />
  );
  const checkbox = screen.getByTestId(/Buy groceries/i);
  fireEvent.click(checkbox);
  expect(onDelete).toHaveBeenCalled();
  //   expect to have length 1 delete one item
});
