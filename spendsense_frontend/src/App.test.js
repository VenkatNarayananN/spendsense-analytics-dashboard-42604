import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders dashboard title", () => {
  render(<App />);
  const title = screen.getAllByText(/dashboard/i)[0];
  expect(title).toBeInTheDocument();
});
