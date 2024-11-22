import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../src/components/AuthComponents/LoginForm";
import { login } from "../src/components/AuthHandlers/LoginHandler";
import { useRouter } from "next/navigation";

jest.mock("../src/components/AuthHandlers/LoginHandler");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  jest.clearAllMocks();
});

describe("LoginForm", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(
        screen.getByText(/password must be at least 8 characters long/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error message on failed login", async () => {
    (login as jest.Mock).mockResolvedValue({ error: "Invalid credentials" });

    render(<LoginForm />);
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("redirects to home on successful login", async () => {
    (login as jest.Mock).mockResolvedValue({ error: null });

    render(<LoginForm />);
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("clears error message after a delay", async () => {
    jest.useFakeTimers();
    (login as jest.Mock).mockResolvedValue({ error: "Invalid credentials" });

    render(<LoginForm />);
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(
        screen.queryByText(/invalid credentials/i),
      ).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("sends the correct data when the form is submitted", async () => {
    const mockFormData = new FormData();
    mockFormData.append("email", "test@example.com");
    mockFormData.append("password", "password123");

    render(<LoginForm />);
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(mockFormData);
    });
  });

  it("redirects to error page on unexpected error", async () => {
    (login as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

    render(<LoginForm />);
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        `/error?message=${encodeURIComponent("Unexpected error")}&code=${encodeURIComponent("500")}`,
      );
    });
  });
});
