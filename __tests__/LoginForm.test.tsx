import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "@/components/AuthComponents/LoginForm";
import { useForm } from "react-hook-form";

// Mock the useForm hook
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock the useForm hook implementation
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn((name) => ({
        name,
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: jest.fn(),
      })),
      handleSubmit:
        (callback: (data: { email: string; password: string }) => void) =>
        (e: React.FormEvent) => {
          e.preventDefault();
          callback({
            email: "test@example.com",
            password: "password123",
          });
        },
      formState: { errors: {} },
    });
  });

  it("renders all form elements", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^login$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login with google/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/need an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot my password/i)).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    const mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /^login$/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith("Login attempt with:", {
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("displays error messages for invalid inputs", () => {
    // Mock errors in the form state
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn((name) => ({
        name,
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: jest.fn(),
      })),
      handleSubmit: jest.fn(),
      formState: {
        errors: {
          email: { message: "Invalid email address" },
          password: { message: "Password must be at least 8 characters long" },
        },
      },
    });

    render(<LoginForm />);

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 8 characters long"),
    ).toBeInTheDocument();
  });

  it("calls handleGoogleLogin when Google login button is clicked", () => {
    const mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;
    render(<LoginForm />);

    const googleLoginButton = screen.getByRole("button", {
      name: /login with google/i,
    });
    fireEvent.click(googleLoginButton);

    expect(mockConsoleLog).toHaveBeenCalledWith("Login with Google");
  });
});
