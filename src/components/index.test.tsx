import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "../App";

test("renders the App component with QueryClientProvider", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  // Assert that the component renders something meaningful
  expect(screen.getByText(/App/i)).toBeInTheDocument();
});
