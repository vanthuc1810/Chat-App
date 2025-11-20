import { render, screen } from "@testing-library/react";
import { Header } from "../../../../app/components/header/header";

it("should render Header with correct text", () => {
  render(<Header />);
  expect(screen.getByText("VANTHUC 1810")).toBeInTheDocument();
});
