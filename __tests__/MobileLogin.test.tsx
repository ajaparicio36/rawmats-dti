import React from "react";
import { render, screen } from "@testing-library/react";
import MobileLogin from "@/components/login/MobileLogin";

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

describe("MobileLogin", () => {
  it("renders the component", () => {
    render(<MobileLogin />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("renders the LoginForm", () => {
    render(<MobileLogin />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("loads the image properly", () => {
    render(<MobileLogin />);
    const image = screen.getByAltText("RAWMATS Logo");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });
});
