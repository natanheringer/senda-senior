import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the cn utility and next/image since we're not testing styling or image optimization
jest.mock("@/design", () => ({
  cn: (...classes: string[]) => classes.join(" "),
}));
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return /*#__PURE__*/ React.createElement("img", {
      ...rest,
      src: src || "",
      alt: alt || "",
    });
  },
}));
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams(),
}));

import { AuthFormPanel } from "./AuthFormPanel";

describe("AuthFormPanel Component", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders login form by default", () => {
    render(<AuthFormPanel onSubmit={mockOnSubmit} />);

    // Check for form title
    expect(
      screen.getByRole("heading", { name: /entrar/i }),
    ).toBeInTheDocument();

    // Check for form fields
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();

    // Check for toggle to register
    expect(
      screen.getByRole("link", { name: /criar conta/i }),
    ).toBeInTheDocument();
  });

  test("can switch to register mode", () => {
    render(<AuthFormPanel onSubmit={mockOnSubmit} />);

    // Click the register toggle
    userEvent.click(screen.getByRole("link", { name: /criar conta/i }));

    // Check for register form title
    expect(
      screen.getByRole("heading", { name: /criar conta/i }),
    ).toBeInTheDocument();

    // Check for additional register fields
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();

    // Check for submit button text change
    expect(
      screen.getByRole("button", { name: /criar conta/i }),
    ).toBeInTheDocument();

    // Check for toggle back to login
    expect(
      screen.getByRole("link", { name: /já possui conta/i }),
    ).toBeInTheDocument();
  });

  test("handles form submission", async () => {
    render(<AuthFormPanel onSubmit={mockOnSubmit} />);

    // Fill in form fields
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    // Verify submit was called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      action: "signIn", // Default action
    });
  });

  test("handles register form submission", async () => {
    render(<AuthFormPanel onSubmit={mockOnSubmit} />);

    // Switch to register mode
    await userEvent.click(screen.getByRole("link", { name: /criar conta/i }));

    // Fill in register form fields
    const nameInput = screen.getByLabelText(
      /nome completo/i,
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      /confirmar senha/i,
    ) as HTMLInputElement;

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: /criar conta/i }));

    // Verify submit was called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      action: "signUp",
    });
  });

  test("shows loading state when submitting", async () => {
    // Mock a slow submit function
    const slowSubmit = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

    render(<AuthFormPanel onSubmit={slowSubmit} />);

    // Fill in form
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    // Start submit (but don't await it yet)
    const submitPromise = userEvent.click(
      screen.getByRole("button", { name: /entrar/i }),
    );

    // Should show loading state immediately
    await expect(screen.getByText(/entrando/i)).toBeInTheDocument();

    // Wait for submit to complete
    await submitPromise;

    // Loading state should disappear
    await expect(screen.queryByText(/entrando/i)).not.toBeInTheDocument();
  });

  test("displays error message when submission fails", async () => {
    // Mock a failing submit function
    const failingSubmit = vi
      .fn()
      .mockRejectedValue(new Error("Invalid credentials"));

    render(<AuthFormPanel onSubmit={failingSubmit} />);

    // Fill in form
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "wrongpassword");

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    // Should show error message
    await expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test("handles forgot password link", async () => {
    render(<AuthFormPanel onSubmit={mockOnSubmit} />);

    // Click forgot password link
    await userEvent.click(
      screen.getByRole("link", { name: /esqueci minha senha/i }),
    );

    // Should navigate to reset password page or show reset form
    // Depending on implementation, this might change the form state
    expect(
      screen.getByRole("heading", { name: /redefinir senha/i }),
    ).toBeInTheDocument();
  });

  test("is accessible", async () => {
    render(<AuthFormPanel onSubmit={mockOnSubmit} />);

    // Check for proper labels
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/senha/i)).toBeInTheDocument();

    // Check that buttons are accessible
    expect(screen.getByRole("button", { name: /entrar/i })).toBeEnabled();

    // Check color contrast would be done by axe or similar in integration tests
  });
});
