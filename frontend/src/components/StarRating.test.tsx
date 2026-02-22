import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StarRating from "./StarRating";

describe("StarRating", () => {
  it("renders fallback text when rating is missing", () => {
    render(<StarRating rating={null} />);

    expect(screen.getByText("No rating")).toBeInTheDocument();
  });

  it("renders formatted rating value when present", () => {
    render(<StarRating rating={4.2} />);

    expect(screen.getByText("4.2")).toBeInTheDocument();
  });
});
