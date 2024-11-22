import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPasswordForm from "../src/components/AuthComponents/ResetPasswordForm";
import { sendResetPassword } from "../src/components/AuthHandlers/SendRecoveryHandler";
import { useRouter } from "next/navigation";

jest.mock("../src/components/AuthHandlers/SendRecoveryHandler");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  jest.clearAllMocks();
});

describe("ResetPasswordForm", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form", () => {
    render(<ResetPasswordForm />);
    expect(
      screen.getByLabelText(/Enter your email address/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Reset Link/i }),
    ).toBeInTheDocument();
  });

  it("shows an error message for invalid email", async () => {
    render(<ResetPasswordForm />);
    fireEvent.input(screen.getByLabelText(/Enter your email address/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Send Reset Link/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it("calls sendResetPassword with valid email", async () => {
    (sendResetPassword as jest.Mock).mockResolvedValue({ error: null });
    render(<ResetPasswordForm />);
    fireEvent.input(screen.getByLabelText(/Enter your email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Send Reset Link/i }));

    await waitFor(() => {
      expect(sendResetPassword).toHaveBeenCalledWith("test@example.com");
    });
  });

  it("shows error message on sendResetPassword failure", async () => {
    (sendResetPassword as jest.Mock).mockResolvedValue({
      error: "Error message",
    });
    render(<ResetPasswordForm />);
    fireEvent.input(screen.getByLabelText(/Enter your email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Send Reset Link/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error message/i)).toBeInTheDocument();
    });
  });

  it("redirects to done page on successful password reset", async () => {
    (sendResetPassword as jest.Mock).mockResolvedValue({ error: null });
    render(<ResetPasswordForm />);
    fireEvent.input(screen.getByLabelText(/Enter your email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Send Reset Link/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        `/done?header=${encodeURIComponent("Password Reset")}&message=${encodeURIComponent(
          "If your email exists, the reset link has been sent, check your inbox!",
        )}&type=reset`,
      );
    });
  });
});
