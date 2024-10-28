import React from "react";
import { render, screen } from "@testing-library/react";
import DesktopLogin from "@/components/login/DesktopLogin";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string; src: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} />;
  },
}));

// Mock the LoginForm component
jest.mock("../src/components/login/LoginForm", () => {
  return function MockLoginForm() {
    return <div data-testid="login-form">Mock Login Form</div>;
  };
});

describe("DesktopLogin", () => {
  it("renders the component", () => {
    render(<DesktopLogin />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("renders the LoginForm", () => {
    render(<DesktopLogin />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("loads the image properly", () => {
    render(<DesktopLogin />);
    const image = screen.getByAltText("RAWMATS Logo");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });
});
