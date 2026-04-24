import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Newsletter from "@/components/Newsletter";

describe("Newsletter", () => {
  it("renders the email input and Join Waitlist button", () => {
    render(<Newsletter />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /join waitlist/i })).toBeInTheDocument();
  });

  it("shows an error message for an invalid email", () => {
    render(<Newsletter />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    const button = screen.getByRole("button", { name: /join waitlist/i });

    fireEvent.change(input, { target: { value: "not-an-email" } });
    fireEvent.click(button);

    expect(screen.getByRole("alert")).toHaveTextContent(/valid email/i);
  });

  it("shows success message and logs to console on valid submission", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<Newsletter />);

    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: "user@example.com" } });

    const form = input.closest("form")!;
    fireEvent.submit(form);

    expect(consoleSpy).toHaveBeenCalledWith(
      "[Newsletter] Waitlist signup:",
      "user@example.com"
    );
    expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("shows an error for an empty email submission", () => {
    render(<Newsletter />);
    const button = screen.getByRole("button", { name: /join waitlist/i });
    fireEvent.click(button);

    expect(screen.getByRole("alert")).toHaveTextContent(/valid email/i);
  });

  it("can reset to the form after success via 'sign up with another email'", () => {
    render(<Newsletter />);

    const input = screen.getByPlaceholderText(/enter your email/i);
    fireEvent.change(input, { target: { value: "user@example.com" } });
    fireEvent.submit(input.closest("form")!);

    // Success state shown
    expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();

    // Reset
    fireEvent.click(screen.getByText(/sign up with another email/i));
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  });
});
