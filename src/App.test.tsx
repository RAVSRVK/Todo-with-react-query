import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import { fetchTodos } from "./api";
const queryClient = new QueryClient();

jest.mock("axios");

const ActualApp = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// test("renders learn react link", async () => {
//   render(<ActualApp />);
//   const linkElement = screen.getByText(/Loading.../i);
//   expect(linkElement).toBeInTheDocument();
//   // await waitFor(
//   //   () => {
//   //     const p = screen.getByText(/React Query Todo Example/i);
//   //     expect(p).toBeInTheDocument();
//   //   },
//   //   { timeout: 4000 }
//   // );
// });

// test("Renders react query", async () => {
//   render(<ActualApp />);
//   (axios.get as jest.Mock).mockResolvedValueOnce({
//     data: [{ id: 1, text: "do something", isCompleted: false }],
//     status: "some",
//   });

//   await waitFor(
//     () => {
//       const p = screen.getByText(/React Query Todo Example/i);
//       expect(p).toBeInTheDocument();
//     },
//     { timeout: 4000 }
//   );
// });

test("Error condition", async () => {
  render(<ActualApp />);
  await (axios.get as jest.Mock).mockRejectedValueOnce({
    data: { data: [{ id: 1, text: "do something", isCompleted: false }] },
    status: "error",
    error: "Something went wrong",
  });
  const p = screen.getByText(/Something went wrong/i);
  expect(p).toBeInTheDocument();
});
