import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChangePasswordForm from "../src/components/AuthComponents/ChangePasswordForm";
import { updatePassword } from "../src/components/AuthHandlers/ChangePasswordHandler";
import { useRouter } from "next/navigation";

jest.mock("../src/components/AuthHandlers/ChangePasswordHandler");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  jest.clearAllMocks();
});

describe("ChangePasswordForm", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<ChangePasswordForm />);
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm New Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /change password/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors when passwords do not match", async () => {
    render(<ChangePasswordForm />);
    fireEvent.input(screen.getByLabelText("New Password"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByLabelText("Confirm New Password"), {
      target: { value: "password456" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });
  });

  it("shows validation errors when password is less than 8 characters", async () => {
    render(<ChangePasswordForm />);
    fireEvent.input(screen.getByLabelText("New Password"), {
      target: { value: "short" },
    });
    fireEvent.input(screen.getByLabelText("Confirm New Password"), {
      target: { value: "short" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long"),
      ).toBeInTheDocument();
    });
  });

  it("calls updatePassword and redirects on success", async () => {
    (updatePassword as jest.Mock).mockResolvedValue({ error: null });
    render(<ChangePasswordForm />);
    fireEvent.input(screen.getByLabelText("New Password"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByLabelText("Confirm New Password"), {
      target: { value: "password123" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(updatePassword).toHaveBeenCalledWith("password123");
      expect(mockRouterPush).toHaveBeenCalledWith(
        `/done?header=${encodeURIComponent("Password Reset")}&message=${encodeURIComponent("Your password has been reset, log in again!")}&type=reset`,
      );
    });
  });

  it("shows error message on updatePassword failure", async () => {
    (updatePassword as jest.Mock).mockResolvedValue({
      error: "Failed to update password",
    });
    render(<ChangePasswordForm />);
    fireEvent.input(screen.getByLabelText("New Password"), {
      target: { value: "password123" },
    });
    fireEvent.input(screen.getByLabelText("Confirm New Password"), {
      target: { value: "password123" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(screen.getByText("Failed to update password")).toBeInTheDocument();
    });
  });
});
