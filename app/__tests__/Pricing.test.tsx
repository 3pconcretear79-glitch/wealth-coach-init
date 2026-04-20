/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the PayPal SDK modules — use createElement instead of JSX in mock factory
jest.mock("@paypal/react-paypal-js", () => ({
  PayPalScriptProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "paypal-provider" }, children),
  PayPalButtons: (props: Record<string, unknown>) =>
    React.createElement(
      "div",
      {
        "data-testid": "paypal-buttons",
        "data-style": JSON.stringify(props.style),
      },
      "PayPal Buttons Mock"
    ),
}));

import Pricing from "../components/Pricing";

describe("Pricing Component", () => {
  it("renders all three pricing plans", () => {
    render(<Pricing />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("renders pricing amounts", () => {
    render(<Pricing />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("$29")).toBeInTheDocument();
    expect(screen.getByText("$99")).toBeInTheDocument();
  });

  it("shows 'Pay with PayPal' buttons for paid plans", () => {
    render(<Pricing />);
    const paypalButtons = screen.getAllByText("Pay with PayPal");
    expect(paypalButtons).toHaveLength(2);
  });

  it("shows 'Pay with Cash App' buttons for paid plans", () => {
    render(<Pricing />);
    const cashappButtons = screen.getAllByText("Pay with Cash App");
    expect(cashappButtons).toHaveLength(2);
  });

  it("shows 'Start Free' button for the free plan", () => {
    render(<Pricing />);
    expect(screen.getByText("Start Free")).toBeInTheDocument();
  });

  it("does not show payment methods for the free plan", () => {
    render(<Pricing />);
    const paypalButtons = screen.getAllByText("Pay with PayPal");
    const cashappButtons = screen.getAllByText("Pay with Cash App");
    expect(paypalButtons).toHaveLength(2);
    expect(cashappButtons).toHaveLength(2);
  });

  it("shows PayPal SDK buttons when 'Pay with PayPal' is clicked", () => {
    render(<Pricing />);
    const paypalButtons = screen.getAllByText("Pay with PayPal");
    fireEvent.click(paypalButtons[0]);
    expect(screen.getByTestId("paypal-buttons")).toBeInTheDocument();
    expect(screen.getByText("\u2190 Back to payment options")).toBeInTheDocument();
  });

  it("shows CashApp instructions when 'Pay with Cash App' is clicked", () => {
    render(<Pricing />);
    const cashappButtons = screen.getAllByText("Pay with Cash App");
    fireEvent.click(cashappButtons[0]);
    expect(screen.getByText("$WealthCoach")).toBeInTheDocument();
    expect(screen.getByText("I've Sent the Payment")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Include your email in the note for account activation"
      )
    ).toBeInTheDocument();
  });

  it("shows success message after CashApp payment confirmation", () => {
    render(<Pricing />);
    const cashappButtons = screen.getAllByText("Pay with Cash App");
    fireEvent.click(cashappButtons[0]);
    fireEvent.click(screen.getByText("I've Sent the Payment"));
    expect(
      screen.getByText("\u2713 Payment initiated \u2014 thank you!")
    ).toBeInTheDocument();
  });

  it("can go back from PayPal to payment selection", () => {
    render(<Pricing />);
    const paypalButtons = screen.getAllByText("Pay with PayPal");
    fireEvent.click(paypalButtons[0]);
    fireEvent.click(screen.getByText("\u2190 Back to payment options"));
    expect(screen.getAllByText("Pay with PayPal")).toHaveLength(2);
    expect(screen.getAllByText("Pay with Cash App")).toHaveLength(2);
  });

  it("can go back from CashApp to payment selection", () => {
    render(<Pricing />);
    const cashappButtons = screen.getAllByText("Pay with Cash App");
    fireEvent.click(cashappButtons[0]);
    fireEvent.click(screen.getByText("\u2190 Back to payment options"));
    expect(screen.getAllByText("Pay with PayPal")).toHaveLength(2);
    expect(screen.getAllByText("Pay with Cash App")).toHaveLength(2);
  });

  it("marks Pro plan as most popular", () => {
    render(<Pricing />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });
});
