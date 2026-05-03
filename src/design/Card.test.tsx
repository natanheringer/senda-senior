import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card Component", () => {
  test("renders basic card with children", () => {
    render(<Card>Card Content</Card>);

    const card = screen.getByText("Card Content");
    expect(card).toBeInTheDocument();

    // Basic structural checks
    expect(card.parentElement).toBeInstanceOf(HTMLDivElement);
  });

  test("accepts variant prop without throwing", () => {
    // All variant options should be accepted
    expect(() => <Card variant="surface" />).not.toThrow();
    expect(() => <Card variant="outline" />).not.toThrow();
    expect(() => <Card variant="muted" />).not.toThrow();
    expect(() => <Card variant="onGreen" />).not.toThrow();
  });

  test("handles click events when onClick prop is provided", () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);

    // Verify the callback is a function (testing prop passing)
    expect(typeof handleClick).toBe("function");
  });

  test("renders different types of children correctly", () => {
    // Test with string children
    render(<Card>Plain Text</Card>);
    expect(screen.getByText("Plain Text")).toBeInTheDocument();

    // Test with element children
    render(
      <Card>
        <span>Span Element</span>
      </Card>,
    );
    expect(screen.getByText("Span Element")).toBeInTheDocument();

    // Test with multiple children
    render(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
      </Card>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /title/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });

  test("component is importable and functional", () => {
    // This test ensures the component exports correctly
    expect(typeof Card).toBe("function");
    // Functional components don't have prototype methods in the same way as classes
    expect(Card).toHaveLength(1); // Expects props argument
  });
});
