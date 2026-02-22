import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders the provided error message", () => {
    const message = "Could not load books";

    render(<ErrorMessage message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
