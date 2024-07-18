import { fireEvent, render, screen } from "@testing-library/react";
import { NewTodo } from "./new-todo";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "react-query";

const queryClient = new QueryClient();

const Comp = () => (
  <QueryClientProvider client={queryClient}>
    <NewTodo />
  </QueryClientProvider>
);

test("Initial render", () => {
  render(<Comp />);
  const newBtn = screen.getByText(/Add/i);
  expect(newBtn).toBeInTheDocument();
});

test("Check setTodo is triggering", () => {
  render(<Comp />);
  const inputElement = screen.getByPlaceholderText("Create a new todo");
  fireEvent.change(inputElement, { target: { value: "23" } });
  expect(inputElement).toHaveValue("23");
});

test("status flag test case", () => {
  render(<Comp />);
  const inputElement = screen.getByPlaceholderText("Create a new todo");
  fireEvent.change(inputElement, { target: { value: "23" } });

  expect(inputElement).toHaveValue("23");
});

// need to check with Ankush
// test("Check setTodo triggered", () => {
//   const setTodo = jest.fn();
//   render(<Comp />);
//   const inputElement = screen.getByText("Add");
//   fireEvent.click(inputElement);
//   expect(setTodo).toBeCalled();
// });
